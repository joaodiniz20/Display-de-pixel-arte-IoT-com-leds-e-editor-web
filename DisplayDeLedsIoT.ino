#include <Adafruit_NeoPixel.h>
#include <WiFi.h>
#include <PubSubClient.h>

Adafruit_NeoPixel pixels(16, 26, NEO_GRB + NEO_KHZ800);


#define NUMC 4//COLUNAS
#define NUML 4//LINHAS
#define cor1 0xff0000
#define cor2 0x00005A
#define cor3 0x001400
#define cor4 0xf500b8

long int leds[4][4] = {0};

int posicao;


//Wifi
const char* SSID = "Wokwi-GUEST"; //nome do wifi
const char* PASSWORD = ""; // senha do wifi
WiFiClient wifiClient;

//MQTT server
const char* BROKER_MQTT = "broker.emqx.io";
int BROKER_PORT = 1883;

#define ID_MQTT "ESP32DISPLAY "
#define TOPIC_SUBSCRIBE "TESTE/LOP"
PubSubClient MQTT(wifiClient);

//Declaração das funções
void mantemConexoes();
void conectaWifi();
void conectaMQTT();
void recebePacote(char* topic, byte* payload, unsigned int length);

void setup() {
  pixels.begin();
  Serial.begin(9600);
  //preencherDisplay();
  conectaWiFi();
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  MQTT.setCallback(recebePacote);
  Serial.println(leds[0][0]);
}

void loop() {
  mantemConexoes();
  MQTT.loop();
}

void mantemConexoes() {
  if (!MQTT.connected()) {
    conectaMQTT();
  }
  if (WiFi.status() != WL_CONNECTED) {
    conectaWiFi(); //se não há conexão com o WiFI, a conexão é refeita
  }
}

void preencherDisplay() {
  posicao = 0;

  for (int i = 0; i < NUML; i++) {
    for (int j = NUMC - 1; j >= 0; j--) {
      pixels.setPixelColor(posicao, leds[i][j]);
      //delay(600);
      posicao++;
    }
  }
  pixels.show();
}

void conectaWiFi() {

  if (WiFi.status() == WL_CONNECTED) {
    return;
  }

  Serial.print("Conectando-se na rede: ");
  Serial.print(SSID);
  Serial.println("  Aguarde!");

  WiFi.begin(SSID, PASSWORD); // Conecta na rede WI-FI
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Conectado com sucesso, na rede: ");
  Serial.print(SSID);
  Serial.print("  IP obtido: ");
  Serial.println(WiFi.localIP());
}

void conectaMQTT() {
  while (!MQTT.connected()) {
    Serial.print("Conectando ao Broker MQTT: ");
    Serial.println(BROKER_MQTT);
    if (MQTT.connect(ID_MQTT)) {
      Serial.println("Conectado ao Broker com sucesso!");
      MQTT.subscribe(TOPIC_SUBSCRIBE);
    }
    else {
      Serial.println("Nao foi possivel se conectar ao broker.");
      Serial.println("Nova tentatica de conexao em 10s");
      delay(10000);
    }
  }
}

void parseJsonMatrix(String json, long int minhaMatriz[NUMC][NUML], String nomeDaMatriz) {
  //posicao Do Nome Da Matriz Na String Json
  int indice = json.indexOf(nomeDaMatriz);//str.indexOf(substr)
  int linha = 0, coluna = 0;
  if (indice == -1) return; //retorna se não encontrado

  //zera os valores
  for (int i = 0; i < NUML; i++)
  {
    for (int j = 0; j < NUMC; j++)
    {
      minhaMatriz[i][j] = 0;
    }
  }

  for (int i = indice; i < json.length(); i++) {
    char c = json.charAt(i);
    if (c == '[' || c == ']' || c == ',') {
      linha = linha + (c == ']');
      coluna = coluna + (c == ',');
      if (linha == NUML && coluna == NUMC) break;
      linha %= NUML;
      coluna %= NUMC;
    }
    if (c >= '0' && c <= '9') {
      
      minhaMatriz[linha][coluna] = minhaMatriz[linha][coluna] * 10 + (c - '0');
    }
  }
}

void recebePacote(char* topic, byte* payload, unsigned int length)
{
  Serial.println("Pacote recebido");
  String msg = "";
  //obtem a string do payload recebido
  for (int i = 0; i < length; i++)
  {
    char c = (char)payload[i];
    msg += c;
  }
  
  parseJsonMatrix(msg, leds, "b");
  preencherDisplay();
  
  Serial.println(msg);
}
// https://projects.raspberrypi.org/pt-BR/projects/pixel-art
// https://codepen.io/pksjw/pen/eMGRKw
