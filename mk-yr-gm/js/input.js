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

        document.getElementById('reset').onclick = () => this.game.resetGame();

        document.addEventListener('keydown', e => {
            if ((e.key === ' ' || e.key === 'p') && this.game.inGame) {
                if (this.game.pause) this.game.ui.hideMenu();
                this.game.pause = this.game.pause? false: true;
                return
            }

            if (this.game.victory || this.game.gameOver) {
                this.game.resetGame();
            } else if (!this.game.inGame) {
                this.game.resetPosition();
                this.game.ui.hideMenu();
                this.game.inGame = true;
            }

            if (!this.game.currentMenu && this.directions[e.key]) this.game.player.nextDirection = this.directions[e.key];
        });
    }
}