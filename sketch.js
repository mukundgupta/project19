//creating all variables
var bananaImage;
var banana;
var obstacleImage;
var backGround;
var score = 0;
var foodGroup
var obstaclesGroup;
var player_running;
var ground;
var END = 0;
var PLAY = 1;
var gameState = PLAY
var collide= 0

function preload(){
  //loading backGround
  backImage=loadImage("jungle.jpg")
  //player
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
 
  //banana and stone
  bananaImage = loadImage("banana.png")
  obstacle_img = loadImage("stone.png")
  
}
function setup() {
  createCanvas(400, 400);
 //creating all sprites
  backGround = createSprite(200,200)
  backGround.addImage("jungle",backImage)
  backGround.velocityX=-5
  monkey = createSprite(40,380,20,20)
  monkey.addAnimation("player",player_running)
 monkey.scale = 0.1
  ground = createSprite(200,395,400,10)
  ground.visible = false;
  //groups
  foodGroup = createGroup();
  obstaclesGroup = createGroup();
}
                        
function draw() {
  background(220);
 //gameState play
  if (gameState === PLAY){
  //reseting the back ground
    if (backGround.x<0){
  backGround.x = backGround.width/2;
 }
  //gravity
    monkey.velocityY = monkey.velocityY+0.8;
  //stopping the monkey from falling down
    monkey.collide(ground)
  //calling functions
    spawnBanana();
  spawnObstacles();
  //score
    if (foodGroup.isTouching(monkey)){
  score = score+2;
    foodGroup.destroyEach();
  }
  
    if (obstaclesGroup.isTouching(monkey)){
  collide = collide+1;
  }
   //decrease the size when it touches the first time
    console.log(collide)
   if (collide === 1){
   monkey.scale = 0.1;
   }
   //gamstate end
    if (collide === 25){
  gameState = END;
   }
  //jump
    if (keyDown("UP_ARROW")){
  monkey.velocityY=-10;
  }
  //increase the size at 10,20,30,40
    switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
      default:break;
  }
 }else if(gameState === END){
 backGround.velocityX = 0;
   monkey.velocityY = 0;
   banana.velocityX = 0;
   stone.velocityX = 0;
 }
  drawSprites();
//text 
  stroke("white")
  fill("white")
  textSize(20)
  text ("score: "+score,300,40)
}

function spawnBanana(){
if (frameCount%95===0){
 banana = createSprite(400,250)
  banana.addImage("banana",bananaImage)
  banana.scale = 0.030
  banana.velocityX = -4
  banana.lifeTime = 100;
  
  foodGroup.add(banana);
}
}

function spawnObstacles(){
 if (frameCount%200===0){
 stone = createSprite(400,380)
   stone.addImage("stone",obstacle_img)
   stone.scale = 0.1
   stone.velocityX = -5
   stone.lifeTime = 40;
   
   obstaclesGroup.add(stone);
 }
}