
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
  // randomPositionX = random(50, width - 50);
  // randomPositionY = random(1, height);
  // horizon = height - height/7;
for(var i = 0; i < repositories.length; i++){
  trees[i] = new tree(random(50, width - 50),height - height/7, repositories[i]);
}
}

function draw(){
  background(bg);
for(var x = 0; x < trees.length; x++){
  trees[x].run();
}

}

function tree(x, y, repository){
this.position = createVector(x, y);
this.repository = repository;
this.isOver = false;
}
tree.prototype.hover = function(){
  var name = '', description = '', url ='';

var distance = dist(mouseX, mouseY, this.position.x, this.position.y);
//



if(distance < 50){
    this.isOver = true;
  } else {
    this.isOver = false;
  }


if(this.isOver === true){
  removeElements();
  name = this.repository.name;
  description = this.repository.description;
  url = this.repository.url;
  var info = createDiv('<p>Repository Name: ' + name +  '</p>' + '<p>Description: ' + description + '</p>' + '<p> URL: ' + url + '</p>');
  info.position(50,50);
  info.class('info');
}





};
tree.prototype.run = function(){
this.render();
this.hover();
};
tree.prototype.render = function(){

  beginShape();
  fill(73,49,28);
    rect(this.position.x - 13, this.position.y, 25, 100);

    fill(0,76,0);
    triangle(this.position.x, this.position.y - 75, this.position.x - 50, this.position.y + 50, this.position.x + 50, this.position.y + 50);

    fill(0,76,0);
    triangle(this.position.x, this.position.y - 150, this.position.x - 50, this.position.y, this.position.x + 50, this.position.y);
endShape();

};
