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

            if (e.code === 'KeyP' && this.game.inGame) {
                if (this.game.pause) this.game.ui.hideMenu()
                this.game.pause = this.game.pause? false: true;
                return 
            }

            if (this.game.victory || this.game.gameOver) {
                this.game.victory = false
                this.game.gameOver = false
                this.game.inGame = false
                this.game.score = 0
                this.game.lives = 5
                this.game.timeRemaining = 180;
                this.game.init()
            } else if (!this.game.inGame) {
                // this.game.startGameLoop()
                this.game.resetPosition()
                this.game.ui.hideMenu()
                this.game.inGame = true
            }

            if (this.game.inGame && !this.game.pause && directions[e.key]) {
                this.lastKey = directions[e.key];
                this.game.player.nextDirection = this.lastKey
            }
        });
        
    }
}