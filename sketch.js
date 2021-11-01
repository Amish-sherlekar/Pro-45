var spaceship1, spaceship1Img;
var asteroid, asteroidImg;
var asteroidGroup;
var boundry;
var bg;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  spaceship1Img = loadImage("images/Spaceship/spaceship (1).jpeg");
  asteroidImg = loadImage("images/Asteroid/asteriod_1.png");
  bg = loadImage("images/background/bg.jpeg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  spaceship1 = createSprite(displayWidth / 2, displayHeight / 2 + 300);
  spaceship1.addImage(spaceship1Img);
  spaceship1.scale = 1;
  boundry = createSprite(1000, 950, 2000, 20);
  asteroidGroup = new Group();
  score = 0;
}

function draw() {
  if (gameState === PLAY) {
    background(51);
    stroke(20);
    textSize(20);
    text("Score"+score, 100, 100)
    if (keyDown("UP_ARROW")) {
      spaceship1.y = spaceship1.y - 50;
    }
    if (keyDown("DOWN_ARROW")) {
      spaceship1.y = spaceship1.y + 50;
    }
    if (keyDown("RIGHT_ARROW")) {
      spaceship1.x = spaceship1.x + 50;
    }
    if (keyDown("LEFT_ARROW")) {
      spaceship1.x = spaceship1.x - 50;
    }
    if (asteroidGroup.isTouching(spaceship1)) {
      for (var i = 0; i < asteroidGroup.length; i++) {
        if (asteroidGroup[i].isTouching(spaceship1)) {
          asteroidGroup[i].destroy();
          score += 1;
        }
      }
    }
    if (asteroidGroup.isTouching(boundry)) {
      asteroidGroup.destroyEach();
      spaceship1.destroy();
      background(bg)
      stroke(20);
      textSize(80)
      text("Your score is " + score, 100, height/2 - 300);
      gameState = END;
    }
    asteroidGp();
  }
  drawSprites();
}
function asteroidGp() {
  if (frameCount % 50 === 0) {
    asteroid = createSprite(random(100, 1500), displayHeight / 2 - 400);
    asteroid.addImage(asteroidImg);
    asteroid.scale = 0.5;
    asteroid.velocityY = +3;
    asteroid.lifetime = 300;
    asteroidGroup.add(asteroid);
    asteroid.depth = asteroid.depth;
    spaceship1.depth = asteroid.depth - 1;
  }
}
