// Detect if the user is on a mobile device
function isMobile() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

let boardWidth, boardHeight;
let birdWidth, birdHeight;
let pipeWidth, pipeHeight;

if (isMobile()) {
  // For mobile devices
  boardWidth = window.innerWidth * 0.95; // 95% of the screen width
  boardHeight = window.innerHeight * 0.85; // 85% of the screen height

  // Smaller bird and pipes for mobile
  birdWidth = 34 * 0.75; // 75% of the original size
  birdHeight = 24 * 0.75;
  pipeWidth = 64 * 0.75;
  pipeHeight = 512 * 0.75;

} else {
  // For desktop devices
  boardWidth = 360;
  boardHeight = 640;

  // Original bird and pipes size for desktop
  birdWidth = 34;
  birdHeight = 24;
  pipeWidth = 64;
  pipeHeight = 512;
}

// Declare variables for the game
let board;
let context;

let birdX = boardWidth / 8;
let birdY = boardHeight / 2;

let bird = {
  x: birdX,
  y: birdY,
  width: birdWidth,
  height: birdHeight,
};
let birdImg;

// Pipes settings
let pipeArray = [];
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// Physics
let velocityX = -2;
let velocityY = 0;
let gravity = 0.3;

// Game variables
let gameOver = false;
let score = 0;

// Load the game when the page is ready
window.onload = function () {
  board = document.getElementById("board");
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext("2d");

  // Load bird image
  birdImg = new Image();
  birdImg.src = "./bird.gif";

  // Add event listeners for bird movement
  document.addEventListener("keydown", moveBird);
  document.addEventListener("touchstart", moveBird); 
  board.addEventListener("click", moveBird);

  birdImg.onload = () => {
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
  };

  // Start the game loop
  requestAnimationFrame(update);

  // Load pipe images
  topPipeImg = new Image();
  topPipeImg.src = "./toppipe.png";
  bottomPipeImg = new Image();
  bottomPipeImg.src = "./bottompipe.png";

  // Place pipes periodically
  setInterval(placePipes, 1500);
};

function update() {
  requestAnimationFrame(update);

  if (gameOver) {
    return;
  }

  // Clear the canvas
  context.clearRect(0, 0, board.width, board.height);

  // Bird movement
  velocityY += gravity;
  bird.y += velocityY;
  bird.y = Math.max(bird.y, 0);

  if (bird.y > board.height) {
    gameOver = true;
  }

  context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

  // Draw and move the pipes
  for (let i = 0; i < pipeArray.length; i++) {
    let pipe = pipeArray[i];
    pipe.x += velocityX;
    context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

    if (!pipe.passed && bird.x > pipe.x + pipe.width) {
      score += 0.5;
      pipe.passed = true;
    }

    if (detectCollision(bird, pipe)) {
      gameOver = true;
    }
  }

  // Clear pipes that are off-screen
  while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
    pipeArray.shift();
  }

  // Display score
  context.fillStyle = "white";
  context.font = "45px sans-serif";
  context.fillText(score, 30, 60);

  if (gameOver) {
    // Center the "Game Over" text
    context.fillStyle = "white";
    context.font = "58px sans-serif";
    let gameOverText = "Game Over";
    let textWidth = context.measureText(gameOverText).width;
    context.fillText(gameOverText, (boardWidth - textWidth) / 2, boardHeight / 2);
  }
}

function placePipes() {
  if (gameOver) {
    return;
  }

  let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2);

  // Create top pipe object
  let topPipe = {
    img: topPipeImg,
    x: pipeX,
    y: randomPipeY,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(topPipe);

  // Create bottom pipe object
  let openingSpace = pipeHeight / 2.8;
  let bottomPipe = {
    img: bottomPipeImg,
    x: pipeX,
    y: randomPipeY + openingSpace + pipeHeight,
    width: pipeWidth,
    height: pipeHeight,
    passed: false,
  };
  pipeArray.push(bottomPipe);
}

function moveBird(e) {
  if (e.code == "Space" || e.code == "ArrowUp") {
    velocityY = -3;

    if (gameOver) {
      resetGame();
    }
  } else if (e.type === "touchstart" || e.type === "click") {
    velocityY = -3;

    if (gameOver) {
      resetGame();
    }
  }
}

function resetGame() {
  bird.y = birdY;
  pipeArray = [];
  score = 0;
  gameOver = false;
}

function detectCollision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
