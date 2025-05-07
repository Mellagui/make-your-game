export class UI {
    constructor(game) {
        this.game = game;

        // End-Event Animations
        this.overLayer = document.getElementById('overLayer');
        this.popUp = document.getElementById('popUp');
        this.menuTitle = document.getElementById('menu-title');
        this.subTitle = document.getElementById('sub-title');

        // button
        this.continueBtn = document.getElementById('continue');
        this.resetBtn = document.getElementById('reset');
    }

    updateScore(score) {
        document.getElementById('score').textContent = score < 10? '0000': score < 100? '00' + score: score < 1000? '0' + score: score;
    }

    updateLives(lives) {
        if (lives === 5) return document.querySelectorAll('.bxs-game').forEach(live => live.style.color = '#FFEE58');
        document.querySelectorAll('.bxs-game')[lives].style.color = '#111';
    }

    updateTimer(time) {
        document.getElementById('timer').textContent = time;
    }

    showMenu(content) {
        this.game.player.animator.stop(); // stop when idle
        this.game.currentMenu = true;
        
        this.continueBtn.style.display = 'block';
        this.resetBtn.style.display = 'block';
        this.subTitle.innerHTML = '';

        if (content === 'start game') {
            this.resetBtn.style.display = 'none'
        } else if (this.game.victory || this.game.gameOver) {
            this.continueBtn.style.display = 'none';
            this.subTitle.innerHTML = `your score : ${this.game.score}`;
        }

        this.menuTitle.innerHTML = content;
        this.overLayer.style.display = 'block';
        this.popUp.style.display = 'block';
    }
    
    hideMenu() {
        this.game.currentMenu = false;
        
        this.menuTitle.innerHTML = '';
        this.overLayer.style.display = 'none';
        this.popUp.style.display = 'none';
    }
}