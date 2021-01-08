var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
tower=createSprite(300,300);
tower.addImage(towerImg)
tower.velocityY=1;
doorsGroup=new Group()
climbersGroup=new Group()  
invisibleBlockGroup=new Group() 
ghost=createSprite(300,300);
ghost.addImage(ghostImg);
ghost.scale=0.3
}

function draw(){
  background(0);
  if (gameState === "play") {
  if(tower.y >600){
tower.y=300;   
  }
    
if(keyDown("space")){
ghost.velocityY=-10;   
}  

if(keyDown("right" )){
ghost.x=ghost.x+2;
}
 
if(keyDown("left" )){
ghost.x=ghost.x-2;
}    

if(ghost.isTouching(invisibleBlockGroup)||ghost.y>600){
gameState="end"
}

if(ghost.isTouching(climbersGroup)){
ghost.velocityY=0;
}    
ghost.velocityY =ghost.velocityY +0.3;   
    spawnDoors();

   
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
if(frameCount%250===0){
door=createSprite(Math.round(random(150,450)),-50,20,50);
door.velocityY=1;
door.addImage(doorImg)
door.lifetime=600;
doorsGroup.add(door);
door.depth=ghost.depth
ghost.depth=ghost.depth+1;
climber=createSprite(door.x,door.y+50,20,50);
  
climber.velocityY=1;
climber.addImage(climberImg)
climber.lifetime=600;
climbersGroup.add(climber);

invisibleBlock=createSprite(door.x,door.y+60,climber.width,5);
  
invisibleBlock.velocityY=1;
invisibleBlock.debug=true;
invisibleBlock.lifetime=600;
invisibleBlockGroup.add(invisibleBlock);


}
  
}

