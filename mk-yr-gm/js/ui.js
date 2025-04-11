export class UI {
    constructor(game) {
        this.game = game;
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.livesElement = document.querySelectorAll('.pacLife');
    }
    
    updateScore(score) {
        this.scoreElement.textContent = score;
    }
    
    updateLives(lives) {
        if (lives === 5) return
        this.livesElement[lives].style.opacity = 0
    }
    
    updateTimer(time) {
        this.timerElement.textContent = Math.max(0, Math.floor(time));
    }
    
    // showGameOver(score) {
    //     this.finalScoreElement.textContent = score;
    //     this.gameOverScreen.classList.remove('hidden');
    // }
    
    // showVictory(score) {
    //     this.victoryScoreElement.textContent = score;
    //     this.victoryScreen.classList.remove('hidden');
    // }
}