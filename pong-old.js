// Getting reference to Canvas object
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Setting dimensions of canvas
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const radius = 10;
const paddleSpeed = 5;
const paddleHeight = 90;
const paddleWidth = 15;
const halfPaddleHeight = paddleHeight / 2;
const halfPaddleWidth = paddleWidth / 2;

//render canvas
function renderBackground() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

//render ball
function renderBall(x, y) {
  // to render circles you need 4 methods
  ctx.beginPath(); //set that we are going to render the circle as an arc
  ctx.arc(x, y, radius, 0, 2 * Math.PI); // this set where the arc starts and how many degrees the arc takes. the first 2 args numbers represent the certer of the radius. the 3rd one is the radius. last 2 params represent the size of circonf
  ctx.fillStyle = "red"; //set fill color
  ctx.fill();
}

// render paddle left
function renderPaddle(y) {
  ctx.fillStyle = "white";
  ctx.fillRect(20, y, paddleWidth, paddleHeight);
}

// render paddle right
function renderPaddleRight(y) {
  ctx.fillStyle = "white";
  ctx.fillRect(665, y, 15, paddleHeight);
}

let x = 60;
let y = 20;
let vx = +2;
let vy = +2;
let paddleY = 20;
let paddleX = 20;

setInterval(() => {
  // every 20millisecs renders all these objects
  renderBackground();
  renderBall(x, y);
  renderPaddle(paddleY);
  renderPaddleRight(paddleX);
  x += vx;
  if (x + radius === canvasWidth || x - radius === 0) {
    vx = -1 * vx;
  }

  // y += vy;
  // if (y + radius === canvasHeight || y - radius === 0) {
  //   vy = -1 * vy;
  // }
}, 20);

// Add a listener for the document to a keypress event
//   identify pressed key and if S -> we move down, and if W -> we move up
// Define the paddle's increment with each key press
// Increment the y coordinate on the paddle

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "s") {
    if (paddleY + paddleHeight >= canvasHeight) return;
    paddleY += paddleSpeed;
  }
  if (event.key === "w") {
    if (paddleY <= 0) return;
    paddleY -= paddleSpeed;
  }
});

document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === "l") {
    if (paddleX + paddleHeight >= canvasHeight) return;
    paddleX += paddleSpeed;
  }
  if (event.key === "o") {
    if (paddleX <= 0) return;
    paddleX -= paddleSpeed;
  }
});

//check paddle collison
//get center paddle

function getCenter() {}

// function checkPaddleBallCollision (){

// }
