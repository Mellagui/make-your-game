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
        this.gridX = 10;
        this.gridY = 5;
        
        // Position in pixels (for rendering)
        this.pixelX = this.game.gridToPixels(this.gridX);
        this.pixelY = this.game.gridToPixels(this.gridY);
        
        // Target position in pixels (where we're moving to)
        this.targetX = this.pixelX;
        this.targetY = this.pixelY;
        
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
        this.gridX = 10;
        this.gridY = 5;
        this.pixelX = this.game.gridToPixels(this.gridX);
        this.pixelY = this.game.gridToPixels(this.gridY);
        this.targetX = this.pixelX;
        this.targetY = this.pixelY;
        this.direction = '';
        this.isMoving = false;
    }

    update(deltaTime) {
        // If we've reached our target position, update grid position
        if (!this.isMoving) {
            this.gridX = this.game.pixelsToGrid(this.pixelX);
            this.gridY = this.game.pixelsToGrid(this.pixelY);
            
            // Check if we can change direction
            this.tryChangeDirection();
        }
        
        // Move towards target if we're not there yet
        if (this.isMoving) {
            this.moveTowardsTarget(deltaTime);
        }
        
        this.render();
    }

    tryChangeDirection() {
        // Only change direction if we're not currently moving
        if (this.isMoving) return;
        
        // Calculate potential new target based on nextDirection
        let newTargetX = this.pixelX;
        let newTargetY = this.pixelY;
        
        if (this.nextDirection === 'up') newTargetY -= 20;
        else if (this.nextDirection === 'down') newTargetY += 20;
        else if (this.nextDirection === 'left') newTargetX -= 20;
        else if (this.nextDirection === 'right') newTargetX += 20;
        
        // Convert target to grid coordinates for collision check
        const targetGridX = this.game.pixelsToGrid(newTargetX);
        const targetGridY = this.game.pixelsToGrid(newTargetY);
        
        // Check if the new direction is valid (not a wall)
        if (this.nextDirection !== '' && this.game.gameBoard.map[targetGridY] && this.game.gameBoard.map[targetGridY][targetGridX] !== 1) {
            
            this.direction = this.nextDirection;
            this.targetX = newTargetX;
            this.targetY = newTargetY;
            this.isMoving = true;
        }
    }

    moveTowardsTarget(deltaTime) {
        const moveDistance = this.game.pacmanSpeed * deltaTime;
        
        // Calculate direction vector
        const dx = this.targetX - this.pixelX;
        const dy = this.targetY - this.pixelY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If we're very close to target, snap to it
        if (distance < moveDistance) {
            this.pixelX = this.targetX;
            this.pixelY = this.targetY;
            this.isMoving = false;
            this.checkDotCollection();
        } else {
            // Move towards target
            this.pixelX += (dx / distance) * moveDistance;
            this.pixelY += (dy / distance) * moveDistance;
        }
    }

    checkDotCollection() {
        const gridX = this.game.pixelsToGrid(this.pixelX);
        const gridY = this.game.pixelsToGrid(this.pixelY);
        // const gridX = Math.ceil(this.pixelX / this.game.cellSize)
        // const gridY = Math.ceil(this.pixelY / this.game.cellSize)
        
        
        if (this.game.gameBoard.map[gridY] && (this.game.gameBoard.map[gridY][gridX] === 2 || this.game.gameBoard.map[gridY][gridX] === 0)) {
            console.log(this.game.gameBoard.map[gridY][gridX])
            // console.log()
            const pacmanCell = document.getElementById(`${gridX}-${gridY}`);
            
            if (pacmanCell && pacmanCell.dataset.hasDot === 'true') {
                pacmanCell.classList.remove('dot');
                pacmanCell.dataset.hasDot = 'false';
                this.game.score += 10;
                this.game.ui.updateScore(this.game.score);
            }
        }
    }
}