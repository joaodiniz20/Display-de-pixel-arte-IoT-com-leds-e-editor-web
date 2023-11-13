#include <Adafruit_NeoPixel.h>
//GPIO 13
//Cria objeto da classe 'Adafruit_NeoPixel'
//parametros: número de leds, pino do arduino,
//padrão de cor e frequncia de comunicão 
Adafruit_NeoPixel pixels(16, 5, NEO_GRB + NEO_KHZ800);

#define c1 0xff0000 //vermelho
#define c2 0x00005A //Azul
#define c3 0x001400 //Verde
#define c4 0xf500b8 //Rosa

long int leds[4][4] = {
  {c1,c2,c2,c1},
	{c3,c4,c4,c3},
	{c3,c4,c4,c3},
	{c1,c2,c2,c1}
};

int posicao;

void setup(){
  pixels.begin();
  preencheDisplay();
}

void loop(){}

void preencheDisplay(){
  posicao = 0;
  
  for(int i = 0; i < 4; i++){
    for(int j = 3; j >= 0; j--){
      pixels.setPixelColor(posicao, leds[i][j]);
      posicao++;
    }
  }
  pixels.show();
}