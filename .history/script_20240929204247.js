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

window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  //   context.fillStyle = "green";
  //   context.fillRect(bird.x, bird.y, bird.width, bird.height);
  birdImg = new Image();
  birdImg.src = "./flappybird.png";

  birdImg.onload = () => {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };
  requestAnimationFrame(update);

  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png"
  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png"

  setInterval(placePipes, 1500);
};

function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);

  //draw again the bird
  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
}

function placePipes()