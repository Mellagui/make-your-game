export class InputHandler {
    constructor(game) {
        this.game = game;
        this.directions = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        };
        this.button = document.getElementById('reset');
        this.continue = document.getElementById('continue');
        this.setupEventListeners();
    }

    setupEventListeners() {

        this.button.addEventListener('mouseenter', () => {
            this.button.classList.add('hovered');
            this.button.innerHTML = `<i class='bx bx-reset'></i>`;
        });
        this.button.addEventListener('mouseleave', () => {
            this.button.classList.remove('hovered');
            this.button.innerHTML = 'reset';
        });
        
        this.continue.addEventListener('mouseenter', () => {
            this.continue.classList.add('hovered');
            this.continue.innerHTML = `<i class='bx bx-play'></i>`;
        });
        this.continue.addEventListener('mouseleave', () => {
            this.continue.classList.remove('hovered');
            this.continue.innerHTML = 'play';
        });
        
        this.button.onclick = () => this.game.resetGame();

        this.continue.onclick = () => {
            if (this.game.inGame && !this.game.victory && !this.game.gameOver) {
                if (this.game.pause) this.game.ui.hideMenu();
                this.game.pause = this.game.pause? false: true;
                return
            }

            if (!this.game.inGame) {
                this.game.resetPosition();
                this.game.ui.hideMenu();
                this.game.inGame = true;
                console.log('game started')
            }
        };
        
        document.addEventListener('keydown', e => {
            if ((e.key === ' ' || e.key === 'p') && this.game.inGame && !this.game.victory && !this.game.gameOver) {
                if (this.game.pause) this.game.ui.hideMenu();
                return this.game.pause = this.game.pause? false: true;
            }
            
            if (this.game.victory || this.game.gameOver) {
                this.game.resetGame();
                return
            } else if (!this.game.inGame) {
                this.game.resetPosition();
                this.game.ui.hideMenu();
                this.game.inGame = true;
                console.log('game started')
            }

            if (!this.game.currentMenu && this.directions[e.key]) this.game.player.nextDirection = this.directions[e.key];
        });
    }
}