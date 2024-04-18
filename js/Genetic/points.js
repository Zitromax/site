const canvas = document.getElementById("flat");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

var mouse = {
  x: 0,
  y: 0,
};

class Point {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function clearCanvasAndPoints() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points = [];
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var points = [];

function getMouseCoords(event) {
  var rect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;

  points.push(new Point(mouse.x, mouse.y));
}

function drawMouseClickPoint(event) {
  getMouseCoords(event);
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
}

function drawPoints(points) {
  for (let i = 0; i != points.length; i++) {
    ctx.beginPath();
    ctx.arc(points[i].x, points[i].y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
  }
}
