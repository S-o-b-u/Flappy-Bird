//board
let board
let boardWidth = 360;
let boardHeight = 640;
let context;

let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2; 


window.onload = ()=>{
    board = document.getElementById("board")
    board.width = boardWidth;
    board.height = boardHeight;
context = board.getContext("2d");


context.fillStyle = "green"
context.fillReact(birdX, birdY, birdWidth, birdHeight );

let birdImg = new Image();
birdImg.src = URL("./flappybird.png")

bird

}
//bord object 
let bird = {
    x:birdX,
    y:birdY,
    width:birdWidth,
    height:birdHeight
    }

