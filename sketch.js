let json = {};
json.name = 'matriz';

var x = 205;
var y = 105;
var c1='#ffffff'
var pixel = [[c1,c1,c1,c1],
             [c1,c1,c1,c1],
             [c1,c1,c1,c1],
             [c1,c1,c1,c1]];
var colorPicker;
var cor;

var diamentroBotao = 3;
var grid = true;

function setup() {
  createCanvas(650, 450);
  colorPicker = createColorPicker('#000000');
  colorPicker.position(70, height - 220);
}

function draw() {
  background(220);
  cor = colorPicker.value()
  //Cria e altera os pixels
  //stroke('#000000')
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      grindInterno(grid)
      fill(pixel[i][j]);
      square(x+(60*j), y+(60*i), 60);
    }
  }
  stroke('#000000')
  alteraPixels();
  botoes();
}

function alteraPixels(){
  if(mouseIsPressed === true){
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(mouseX >= x+(60*j) && mouseX <= x+(60*(j+1)) && mouseY >= y+(60*i) && mouseY <= y+(60*(i+1))){
         pixel[i][j] = cor;
        }
      }
    }
  }
}

function mouseClicked() {
  //Apaga todos os pixels
  if(mouseX > 70 && mouseX < 118 && mouseY > 270 && mouseY < 298){
     for(let i = 0; i < 4; i++){
       for(let j = 0; j < 4; j++){
         pixel[i][j] = c1
       }
     }
  }
  //Salva/envia Json
  if(mouseX > 70 && mouseX < 118 && mouseY > 310 && mouseY < 338){
    salvarMatriz();
  }
  // liga/desliga grid
  if(mouseX > 70 && mouseX < 118 && mouseY > 350 && mouseY < 378 && grid == true){
    grid = false;
  } else if((mouseX > 70 && mouseX < 118 && mouseY > 350 && mouseY < 378 && grid == false)){
     grid = true;
  }
  
}

function salvarMatriz(){
  json.b = [[],[],[],[]]
  
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      json.b[i][j] = "0x"+pixel[i][j].slice(1)
    }
  }
  
  saveJSON(json, 'matriz.json');
}

function botoes(){
  //botão: apaga tudo
  fill(255);
  rect(70, 270, 48, 28, diamentroBotao, diamentroBotao, diamentroBotao, diamentroBotao);
  
  //botao: envia/baixa Json
  fill(60);
  rect(70, 310, 48, 28, diamentroBotao, diamentroBotao, diamentroBotao, diamentroBotao);
  
  //botão: liga/desliga grid
  fill(60,80,200);
  rect(70, 350, 48, 28, diamentroBotao, diamentroBotao, diamentroBotao, diamentroBotao);
}

function grindInterno(g){
  if(g == true){
    stroke('#000000');
  } else {
    noStroke();
  }
}
