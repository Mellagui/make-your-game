export class UI {
    constructor(game) {
        this.game = game;
        this.scoreElement = document.getElementById('score');
        this.timerElement = document.getElementById('timer');
        this.livesElement = document.querySelectorAll('.bxs-game');

        // End-Event Animations
        this.overLayer = document.getElementById('overLayer');
        this.popUp = document.getElementById('popUp');
        this.menuContent = document.getElementById('menuContent');
        this.subTitle = document.getElementById('sub-title');

        // button
        this.continue = document.getElementById('continue');
        this.reset = document.getElementById('reset');
    }

    updateScore(score) {
        const content = score < 10? '0000': score < 100? '00' + score: score < 1000? '0' + score: score;
        this.scoreElement.textContent = content;
    }

    updateLives(lives) {
        if (lives === 5) return this.livesElement.forEach(live => live.style.color = '#FFEE58');
        this.livesElement[lives].style.color = '#111';
    }

    updateTimer(time) {
        this.timerElement.textContent = Math.max(0, Math.floor(time));
    }

    showMenu(content) {
        this.game.player.animator.stop(); // stop when idle
        this.game.currentMenu = true;
        
        this.continue.style.display = 'block';
        this.reset.style.display = 'block';
        this.subTitle.innerHTML = '';

        if (content === 'start game') {
            this.reset.style.display = 'none'
        } else if (this.game.victory || this.game.gameOver) {
            this.continue.style.display = 'none';
            this.subTitle.innerHTML = `your score : ${this.game.score}`;
        }

        menuContent.innerHTML = content;
        overLayer.style.display = 'block';
        popUp.style.display = 'block';
    }
    
    hideMenu() {
        this.game.currentMenu = false;
        
        menuContent.innerHTML = '';
        overLayer.style.display = 'none';
        popUp.style.display = 'none';
    }
}