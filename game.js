const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 480;

const tileSize = 32;

const mapCols = 20;
const mapRows = 15;

let player = {
  x: 5,
  y: 5,
  size: tileSize,
  color: "#f4d35e"
};

let keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function update() {
  if (keys["ArrowUp"]) player.y -= 0.1;
  if (keys["ArrowDown"]) player.y += 0.1;
  if (keys["ArrowLeft"]) player.x -= 0.1;
  if (keys["ArrowRight"]) player.x += 0.1;
}

function drawGrid() {
  for (let x = 0; x < mapCols; x++) {
    for (let y = 0; y < mapRows; y++) {
      ctx.fillStyle = "#3a7d44";
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);

      ctx.strokeStyle = "#2e6b38";
      ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(
    player.x * tileSize,
    player.y * tileSize,
    player.size,
    player.size
  );
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawGrid();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

gameLoop();
