//Priodade:

//Não é Priodade:
//diminuir quantidade de linhas que estão repetidas
//Fazer efeito de transparencia em pixel vazios ou apagados
//Criar botão para ativar e desativar as bordas(internas)
//Botão de apagar tudo

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

function setup() {
  createCanvas(650, 450);
  colorPicker = createColorPicker('#000000');
  colorPicker.position(70, height - 220);
}

function draw() {
  background(220);
  cor = colorPicker.value()
  //talvez dê pra colocar tudo num for ou de alguma formas mais eficiente depois
  stroke('#000000')
  
  //linha 1
  fill(pixel[0][0]);
  square(x+(60*0), y, 60);
  fill(pixel[0][1]);
  square(x+(60*1), y, 60);
  fill(pixel[0][2]);
  square(x+(60*2), y, 60);
  fill(pixel[0][3]);
  square(x+(60*3), y, 60);
  //linha 2
  fill(pixel[1][0]);
  square(x+(60*0), y+(60*1), 60);
  fill(pixel[1][1]);
  square(x+(60*1), y+(60*1), 60);
  fill(pixel[1][2]);
  square(x+(60*2), y+(60*1), 60);
  fill(pixel[1][3]);
  square(x+(60*3), y+(60*1), 60);
  //linha 3
  fill(pixel[2][0]);
  square(x+(60*0), y+(60*2), 60);
  fill(pixel[2][1]);
  square(x+(60*1), y+(60*2), 60);
  fill(pixel[2][2]);
  square(x+(60*2), y+(60*2), 60);
  fill(pixel[2][3]);
  square(x+(60*3), y+(60*2), 60);
  //linha 4
  fill(pixel[3][0]);
  square(x+(60*0), y+(60*3), 60);
  fill(pixel[3][1]);
  square(x+(60*1), y+(60*3), 60);
  fill(pixel[3][2]);
  square(x+(60*2), y+(60*3), 60);
  fill(pixel[3][3]);
  square(x+(60*3), y+(60*3), 60);
}


function mouseClicked() {
  //linha 1
  if(mouseX >= x+(60*0) && mouseX <= x+(60*1) && mouseY >= y+(60*0) && mouseY <= y+(60*1)){
     pixel[0][0] = cor;
    //cor[0] = ' ';
    //alert(pixel[0][0]);
  } else if(mouseX >= x+(60*1) && mouseX <= x+(60*2) && mouseY >= y+(60*0) && mouseY <= y+(60*1)) {
    pixel[0][1] = cor;
  } else if(mouseX >= x+(60*2) && mouseX <= x+(60*3) && mouseY >= y+(60*0) && mouseY <= y+(60*1)) {
    pixel[0][2] = cor;
  } else if(mouseX >= x+(60*3) && mouseX <= x+(60*4) && mouseY >= y+(60*0) && mouseY <= y+(60*1)) {
    pixel[0][3] = cor;
  }
  //linha 2
  if(mouseX >= x+(60*0) && mouseX <= x+(60*1) && mouseY >= y+(60*1) && mouseY <= y+(60*2)){
     pixel[1][0] = cor;
  } else if(mouseX >= x+(60*1) && mouseX <= x+(60*2) && mouseY >= y+(60*1) && mouseY <= y+(60*2)) {
    pixel[1][1] = cor;
  } else if(mouseX >= x+(60*2) && mouseX <= x+(60*3) && mouseY >= y+(60*1) && mouseY <= y+(60*2)) {
    pixel[1][2] = cor;
  } else if(mouseX >= x+(60*3) && mouseX <= x+(60*4) && mouseY >= y+(60*1) && mouseY <= y+(60*2)) {
    pixel[1][3] = cor;
  }
  //linha 3
  if(mouseX >= x+(60*0) && mouseX <= x+(60*1) && mouseY >= y+(60*2) && mouseY <= y+(60*3)){
     pixel[2][0] = cor;
  } else if(mouseX >= x+(60*1) && mouseX <= x+(60*2) && mouseY >= y+(60*2) && mouseY <= y+(60*3)) {
    pixel[2][1] = cor;
  } else if(mouseX >= x+(60*2) && mouseX <= x+(60*3) && mouseY >= y+(60*2) && mouseY <= y+(60*3)) {
    pixel[2][2] = cor;
  } else if(mouseX >= x+(60*3) && mouseX <= x+(60*4) && mouseY >= y+(60*2) && mouseY <= y+(60*3)) {
    pixel[2][3] = cor;
  }
  //linha 4
  if(mouseX >= x+(60*0) && mouseX <= x+(60*1) && mouseY >= y+(60*3) && mouseY <= y+(60*4)){
     pixel[3][0] = cor;
  } else if(mouseX >= x+(60*1) && mouseX <= x+(60*2) && mouseY >= y+(60*3) && mouseY <= y+(60*4)) {
    pixel[3][1] = cor
  } else if(mouseX >= x+(60*2) && mouseX <= x+(60*3) && mouseY >= y+(60*3) && mouseY <= y+(60*4)) {
    pixel[3][2] = cor;
  } else if(mouseX >= x+(60*3) && mouseX <= x+(60*4) && mouseY >= y+(60*3) && mouseY <= y+(60*4)) {
    pixel[3][3] = cor;
  }
}

function salvarMatriz(){
  //cor = cor.slice(1);
  json.b = [
    ["0x"+pixel[0][0].slice(1), "0x"+pixel[0][1].slice(1), "0x"+pixel[0][2].slice(1), "0x"+pixel[0][3].slice(1)],
    ["0x"+pixel[1][0].slice(1), "0x"+pixel[1][1].slice(1), "0x"+pixel[1][2].slice(1), "0x"+pixel[1][3].slice(1)],
    ["0x"+pixel[2][0].slice(1), "0x"+pixel[2][1].slice(1), "0x"+pixel[2][2].slice(1), "0x"+pixel[2][3].slice(1)],
    ["0x"+pixel[3][0].slice(1), "0x"+pixel[3][1].slice(1), "0x"+pixel[3][2].slice(1), "0x"+pixel[3][3].slice(1)]
  ]
  saveJSON(json, 'matriz.json');
}

function keyReleased(){
    if (keyCode == 88) {
    salvarMatriz();
    }
}


  

//https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Objects/JSON