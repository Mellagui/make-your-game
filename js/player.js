import { ElementAnimator } from "./animations.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 20;

        this.pacmanElement = null;
        this.animator = null;
        this.rotateMap = {'up': 270, 'down': 90, 'left': 180, 'right': 0};

        this.name = 'pacman';
        this.direction = '';
        this.nextDirection = '';

        this.gridX = 10;
        this.gridY = 5;

        this.pixelX = this.game.gridToPixels(this.gridX);
        this.pixelY = this.game.gridToPixels(this.gridY);

        this.nextPixelX = this.pixelX;
        this.nextPixelY = this.pixelY;

        this.isMoving = false;

        this.createPlayerElement();
    }

    createPlayerElement() {
        if (this.pacmanElement) this.pacmanElement.remove(); // remove any existing player element

        this.pacmanElement = document.createElement('div');
        this.pacmanElement.id = this.name;
        this.pacmanElement.className = this.name;
        this.pacmanElement.style.width = `${this.width}px`;
        this.pacmanElement.style.height = `${this.height}px`;

        this.game.gameBoard.board.appendChild(this.pacmanElement);

        // Init player animator
        this.animator = new ElementAnimator(this.pacmanElement);
        this.animator.setAnimation();

        this.render();
    }
    
    render() {
        if (this.pacmanElement) {
            this.pacmanElement.style.left = `${this.pixelX}px`;
            this.pacmanElement.style.top = `${this.pixelY}px`;

            // Rotate based on direction
            const deg = this.rotateMap[this.direction] ?? 0;
            this.pacmanElement.style.transform = `translate3d(0, 0, 0) rotate(${deg}deg)`;
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
            if (this.nextDirection !== '') this.tryChangeDirection();

            this.incresPlayerPosition();
        }

        if (this.isMoving) {
            if (!this.animator.isAnimating) this.animator.start(); // start animation when moving

            this.move(deltaTime);

        } else this.animator.stop(); // stop when idle

        this.render();
    }

    tryChangeDirection() {
        let nextGridX = this.gridX, nextGridY = this.gridY;

        if (this.nextDirection === 'up') nextGridY--;
        else if (this.nextDirection === 'down') nextGridY++;
        else if (this.nextDirection === 'left') nextGridX--;
        else if (this.nextDirection === 'right') nextGridX++;
        
        // Check if the new direction redirect to valid position
        if (!this.game.gameBoard.isWall(nextGridX, nextGridY)) return this.direction = this.nextDirection;
    }

    incresPlayerPosition() {
        let nextGridX = this.gridX, nextGridY = this.gridY;
        
        if (this.direction === 'up') nextGridY--;
        else if (this.direction === 'down') nextGridY++;
        else if (this.direction === 'left') nextGridX--;
        else if (this.direction === 'right') nextGridX++;

        if (!this.game.gameBoard.isWall(nextGridX, nextGridY)) {
            this.nextPixelX = this.game.gridToPixels(nextGridX);
            this.nextPixelY = this.game.gridToPixels(nextGridY);
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
        const pacmanCell = document.getElementById(`${this.gridX}-${this.gridY}`);

        if (pacmanCell?.dataset.hasDot === 'true') {
            pacmanCell.classList.remove('dot');
            pacmanCell.dataset.hasDot = 'false';
            this.game.score += 10;
            this.game.ui.updateScore(this.game.score);
        }
    }
}