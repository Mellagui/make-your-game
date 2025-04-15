export class InputHandler {
    constructor(game) {
        this.game = game;
        this.directions = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        };
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', e => {

            if (e.code === 'KeyP' && this.game.inGame) {
                if (this.game.pause) this.game.ui.hideMenu()
                this.game.pause = this.game.pause? false: true;
                return 
            }

            if (this.game.victory || this.game.gameOver) {
                this.game.resetData()
                this.game.init()
            } else if (!this.game.inGame) {
                this.game.resetPosition()
                this.game.ui.hideMenu()
                this.game.inGame = true
            }

            if (this.game.inGame && !this.game.pause && this.directions[e.key]) {
                this.game.player.nextDirection = this.directions[e.key];
            }
        });
        
    }
}