export class InputHandler {
    constructor(game) {
        this.game = game;
        this.directions = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        };

        this.setupEventListeners();
    }

    setupEventListeners() {

        document.getElementById('reset').addEventListener('click', () => this.game.resetGame());

        document.getElementById('continue').addEventListener('click', () => {
            if (this.game.inGame && !this.game.victory && !this.game.gameOver) {
                this.game.ToggelePause();
                return
            }

            if (!this.game.inGame) {
                this.game.resetPosition();
                this.game.ui.hideMenu();
                this.game.inGame = true;

                console.log('continue');
            }
        });

        document.addEventListener('keydown', e => {
            if ((e.key === ' ' || e.key === 'p') && this.game.inGame && !this.game.victory && !this.game.gameOver) {
                this.game.ToggelePause();
                return
            }

            if (this.game.victory || this.game.gameOver) {
                this.game.resetGame();
                return

            } else if (!this.game.inGame) {
                this.game.resetPosition();
                this.game.ui.hideMenu();
                this.game.inGame = true;

                console.log('game started');
            }

            if (!this.game.currentMenu && this.directions[e.key]) this.game.player.nextDirection = this.directions[e.key];
        });
    }
}