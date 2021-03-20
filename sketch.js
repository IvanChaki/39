var ghostrunner, tower, door, climber;
var doorsGroup, climberGroup;
var ghostrunnerImage, towerImage, doorImage, climberImage;
var invisibleBlock, invisibleBlock_group;
var gameState="play";
var gameSound;

function preload(){
  towerImage=loadImage("tower.png");
  
  doorImage=loadImage("door.png");
  
  climberImage=loadImage("climber.png");
  
  ghostrunnerImage=loadImage("ghost-standing.png");
  
  gameSound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300);
  tower.addImage("tower", towerImage);
  tower.velocityY=1;
  doorsGroup=new Group();
  climberGroup=new Group();
  ghostrunner=createSprite(200, 200, 50, 50);
  ghostrunner.addImage("ghost", ghostrunnerImage);
  ghostrunner.scale=0.5;
  
  invisibleBlock_group=new Group();
  gameSound.loop();
}
function draw(){
  background("red");
  
  if (gameState==="play"){
   if(keyDown("left_arrow"))
  { ghostrunner.x = ghostrunner.x - 3; }
  if(keyDown("right_arrow")){ ghostrunner.x = ghostrunner.x + 3; } 
  if(keyDown("space")){ ghostrunner.velocityY = -10; } 
  ghostrunner.velocityY = ghostrunner.velocityY + 0.8
  
  if (climberGroup.isTouching(ghostrunner)){
    ghostrunner.velocityY=0
      
  }
    
    
  
  spawnDoors();
    
     if(tower.y>400){
  
    tower.y=300
  }
    if(invisibleBlock_group.isTouching(ghostrunner) || ghostrunner.y > 600){
      ghostrunner.destroy();
      gameState = "end" }
    
    drawSprites();
    
    
  }
 if ( gameState === "end" ){
   background("black");
   fill("red");
  text("GAME OVER", 230, 250); 
  
  
 } 
}
function spawnDoors(){
  if(frameCount%240===0){
    door=createSprite(200, 50);
    door.addImage("door", doorImage);
    door.velocityY=1;
    door.x=Math.round(random(120,400))
    door.lifetime=500;
    doorsGroup.add(door); 
    ghostrunner.depth=door.depth
    ghostrunner.depth=ghostrunner.depth+1;
    
    
    
    climber=createSprite(200,10);
    climber.addImage("climber", climberImage);
    climber.velocityY=1;
    climber.x=door.x
    climber.y=door.y+60;
    climber.lifetime=500;
    climberGroup.add(climber);
    climber.debug=true;
    
    
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2
    invisibleBlock.visible=false;
    invisibleBlock_group.add(invisibleBlock);
    invisibleBlock.velocityY=1
    invisibleBlock.debug=true;

  }
}

