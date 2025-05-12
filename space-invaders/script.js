const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let player = { x: 180, y: 450, w: 40, h: 10, color: 'white' };
let bullets = [];
let enemies = [];

for (let i = 0; i < 5; i++) {
  enemies.push({ x: i * 80 + 20, y: 20, w: 30, h: 20, color: 'red' });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
  bullets.forEach((b, i) => {
    b.y -= 5;
    ctx.fillStyle = 'yellow';
    ctx.fillRect(b.x, b.y, 5, 10);
    if (b.y < 0) bullets.splice(i, 1);
  });
  enemies.forEach((e, i) => {
    ctx.fillStyle = e.color;
    ctx.fillRect(e.x, e.y, e.w, e.h);
    bullets.forEach((b, j) => {
      if (b.x < e.x + e.w && b.x + 5 > e.x && b.y < e.y + e.h && b.y + 10 > e.y) {
        enemies.splice(i, 1);
        bullets.splice(j, 1);
      }
    });
  });
}

function move(e) {
  if (e.key === 'ArrowLeft') player.x -= 20;
  if (e.key === 'ArrowRight') player.x += 20;
  if (e.key === ' ') {
    bullets.push({ x: player.x + player.w / 2, y: player.y });
  }
}

document.addEventListener('keydown', move);

function loop() {
  draw();
  requestAnimationFrame(loop);
}
loop();