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

        // game metrics
        this.score = 0;
        this.lives = 5;
        this.timeRemaining = 240; // 4 minutes

        // // In your game initialization:
        // game.pacmanSpeed = 120; // 6 cells per second (120/20)
        // game.ghostSpeed = 80;   // 4 cells per second (80/20)
        // movement settings (pixels per second)
        this.pacmanSpeed = 100; // 120px per second = 6 cells per second (20px cells)
        this.ghostSpeed = 80;    // 80px per second = 4 cells per second
        this.cellSize = 20;      // Size of each cell in pixels

        // game objects
        this.ui = new UI(this);
        this.gameBoard = new GameBoard(this);
        this.input = new InputHandler(this);

        this.player = null;
        this.ghosts = null;

        // Animation frame reference
        this.animationFrameId = null;

         // End-Event Animations
        this.overLayer = document.getElementById('overLayer');
        this.popUp = document.getElementById('popUp');
        this.menuContent = document.getElementById('menuContent');
    }

    init() {
        console.log('Initializing game...');

        // To change speeds during gameplay:
        this.setSpeeds(100, 80); // Faster Pacman (8 cells/sec), faster ghosts (5 cells/sec)

        // Create game board and level
        this.gameBoard.createBoard();

        // Create player after the game board is ready
        this.player = new Player(this);
        this.ghosts = new Ghosts(this);

        // Update UI
        this.ui.updateScore(this.score);
        this.ui.updateLives(this.lives);
        this.ui.updateTimer(this.timeRemaining);
        
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
                this.inGame = false;
                return;
            }
            
            // Handle player movement
            this.player.update(this.deltaTime);
            
            // Handle ghost movement
            this.ghosts.update(this.deltaTime);
            
            // Check for collisions after movement
            this.ghosts.checkCollisionWithPlayer(this.player.pixelX, this.player.pixelY);
            
            // Check for dot collection
            this.player.checkDotCollection();

            if (this.score >= this.maxScore) {
                this.victory = true;
                this.inGame = false;
            }
        }
    
        if (this.victory) {
            this.menu('you win <br> press to start new game')
            return
        } else if (this.gameOver) {
            console.log('rrrr')
            this.menu('you lose <br> press to start new game')
            return
        } else if (!this.inGame) {
            this.menu('press to start')
        }
        
        // Continue the game loop
        this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
    }
   

    // End-Event Animations Handler
    menu(content) {
        menuContent.innerHTML = content;
        overLayer.style.display = 'block';
        popUp.style.display = 'block';
    }

    resetPosition() {
        this.player.reset();
        this.ghosts.reset();
    }

    // Convert pixel position to grid coordinates
    pixelsToGrid(pixels) {
        return Math.round(pixels / this.cellSize);
    }

    // Convert grid position to pixel coordinates
    gridToPixels(grid) {
        return grid * this.cellSize;
    }

    // Method to change speeds if needed (in pixels per second)
    setSpeeds(pacmanSpeed, ghostSpeed) {
        this.pacmanSpeed = pacmanSpeed;
        this.ghostSpeed = ghostSpeed;
    }
}