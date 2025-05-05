import { ElementAnimator } from "./animations.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 20;
        this.pacmanElement = null;

        this.animator = null;
        this.arrowMap = {'up': 270, 'down': 90, 'left': 180, 'right': 0};
        this.animations = {
            'pm-frames': {
                path: 'assets/character/pacman-frames.png',
                frameCount: 6
            }
        }

        // Movement properties
        this.nextDirection = '';
        this.direction = '';
        this.name = 'pacMan';

        // Grid Position
        this.gridX = 10;
        this.gridY = 5;

        // Position in pixels
        this.pixelX = this.game.gridToPixels(this.gridX);
        this.pixelY = this.game.gridToPixels(this.gridY);

        // Next position in pixels
        this.nextPixelX = this.pixelX;
        this.nextPixelY = this.pixelY;

        // is player currently moving between cells
        this.isMoving = false;

        this.createPlayerElement();
    }

    createPlayerElement() {
        if (this.pacmanElement) this.pacmanElement.remove(); // remove any existing player element

        this.pacmanElement = document.createElement('div');
        this.pacmanElement.className = this.name;
        this.pacmanElement.style.width = `${this.width}px`;
        this.pacmanElement.style.height = `${this.height}px`;
        this.pacmanElement.id = this.name;

        this.game.gameBoard.board.appendChild(this.pacmanElement);

        // Init player animator
        this.animator = new ElementAnimator(this.pacmanElement, this.animations);
        this.animator.setAnimation('pm-frames');

        this.render();
    }
    
    render() {
        if (this.pacmanElement) {
            this.pacmanElement.style.left = `${this.pixelX}px`;
            this.pacmanElement.style.top = `${this.pixelY}px`;

            // Rotate based on direction
            const arrow = this.arrowMap[this.direction] ?? 0;
            this.pacmanElement.style.transform = `rotate(${arrow}deg)`;
        }
    }

    reset() {
        this.gridX = 10;
        this.gridY = 5;
        this.pixelX = this.game.gridToPixels(this.gridX);
        this.pixelY = this.game.gridToPixels(this.gridY);
        this.nextPixelX = this.pixelX;
        this.nextPixelY = this.pixelY;
        this.direction = '';
        this.nextDirection = '';
        this.isMoving = false;
    }

    update(deltaTime) {
        if (!this.isMoving) {
            this.gridX = this.game.pixelsToGrid(this.pixelX);
            this.gridY = this.game.pixelsToGrid(this.pixelY);
            
            // Check if we can change direction
            if (!this.game.gameBoard.isWall(this.gridY, this.gridX)) this.tryChangeDirection();

            this.incresPlayerPosition();
        }

        if (this.isMoving) {
            if (!this.animator.isAnimating) this.animator.start(); // start animation when moving

            this.move(deltaTime);

        } else this.animator.stop(); // stop when idle

        this.render();
    }

    tryChangeDirection() {
        if (this.nextDirection === '') return

        let x = this.gridX;
        let y = this.gridY;
        
        if (this.nextDirection === 'up') y--;
        else if (this.nextDirection === 'down') y++;
        else if (this.nextDirection === 'left') x--;
        else if (this.nextDirection === 'right') x++;
        
        // Check if the new direction is valid (not a wall)
        if (!this.game.gameBoard.isWall(y, x)) return this.direction = this.nextDirection;
    }

    incresPlayerPosition() {
        let nextPixelX = this.pixelX;
        let nextPixelY = this.pixelY;

        if (this.direction === 'up') nextPixelY -= 20;
        else if (this.direction === 'down') nextPixelY += 20;
        else if (this.direction === 'left') nextPixelX -= 20;
        else if (this.direction === 'right') nextPixelX += 20;

        // Convert nextPixels to nextGrid coordinates for collision check
        const nextGridX = this.game.pixelsToGrid(nextPixelX);
        const nextGridY = this.game.pixelsToGrid(nextPixelY);

        if (!this.game.gameBoard.isWall(nextGridY, nextGridX)) {
            this.nextPixelX = nextPixelX;
            this.nextPixelY = nextPixelY;
            this.isMoving = true;
        }
    }

    move(deltaTime) {
        const moveDistance = this.game.pacmanSpeed * deltaTime;

        // Calculate direction vector
        const dx = this.nextPixelX - this.pixelX;
        const dy = this.nextPixelY - this.pixelY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If we're very close to target, snap to it
        if (distance < moveDistance) {
            this.pixelX = this.nextPixelX;
            this.pixelY = this.nextPixelY;
            this.isMoving = false;
        } else {
            // Move towards target
            this.pixelX += (dx / distance) * moveDistance;
            this.pixelY += (dy / distance) * moveDistance;
        }
    }

    checkDotCollection() {
        if (!this.game.gameBoard.isWall(this.gridY, this.gridX)) {
            const pacmanCell = document.getElementById(`${this.gridX}-${this.gridY}`);

            if (pacmanCell?.dataset.hasDot === 'true') {
                pacmanCell.classList.remove('dot');
                pacmanCell.dataset.hasDot = 'false';
                this.game.score += 10;
                this.game.ui.updateScore(this.game.score);
            }
        }
    }
}