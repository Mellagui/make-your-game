import { GameBoard } from './gameBoard.js';
import { Player } from './player.js';
import { Ghosts } from './enemy.js';
import { InputHandler } from './input.js';
import { UI } from './ui.js';

// ghosts

export class Game {
    constructor() {
        // game state
        this.isInitialized = false;
        this.lastTime = 0;
        this.deltaTime = 0;
        this.inGame = false;
        this.victory = false;
        this.gameOver = false;

        // game metrics
        this.score = 0;
        this.lives = 5;
        this.timeRemaining = 240; // 4 minutes
        // this.timeCounter = 0;

        // game objects
        this.ui = new UI(this);
        this.gameBoard = new GameBoard(this);
        this.input = new InputHandler(this);

        this.player = null;
        this.ghosts = null;

        // Animation frame reference
        this.animationFrameId = null;
    }

    init() {
        console.log('Initializing game...');

        // // Make sure UI elements are hidden
        // this.ui.hideAllMenus();

        // Create game board and level
        this.gameBoard.createBoard();

        // Create player after the game board is ready
        this.player = new Player(this);
        this.ghosts = new Ghosts(this);

        // // Update UI
        this.ui.updateScore(this.score);
        this.ui.updateLives(this.lives);
        this.ui.updateTimer(this.timeRemaining);
        
        // // Set initialization flag
        this.isInitialized = true;
        
        // Start the game loop
        this.lastTime = performance.now();
        this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
        
        console.log('Game initialized successfully');
    }

    gameLoop(timestamp) {

        // Calculate delta time (in seconds for easier calculations)
        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;
        
        // Limit delta time to prevent large jumps
        if (this.deltaTime > 0.1) this.deltaTime = 0.1;

        if (this.inGame && !this.gameOver && !this.victory) {
            // Update timer
            this.timeRemaining -= this.deltaTime;
            this.ui.updateTimer(Math.ceil(this.timeRemaining));
            
            if (this.timeRemaining <= 0 || this.lives === 0) {
                this.gameOver = true;
                return
            } else {
                // check if pacman position the same ghost position
                this.ghosts.ppEqualGp(this.player.x, this.player.y)
                if (!this.inGame) {
                    if (this.lives === 0) this.gameOver = true;
                    this.resetPosition()
                    return
                }

                this.player.checkpacmandiretion()

                // increse nextPosition from direction
                this.player.incres()
                this.ghosts.incres()

                this.ghosts.generate()

                // Check if the new position is valid (not a wall)
                this.player.pacmanPosition()

                // Check if the next position is valid (not a wall)
                this.ghosts.nextPositionNotWall()
                
                this.player.updatePosition()
                this.ghosts.updatePosition()
            
            }

            if (this.score >= 2200) {
                this.victory = true;
            }
        }
        // victory and game over
        
        // Continue the game loop
        this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
    }

    resetPosition() {
        this.player.reset()
        this.ghosts.reset()
    }
}