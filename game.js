const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
  x: 100,
  y: 100,
  level: 1,
  xp: 0,
  skin: 'default',
};

function drawPlayer() {
  ctx.fillStyle = player.skin === 'default' ? 'blue' : 'green';
  ctx.fillRect(player.x, player.y, 50, 50);
}

function gainXP(amount) {
  player.xp += amount;
  if (player.xp >= player.level * 100) {
    player.xp = 0;
    player.level++;
    alert(`Level Up! You are now level ${player.level}`);
  }
}

function saveGame() {
  localStorage.setItem('rpgSave', JSON.stringify(player));
}

function loadGame() {
  const saved = localStorage.getItem('rpgSave');
  if (saved) player = JSON.parse(saved);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

loadGame();
gameLoop();

// Simulate XP gain every 5 seconds
setInterval(() => {
  gainXP(50);
  saveGame();
}, 5000);