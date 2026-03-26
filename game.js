// Three Cats Air Hockey Game Logic

class AirHockey {
    constructor() {
        this.score = { player1: 0, player2: 0 };
        this.ballPosition = { x: 0, y: 0 };
        this.paddles = {
            player1: { x: 50, y: 50 },
            player2: { x: 150, y: 150 }
        };
    }

    movePaddle(player, newPosition) {
        this.paddles[player] = newPosition;
    }

    updateBall(newPosition) {
        this.ballPosition = newPosition;
    }

    scorePoint(player) {
        this.score[player]++;
    }
}

// Initialize game
const game = new AirHockey();

// Example of moving paddles and scoring
// game.movePaddle('player1', { x: 60, y: 60 });
// game.updateBall({ x: 100, y: 100 });
// game.scorePoint('player1');
