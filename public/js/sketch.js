
var bg;
var randomPositionX;
var randomPositionY;
var textPositionX;
var horizon;
var repositories;
var trees = [];
function preload() {


  repositories = loadJSON('./data/data.JSON');
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  bg = loadImage('./images/background.jpg');
  randomPositionX = random(50, width - 50);
  randomPositionY = random(1, height);
  horizon = height - height/7;

}

function draw(){
  background(bg);
run();

}



function run(){
for(var x = 0; x < repositories.length; x++){
  renderTree(repositories[x]);
}

}

function renderTree(repository) {

var text = createDiv(repository.name);
text.position(randomPositionX - 90, random(0, horizon));

  beginShape();
  fill(73,49,28);
    rect(randomPositionX - 13, horizon, 25, 100);

    fill(0,76,0);
    triangle(randomPositionX, horizon - 75, randomPositionX - 50, horizon + 50, randomPositionX + 50, horizon + 50);

    fill(0,76,0);
    triangle(randomPositionX, horizon - 150, randomPositionX - 50, horizon, randomPositionX + 50, horizon);
endShape();

}
