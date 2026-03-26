const canvas = document.getElementById('hockey');
const ctx = canvas.getContext('2d');

// Настройки игры
const game = {
    puck: { x: 0, y: 0, dx: 0, dy: 0, radius: 15, color: '#ff4500' },
    player: { x: 0, y: 0, radius: 30, color: '#4169e1', score: 0 },
    cpu: { x: 0, y: 0, radius: 30, color: '#32cd32', score: 0 },
    friction: 0.99, // Трение, чтобы шайба замедлялась
    active: false
};

function init() {
    canvas.width = 350;
    canvas.height = 600;
    resetPuck();
    game.player.x = canvas.width / 2;
    game.player.y = canvas.height - 50;
    game.cpu.x = canvas.width / 2;
    game.cpu.y = 50;
    
    setupControls();
    loop();
}

function resetPuck() {
    game.puck.x = canvas.width / 2;
    game.puck.y = canvas.height / 2;
    game.puck.dx = 0;
    game.puck.dy = 0;
}

function setupControls() {
    canvas.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const touchY = touch.clientY - rect.top;
        
        // Ограничиваем игрока его половиной поля
        if (touchY > canvas.height / 2) {
            game.player.x = touch.clientX - rect.left;
            game.player.y = touchY;
        }
    });
}

function update() {
    // Движение шайбы
    game.puck.x += game.puck.dx;
    game.puck.y += game.puck.dy;
    game.puck.dx *= game.friction;
    game.puck.dy *= game.friction;

    // Отскок от стен
    if (game.puck.x + game.puck.radius > canvas.width || game.puck.x - game.puck.radius < 0) {
        game.puck.dx *= -1;
    }

    // Логика ворот (Гол!)
    if (game.puck.y < 0) { game.player.score++; resetPuck(); }
    if (game.puck.y > canvas.height) { game.cpu.score++; resetPuck(); }

    // Простая физика столкновения с битой игрока
    const dist = Math.hypot(game.puck.x - game.player.x, game.puck.y - game.player.y);
    if (dist < game.puck.radius + game.player.radius) {
        game.puck.dx = (game.puck.x - game.player.x) * 0.2;
        game.puck.dy = (game.puck.y - game.player.y) * 0.2;
    }

    // ИИ для противника (Компот догоняет шайбу)
    game.cpu.x += (game.puck.x - game.cpu.x) * 0.1;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Поле (Разметка)
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();

    // Шайба (Пуговица)
    ctx.fillStyle = game.puck.color;
    ctx.beginPath();
    ctx.arc(game.puck.x, game.puck.y, game.puck.radius, 0, Math.PI*2);
    ctx.fill();

    // Бита игрока (Лапка Коржика)
    ctx.fillStyle = game.player.color;
    ctx.beginPath();
    ctx.arc(game.player.x, game.player.y, game.player.radius, 0, Math.PI*2);
    ctx.fill();

    // Бита CPU
    ctx.fillStyle = game.cpu.color;
    ctx.beginPath();
    ctx.arc(game.cpu.x, game.cpu.y, game.cpu.radius, 0, Math.PI*2);
    ctx.fill();
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

init();
