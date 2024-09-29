//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;

//bord object
let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};
let birdImg;

//pipes
let pipeArray = [];
let pipeWidth = 64;
let pipeHeight = 512;

let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.5;

//gameover
let gameOver = false;
//score
let score = 0;
window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  birdImg = new Image();
  birdImg.src = "./flappybird.png";

  document.addEventListener("keydown", moveBird);
  bird.y += velocityY;

  birdImg.onload = () => {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };
  requestAnimationFrame(update);

  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";
  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";
  

  setInterval(placePipes, 1500);
};

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    return;
  }
  context.clearRect(0, 0, board.width, board.height);

  context.fillText = (score, 5, 45);
  //draw again the bird
  velocityY += gravity;
  bird.y += velocityY;
  bird.y = Math.max(bird.y + velocityY, 0);
  if (bird.y > board.height) {
    gameOver = true;
  }
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    if(!pipe.passed && bird.x > pipe.x + pipe.width){
      score +=1;
      pipe.passed = true;
    }
    if (detectCollision(bird, pipe)) {
      gameOver = true;
    }
  }
}

function placePipes() {
  if (gameOver) {
    return;
  }
  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);
  //create top pipe object
  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: "false",
  };
  pipeArray.push(topPipe);
  let opepningSpace = pipeHeight / 4;
  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + opepningSpace + pipeHeight,
    width: pipeWidth,
    height: pipeHeight,
    passed: "false",
  };
  pipeArray.push(bottomPipe);
}
function moveBird(e) {
  if (e.code == "Space" || e.code == "ArrowUp") {
    velocityY = -5;
  }
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
