import { Controller } from "../input/controller.js";
import { GameBoard } from "../graphics/gameBoard.js"
import { Ghosts } from "../entities/ghost.js";
import { Player } from "../entities/player.js";
import { UI } from "../ui/ui.js";

export class Game {
    constructor() {
        // game state
        this.lastTime = 0;
        this.deltaTime = 0;
        this.maxScore = 0;
        this.inGame = false;
        this.victory = false;
        this.gameOver = false;
        this.pause = false;

        this.score = 0;
        this.lives = 5;
        this.timeRemaining = 120;
        this.displayedTime = null;

        this.pacmanSpeed = 70;  // 5 cells per second (100/20)
        this.ghostSpeed = 60;    // 4 cells per second (80/20)

        this.ui = new UI(this);
        this.gameBoard = new GameBoard(this);
        this.controller = new Controller(this);

        this.player = new Player(this);
        this.ghosts = new Ghosts(this);

        this.animationFrameId = null;
        this.currentMenu = false;

        this.gameLoop = this.gameLoop.bind(this);
    }

    init() {
        console.log('Initializing game...');

        this.gameBoard.createBoard();

        this.player.init();
        this.ghosts.init();

        this.ui.updateScore(this.score);
        this.ui.updateLives(this.lives);
        this.ui.updateTimer(this.timeRemaining);
        this.ui.showMenu('start game');

        this.startGameLoop();

        console.log('Game initialized successfully');
    }

    startGameLoop() {
        this.lastTime = performance.now();
        this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }

    cancelGameLoop() {
        cancelAnimationFrame(this.animationFrameId);
    }

    gameLoop(timestamp) {
        if (!this.lastTime) this.lastTime = timestamp;

        // Calculate delta time (time between frames)
        this.deltaTime = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Limit delta time to prevent large jumps
        if (this.deltaTime > 0.1) this.deltaTime = 0.1;

        if (this.inGame && !this.gameOver && !this.victory && !this.pause) {

            this.timeRemaining -= this.deltaTime;
            if (this.displayedTime != Math.ceil(this.timeRemaining)) {
                this.displayedTime = Math.ceil(this.timeRemaining);
                this.ui.updateTimer(this.displayedTime);
            };

            if (this.player) this.player.update(this.deltaTime);

            if (this.ghosts) {
                this.ghosts.update(this.deltaTime);
                this.ghosts.checkCollisionWithPlayer();
            }
        }

        if (!this.currentMenu) this.checkGameState();

        this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }

    checkGameState() {
        if (this.score >= this.maxScore && this.maxScore > 0) {
            this.victory = true;
            this.ui.showMenu('win');
            return
        } else if (this.timeRemaining <= 0 || this.lives === 0) {
            this.gameOver = true;
            this.ui.showMenu('game over');
            return
        }

        if (this.pause) {
            this.ui.showMenu('game pause');

        } else if (!this.inGame) {
            this.ui.showMenu('continue');
        }
    }

    togglePause() {
        if (this.pause) this.ui.hideMenu();
        this.pause = this.pause ? false : true;
    }

    resetPosition() {
        if (this.player) this.player.reset();
        if (this.ghosts) this.ghosts.reset();
    }

    resetGame() {
        this.cancelGameLoop();

        this.victory = false;
        this.gameOver = false;
        this.pause = false;
        this.inGame = false;
        this.score = 0;
        this.lives = 5;
        this.timeRemaining = 120;

        console.log('game restarted')
        this.init();
    }
}