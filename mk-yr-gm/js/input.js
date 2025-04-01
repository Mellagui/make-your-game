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
        window.addEventListener('keydown', e => {
            const directions = {
                'ArrowUp': 'up',
                'ArrowDown': 'down',
                'ArrowLeft': 'left',
                'ArrowRight': 'right'
            };
            this.game.inGame = true
            if (directions[e.key]) {
                this.lastKey = directions[e.key];
                this.game.player.nextDirection = this.lastKey
            }
            this.game.player.checkpacmandiretion();
        });
    }
}