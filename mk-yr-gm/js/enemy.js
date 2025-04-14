export class Ghosts {
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 20;
        this.ghostARR = ['red', 'bleu', 'orange', 'pink', 'dark'];
        this.directions = ['up', 'down', 'left', 'right'];
        this.ghosts = {
            red: {
                ghostElement: null,
                name: 'redGhost',
                path: 'assets/enemy/r-ghost.png',
                // Grid positions
                x: 4,
                y: 5,
                // Pixel positions
                pixelX: game.gridToPixels(4),
                pixelY: game.gridToPixels(5),
                // Movement
                direction: 'right',
                targetX: game.gridToPixels(5),
                targetY: game.gridToPixels(5),
                isMoving: false,
            },
            bleu: {
                ghostElement: null,
                name: 'bleuGhost',
                path: 'assets/enemy/b-ghost.png',
                x: 17,
                y: 5,
                pixelX: game.gridToPixels(17),
                pixelY: game.gridToPixels(5),
                direction: 'left',
                targetX: game.gridToPixels(16),
                targetY: game.gridToPixels(5),
                isMoving: false,
            },
            orange: {
                ghostElement: null,
                name: 'orangeGhost',
                path: 'assets/enemy/o-ghost.png',
                x: 4,
                y: 15,
                pixelX: game.gridToPixels(4),
                pixelY: game.gridToPixels(15),
                direction: 'right',
                targetX: game.gridToPixels(5),
                targetY: game.gridToPixels(15),
                isMoving: false,
            },
            pink: {
                ghostElement: null,
                name: 'pinkGhost',
                path: 'assets/enemy/p-ghost.png',
                x: 17,
                y: 15,
                pixelX: game.gridToPixels(17),
                pixelY: game.gridToPixels(15),
                direction: 'left',
                targetX: game.gridToPixels(16),
                targetY: game.gridToPixels(15),
                isMoving: false,
            },
            dark: {
                ghostElement: null,
                name: 'darkGhost',
                path: 'assets/enemy/d-ghost.png',
                x: 9,
                y: 13,
                pixelX: game.gridToPixels(9),
                pixelY: game.gridToPixels(13),
                direction: 'up',
                targetX: game.gridToPixels(9),
                targetY: game.gridToPixels(12),
                isMoving: false,
            }
        };

        this.createGhostElement();
    }

    createGhostElement() {
        this.ghostARR.forEach(val => {
            const ghost = this.ghosts[val];
            
            // Remove any existing ghost element
            if (ghost.ghostElement) {
                ghost.ghostElement.remove();
            }
            
            ghost.ghostElement = document.createElement('div');
            ghost.ghostElement.className = ghost.name;
            ghost.ghostElement.style.width = `${this.width}px`;
            ghost.ghostElement.style.height = `${this.height}px`;
            ghost.ghostElement.id = ghost.name;
            
            const img = document.createElement('img');
            img.src = ghost.path;
            ghost.ghostElement.appendChild(img);

            // Add the ghost element to the game board
            this.game.gameBoard.board.appendChild(ghost.ghostElement);
            
            // Initial render
            this.render(ghost);
        });
    }
    
    render(ghost) {
        if (ghost.ghostElement) {
            ghost.ghostElement.style.left = `${ghost.pixelX}px`;
            ghost.ghostElement.style.top = `${ghost.pixelY}px`;
        }
    }

    update(deltaTime) {
        this.ghostARR.forEach(val => {
            const ghost = this.ghosts[val];
            
            // Update grid position if not moving
            if (!ghost.isMoving) {
                ghost.x = this.game.pixelsToGrid(ghost.pixelX);
                ghost.y = this.game.pixelsToGrid(ghost.pixelY);
                
                // Decide next move
                this.decideGhostMove(ghost);
            }
            
            // Move towards target if needed
            if (ghost.isMoving) {
                this.moveGhostTowardsTarget(ghost, deltaTime);
            }
            
            this.render(ghost);
        });
    }

    decideGhostMove(ghost) {
        // Check if current direction is still valid
        let nextx = ghost.x;
        let nexty = ghost.y;

        if (this.game.gameBoard.map[nexty] && this.game.gameBoard.map[nexty][nextx] === 0) {
            if (ghost.direction === 'up') nexty--;
            else if (ghost.direction === 'down') nexty++;
            else if (ghost.direction === 'left') nextx--;
            else if (ghost.direction === 'right') nextx++;

            ghost.targetX = this.game.gridToPixels(nextx);
            ghost.targetY = this.game.gridToPixels(nexty);
            ghost.isMoving = true;
            return

        } else if (this.game.gameBoard.map[nexty] && this.game.gameBoard.map[nexty][nextx] === 2) {

            if (ghost.direction === 'up') nexty--;
            else if (ghost.direction === 'down') nexty++;
            else if (ghost.direction === 'left') nextx--;
            else if (ghost.direction === 'right') nextx++;

            // If next position is invalid, choose new direction
            if (this.game.gameBoard.map[nexty] && this.game.gameBoard.map[nexty][nextx] === 1) {
                ghost.direction = this.randomValidDirection(ghost);
                
                // Recalculate next position with new direction
                nextx = ghost.x;
                nexty = ghost.y;
                
                if (ghost.direction === 'up') nexty--;
                else if (ghost.direction === 'down') nexty++;
                else if (ghost.direction === 'left') nextx--;
                else if (ghost.direction === 'right') nextx++;
            }
                
            // Set target position
            ghost.targetX = this.game.gridToPixels(nextx);
            ghost.targetY = this.game.gridToPixels(nexty);
            ghost.isMoving = true;
        }
    }

    randomValidDirection(ghost) { 
        const validDirections = [];
        
        // Check each direction for validity
        for (const dir of this.directions) {
            let checkX = ghost.x;
            let checkY = ghost.y;
            
            if (dir === 'up') checkY--;
            else if (dir === 'down') checkY++;
            else if (dir === 'left') checkX--;
            else if (dir === 'right') checkX++;
            
            if (this.game.gameBoard.map[checkY] && (this.game.gameBoard.map[checkY][checkX] !== 1 || this.game.gameBoard.map[checkY][checkX] === 2)) {
                validDirections.push(dir);
            }
        }
        
        // If no valid directions (shouldn't happen), return current direction
        if (validDirections.length === 0) return ghost.direction;
        
        // Return a random valid direction
        return validDirections[Math.floor(Math.random() * validDirections.length)];
    }

    moveGhostTowardsTarget(ghost, deltaTime) {
        const moveDistance = this.game.ghostSpeed * deltaTime;
        
        // Calculate direction vector
        const dx = ghost.targetX - ghost.pixelX;
        const dy = ghost.targetY - ghost.pixelY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If we're very close to target, snap to it
        if (distance < moveDistance) {
            ghost.pixelX = ghost.targetX;
            ghost.pixelY = ghost.targetY;
            ghost.isMoving = false;
        } else {
            // Move towards target
            ghost.pixelX += (dx / distance) * moveDistance;
            ghost.pixelY += (dy / distance) * moveDistance;
        }
    }

    checkCollisionWithPlayer(playerX, playerY) {
        const playerx = this.game.pixelsToGrid(playerX);
        const playery = this.game.pixelsToGrid(playerY);
        
        this.ghostARR.forEach(val => {
            const ghost = this.ghosts[val];
            const ghostx = this.game.pixelsToGrid(ghost.pixelX);
            const ghosty = this.game.pixelsToGrid(ghost.pixelY);
            
            if (playerx === ghostx && playery === ghosty) {
                if (this.game.lives > 0) {
                    this.game.lives--;
                    this.game.ui.updateLives(this.game.lives);
                    this.game.inGame = false;
                }
            }
        });
    }

    reset() {
        this.ghostARR.forEach(val => {
            const ghost = this.ghosts[val];
            
            // Reset to initial positions
            ghost.x = val === 'red' || val === 'orange'? 4: val === 'bleu' || val === 'pink' ? 17 : 9;
            ghost.y = val === 'red' || val === 'bleu'? 5: val === 'orange' || val === 'pink' ? 15 : 13;
            
            ghost.pixelX = this.game.gridToPixels(ghost.x);
            ghost.pixelY = this.game.gridToPixels(ghost.y);
            
            // Reset movement
            ghost.direction = val === 'red' || val === 'orange'? 'right': val === 'bleu' || val === 'pink'? 'left': 'up';
            ghost.isMoving = false;
        });
    }
}