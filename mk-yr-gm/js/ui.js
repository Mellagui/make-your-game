export class UI {
    constructor(game) {
        this.game = game;
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.livesElement = document.querySelectorAll('.pacLife');

        // End-Event Animations
        this.overLayer = document.getElementById('overLayer');
        this.popUp = document.getElementById('popUp');
        this.menuContent = document.getElementById('menuContent');
    }
    
    updateScore(score) {
        this.scoreElement.textContent = score;
    }
    
    updateLives(lives) {
        if (lives === 5) {
            this.livesElement.forEach(live => live.style.opacity = 1)
            return
        }
        this.livesElement[lives].style.opacity = 0
    }
    
    updateTimer(time) {
        this.timerElement.textContent = Math.max(0, Math.floor(time));
    }

    // End-Event Animations Handler
    showMenu(content) {
        // this.finalScoreElement.textContent = score;
        menuContent.innerHTML = content;
        overLayer.style.display = 'block';
        popUp.style.display = 'block';
    }

    hideMenu() {
        menuContent.innerHTML = '';
        overLayer.style.display = 'none';
        popUp.style.display = 'none';
    }
}