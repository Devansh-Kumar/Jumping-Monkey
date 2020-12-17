//Declaring variable
var monkey, monkeyRunning;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, rockGroup;
var ground, invisibleGround;
var GameState;
var PLAY, END;

function preload() {
  //Loading animation and images
  monkeyRunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(500, 500);

  PLAY = 1;
  END = 0;
  GameState = PLAY;
  
  //Creating groups
  
  bananaGroup = new Group();
  rockGroup = new Group();
  //Creating sprites
  monkey = createSprite(70, 370, 50, 50);
  monkey.addAnimation("runningMonkey", monkeyRunning);
  monkey.scale = 0.1;

  ground = createSprite(250, 405, 1000, 10);
  ground.shapeColor = ("black");
  ground.x = ground.width / 2;
  
  invisibleGround = createSprite(250, 410, 1000, 10);
  invisibleGround.visible = false;
  invisibleGround.x = ground.width / 2;
}


function draw() {
  //Setting background color
  background("orange");

  if (GameState === PLAY) {

    //reset the ground it moves out of the canvas
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //Giving jump movement for monkey
    if (keyDown("space") && monkey.isTouching(ground) ) {
      monkey.velocityY = -20;
    }  
    //Adding score
    score = Math.round(frameCount / 3);
    
    if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
  }
   //Calling the functions here
   food();
   obstacle();
    //If monkey hits the rock, gamestate should change to end
    if (monkey.isTouching(rockGroup)) {
      GameState = END;
    }
} 
  
  if (GameState === END) {
    ground.velocityX = 0;
    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-1);
    rockGroup.setLifetimeEach(-1);
    textSize(25);
    fill("red");
    text("Game Over",150,150);
  }


  //Giving gravity and collide with the invisible ground
  monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(invisibleGround);
  //Displaying the score
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time = "+score,150,50);
  
  drawSprites();
}

function food() {

  if (frameCount % 100 === 0) {
    var banana = createSprite(500, 10, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5+2*score/100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    bananaGroup.add(banana);
    bananaGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 350, 350);
    banana.debug = false;
  }
}

function obstacle() {

  if (frameCount % 250 === 0) {
    var obstacle = createSprite(500, 365, 23, 32);
    obstacle.velocityX = -(5+2*score/100);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale = 0.2;
    rockGroup.add(obstacle);
    rockGroup.setLifetimeEach(100);
    obstacle.setCollider("circle", 0, 0, 150);
    obstacle.debug = false;
  }
}