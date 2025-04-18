import { GameBoard } from './gameBoard.js';
import { Player } from './player.js';
import { Ghosts } from './enemy.js';
import { InputHandler } from './input.js';
import { UI } from './ui.js';

export class Game {
    constructor() {
        // game state
        this.lastTime = 0;
        this.deltaTime = 0;
        this.inGame = false;
        this.victory = false;
        this.gameOver = false;
        this.maxScore = 0;
        this.pause = false;

        // game metrics
        this.score = 0;
        this.lives = 5;
        this.timeRemaining = 180; // 3 minutes
 
        // movement settings (pixels per second)
        this.pacmanSpeed = 100; // 120px per second = 6 cells per second (20px cells) // 6 cells per second (120/20)
        this.ghostSpeed = 80;    // 80px per second = 4 cells per second // 4 cells per second (80/20)
        this.cellSize = 20;      // Size of each cell in pixels

        // game objects
        this.ui = new UI(this);
        this.gameBoard = new GameBoard(this);
        this.input = new InputHandler(this);

        this.player = null;
        this.ghosts = null;

        // Animation frame reference
        this.animationFrameId = null;

        this.currentMenu = false;

        // In Game constructor
        this.gameLoop = this.gameLoop.bind(this);
    }

    init() {
        console.log('Initializing game...');

        this.gameBoard.createBoard();

        // this.setSpeeds(120, 100)

        this.player = new Player(this);
        this.ghosts = new Ghosts(this);

        this.ui.updateScore(this.score);
        this.ui.updateLives(this.lives);
        this.ui.updateTimer(this.timeRemaining);
        this.ui.showMenu('start')
        
        // Start the game loop
        this.startGameLoop()
        
        console.log('Game initialized successfully');
    }
    
    // Start the game loop
    startGameLoop() {
        this.lastTime = performance.now();
        this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
    cancelGameLoop() {
        // Stop previous loop
        cancelAnimationFrame(this.animationFrameId);
    }

    gameLoop(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;
        
        // Calculate delta time (in seconds for easier calculations)
        this.deltaTime = (timestamp - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = timestamp;

        // Limit delta time to prevent large jumps
        if (this.deltaTime > 0.1) this.deltaTime = 0.1;

        if (this.inGame && !this.gameOver && !this.victory && !this.pause) {
            // Update timer
            this.timeRemaining -= this.deltaTime;
            this.ui.updateTimer(Math.ceil(this.timeRemaining));

            this.player.update(this.deltaTime);

            this.ghosts.update(this.deltaTime);

            this.ghosts.checkCollisionWithPlayer(this.player.pixelX, this.player.pixelY);

            this.player.checkDotCollection();
        }

        if (!this.currentMenu) {
            if (this.score >= this.maxScore) {
                this.victory = true;
                this.ui.showMenu('you win')
                return
            } else if (this.timeRemaining <= 0 || this.lives === 0) {
                this.gameOver = true;
                this.ui.showMenu('game over')
                return;
            }

            if (this.pause) {
                this.ui.showMenu('pause')
            } else if (!this.inGame) {
                this.ui.showMenu('start')
            }
        }
        // console.log('here')

        // Continue the game loop
        this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }

    resetPosition() {
        this.player.reset();
        this.ghosts.reset();
    }

    resetGame() {
        this.cancelGameLoop()

        this.victory = false
        this.gameOver = false
        this.inGame = false
        this.score = 0
        this.lives = 5
        this.timeRemaining = 180;

        this.init()
    }
    
    pixelsToGrid(pixels) {
        return Math.round(pixels / this.cellSize);
    }

    gridToPixels(grid) {
        return grid * this.cellSize;
    }

    setSpeeds(pacmanSpeed, ghostSpeed) {
        this.pacmanSpeed = pacmanSpeed;
        this.ghostSpeed = ghostSpeed;
    }
}