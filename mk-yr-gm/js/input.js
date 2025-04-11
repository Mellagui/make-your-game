export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false
        };
        this.lastKey = '';
        
        // Set up event listeners
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', e => {
            const directions = {
                'ArrowUp': 'up',
                'ArrowDown': 'down',
                'ArrowLeft': 'left',
                'ArrowRight': 'right'
            };
            // this.game.inGame = true
            if (this.game.victory || this.game.gameOver) {
                // this.game.resetPosition()
                this.game.victory = false
                this.game.gameOver = false
                this.game.score = 0
                this.game.lives = 5
                this.game.timeRemaining = 240;
                this.game.init()
            }
            if (!this.game.inGame) {
                this.game.resetPosition()
                this.game.inGame = true
            }

            overLayer.style.display = 'none';
            popUp.style.display = 'none';

            if (this.game.inGame && directions[e.key]) {
                this.lastKey = directions[e.key];
                this.game.player.nextDirection = this.lastKey
            }
        });
        
    }
}