const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 640;
canvas.height = 480;

const tileSize = 32;
const cols = 20;
const rows = 15;

// 0 = grass
// 1 = water
// 2 = rock
// 3 = village

const map = [
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,1,1,1,0,0,0,0,0,0,0,3,3,3,0,0,0,0,2],
  [2,0,1,1,1,1,0,0,0,0,0,0,3,3,3,0,0,0,0,2],
  [2,0,0,1,1,1,0,0,0,0,0,0,3,3,3,0,0,0,0,2],
  [2,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
];

let player = {
  x: 3,
  y: 6,
  size: tileSize,
  speed: 0.1
};

let npc = {
  x: 13,
  y: 3,
  size: tileSize,
  color: "#ff6b6b",
  dialogue: "Welcome, Architect. Build wisely."
};

let showDialogue = false;

let keys = {};

document.addEventListener("keydown", e => {
  keys[e.key] = true;

  if (e.key === "e" || e.key === "E") {
    if (
      Math.abs(player.x - npc.x) < 1 &&
      Math.abs(player.y - npc.y) < 1
    ) {
      showDialogue = !showDialogue;
    }
  }
});
document.addEventListener("keyup", e => keys[e.key] = false);

function isBlocked(x, y) {
  let tile = map[Math.floor(y)][Math.floor(x)];
  return tile === 1 || tile === 2;
}

function update() {
  let newX = player.x;
  let newY = player.y;

  if (keys["ArrowUp"]) newY -= player.speed;
  if (keys["ArrowDown"]) newY += player.speed;
  if (keys["ArrowLeft"]) newX -= player.speed;
  if (keys["ArrowRight"]) newX += player.speed;

  if (!isBlocked(newX, player.y)) player.x = newX;
  if (!isBlocked(player.x, newY)) player.y = newY;
}

function drawMap() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let tile = map[y][x];

      if (tile === 0) ctx.fillStyle = "#3a7d44";      // grass
      if (tile === 1) ctx.fillStyle = "#1b4965";      // water
      if (tile === 2) ctx.fillStyle = "#5c4033";      // rock
      if (tile === 3) ctx.fillStyle = "#b08968";      // village

      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "#f4d35e";
  ctx.fillRect(
    player.x * tileSize,
    player.y * tileSize,
    player.size,
    player.size
  );
}

function drawNPC() {
  ctx.fillStyle = npc.color;
  ctx.fillRect(
    npc.x * tileSize,
    npc.y * tileSize,
    npc.size,
    npc.size
  );
}

function drawDialogue() {
  if (!showDialogue) return;

  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.fillRect(50, 350, 540, 100);

  ctx.strokeStyle = "#ffffff";
  ctx.strokeRect(50, 350, 540, 100);

  ctx.fillStyle = "#ffffff";
  ctx.font = "16px monospace";
  ctx.fillText(npc.dialogue, 70, 400);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
  drawMap();
  drawNPC();
  drawPlayer();
  drawDialogue();
  requestAnimationFrame(loop);
}

loop();
