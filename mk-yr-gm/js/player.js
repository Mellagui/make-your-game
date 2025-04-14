import { ElementAnimator } from "./animations.js";

export class Player {
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 20;
        this.animator = null;
        this.animations = {
            'pm-frames': {
                path: 'assets/character/pacman-frames.png',
                frameCount: 6,
            },
        };
        this.pacmanElement = null;

        // Movement properties
        this.nextDirection = '';
        this.direction = '';
        this.name = 'pacMan';
        
        // Position in grid cells (for game logic)
        this.x = 10;
        this.y = 5;
        
        // Position in pixels (for rendering)
        this.pixelX = this.game.gridToPixels(this.x);
        this.pixelY = this.game.gridToPixels(this.y);
        
        // Target position in pixels (where we're moving to)
        this.nextPositionPixelX = this.pixelX;
        this.nextPositionPixelY = this.pixelY;
        
        // Is player currently moving between cells
        this.isMoving = false;

        this.createPlayerElement();
    }

    createPlayerElement() {
        // Remove any existing player element
        if (this.pacmanElement) {
            this.pacmanElement.remove();
        }
        
        this.pacmanElement = document.createElement('div');
        this.pacmanElement.className = this.name;
        this.pacmanElement.style.width = `${this.width}px`;
        this.pacmanElement.style.height = `${this.height}px`;
        this.pacmanElement.id = this.name;
        
        // Add the player element to the game board
        this.game.gameBoard.board.appendChild(this.pacmanElement);

        // Init player animator
        this.animator = new ElementAnimator(this.pacmanElement, this.animations);
        this.animator.setAnimation('pm-frames');
        
        // Initial render
        this.render();
    }
    
    render() {
        if (this.pacmanElement) {
            this.pacmanElement.style.left = `${this.pixelX}px`;
            this.pacmanElement.style.top = `${this.pixelY}px`;
            
            // Rotate based on direction
            const arrowMap = {'up': 270, 'down': 90, 'left': 180, 'right': 0};
            const arrow = arrowMap[this.direction] ?? 0;
            this.pacmanElement.style.transform = `rotate(${arrow}deg)`;
        }
    }

    reset() {
        this.x = 10;
        this.y = 5;
        this.pixelX = this.game.gridToPixels(this.x);
        this.pixelY = this.game.gridToPixels(this.y);
        this.nextPositionPixelX = this.pixelX;
        this.nextPositionPixelY = this.pixelY;
        this.direction = '';
        this.isMoving = false;
    }

    update(deltaTime) {
        // If we've reached our target position, update grid position
        if (!this.isMoving) {
            this.x = this.game.pixelsToGrid(this.pixelX);
            this.y = this.game.pixelsToGrid(this.pixelY);
            
            // Check if we can change direction
            if (this.game.gameBoard.map[this.y] && this.game.gameBoard.map[this.y][this.x] === 2 || (this.y === 5 && this.x === 10)) this.tryChangeDirection();
            this.incresPlayerPosition()
        }
        
        // Move towards target if we're not there yet
        if (this.isMoving) {
            this.moveTowardsTarget(deltaTime);
        }
        
        this.render();
    }

    incresPlayerPosition() {
        // Only change direction if we're not currently moving
        if (this.isMoving) return;

        // Calculate potential new target based on nextDirection
        let newPixelX = this.pixelX;
        let newPixelY = this.pixelY;
        
        if (this.direction === 'up') newPixelY -= 20;
        else if (this.direction === 'down') newPixelY += 20;
        else if (this.direction === 'left') newPixelX -= 20;
        else if (this.direction === 'right') newPixelX += 20;
        
        // Convert target to grid coordinates for collision check
        const targetGridX = this.game.pixelsToGrid(newPixelX);
        const targetGridY = this.game.pixelsToGrid(newPixelY);
        
        if (this.direction !== '' && this.game.gameBoard.map[targetGridY] && this.game.gameBoard.map[targetGridY][targetGridX] !== 1) {
            
            this.nextPositionPixelX = newPixelX;
            this.nextPositionPixelY = newPixelY;
            this.isMoving = true;
        }

    }
    
    tryChangeDirection() {
        if (this.nextDirection === '') return

        let x = this.x
        let y = this.y
        
        if (this.nextDirection === 'up') y--;
        else if (this.nextDirection === 'down') y++;
        else if (this.nextDirection === 'left') x--;
        else if (this.nextDirection === 'right') x++;
        
        // Check if the new direction is valid (not a wall)
        if (this.game.gameBoard.map[y] && (this.game.gameBoard.map[y][x] === 2 || this.game.gameBoard.map[y][x] === 0)) {
            this.direction = this.nextDirection
            return
        }

        this.nextDirection = this.direction
    }

    moveTowardsTarget(deltaTime) {
        const moveDistance = this.game.pacmanSpeed * deltaTime;
        
        // Calculate direction vector
        const dx = this.nextPositionPixelX - this.pixelX;
        const dy = this.nextPositionPixelY - this.pixelY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If we're very close to target, snap to it
        if (distance < moveDistance) {
            this.pixelX = this.nextPositionPixelX;
            this.pixelY = this.nextPositionPixelY;
            this.isMoving = false;
            // this.checkDotCollection()
        } else {
            // Move towards target
            this.pixelX += (dx / distance) * moveDistance;
            this.pixelY += (dy / distance) * moveDistance;
        }
    }

    checkDotCollection() {
        if (this.game.gameBoard.map[this.y] && this.game.gameBoard.map[this.y][this.x] !== 1) {
            const pacmanCell = document.getElementById(`${this.x}-${this.y}`);
            
            if (pacmanCell && pacmanCell.dataset.hasDot === 'true') {
                pacmanCell.classList.remove('dot');
                pacmanCell.dataset.hasDot = 'false';
                this.game.score += 10;
                this.game.ui.updateScore(this.game.score);
            }
        }
    }
}