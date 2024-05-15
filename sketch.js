let json = {};
json.name = 'matriz';

var x = 205;
var y = 60;
var yBotoes = 130;
var c1 ='#ffffff'
var pixel = [[c1,c1,c1,c1],
             [c1,c1,c1,c1],
             [c1,c1,c1,c1],
             [c1,c1,c1,c1]];
var colorPicker;
var cor;

var diametroBotao = 3;
var grid = true;

function setup() {
  createCanvas(650, 450);
  colorPicker = createColorPicker('#000000');
  colorPicker.position(70, yBotoes);
}

function draw() {
  background(220);
  cor = colorPicker.value();
  //Cria e altera os pixels
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      grindInterno(grid);
      fill(pixel[i][j]);
      square(x+(60*j), y+(60*i), 60);
    }
  }
  stroke('#000000');
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
  if(mouseX > 70 && mouseX < 118 && mouseY > yBotoes + (40*1) && mouseY < yBotoes + (40*1) + 28){
     for(let i = 0; i < 4; i++){
       for(let j = 0; j < 4; j++){
         pixel[i][j] = c1
       }
     }
  }
  //Salva/envia Json
  if(mouseX > 70 && mouseX < 118 && mouseY > yBotoes + (40*2) && mouseY < yBotoes + (40*2) + 28){
    salvarMatriz();
  }
  // liga/desliga grid
  if(mouseX > 70 && mouseX < 118 && mouseY > yBotoes + (40*3) && mouseY < yBotoes + (40*3) + 28 && grid == true){
    grid = false;
  } else if((mouseX > 70 && mouseX < 118 && mouseY > yBotoes + (40*3) && mouseY < yBotoes + (40*3) + 28 && grid == false)){
     grid = true;
  }

}

function salvarMatriz(){
  json.b = [[],[],[],[]]

  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      json.b[i][j] = parseInt("0x"+pixel[i][j].slice(1))
    }
  }
  //
  function reqListener() {
    console.log(this.responseText);
  }

  const req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);

  req.open("POST", "/api/enviardados");
  req.responseType = "text";
  req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  req.send(JSON.stringify(json));
  //
  //saveJSON(json, 'matriz.json');
}

function botoes(){
  //botão: apaga tudo
  fill(255);
  rect(70, yBotoes + (40*1), 48, 28, diametroBotao, diametroBotao, diametroBotao, diametroBotao);

  //botao: envia/baixa Json
  fill(60);
  rect(70, yBotoes + (40*2), 48, 28, diametroBotao, diametroBotao, diametroBotao, diametroBotao);

  //botão: liga/desliga grid
  fill(60,80,200);
  rect(70, yBotoes + (40*3), 48, 28, diametroBotao, diametroBotao, diametroBotao, diametroBotao);
}

function grindInterno(g){
  if(g == true){
    stroke('#000000');
  } else {
    noStroke();
  }
}
