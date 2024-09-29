//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

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
window.onload = () => {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  //   context.fillStyle = "green";
  //   context.fillRect(bird.x, bird.y, bird.width, bird.height);

  let birdImg = new Image();
  birdImg.src = "./flappybird.png";

  birdImg.onload = () => {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };
  requestAnimationFrame(upadate);
};

function upadate(){
    requestAnimationFrame(upadate);
    context.clearRect(0, 0, boardWidth, boardHeight);

    //draw again the bird
   context.drawImage(birdImg, bird)
}
