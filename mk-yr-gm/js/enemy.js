export class Ghosts {
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 20;
        this.ghostARR = ['red', 'bleu', 'orange', 'pink'];
        this.directions = ['up', 'down', 'left', 'right'];
        this.ghosts = {
            red: {
                ghostElement: null,
                name: 'redGhost',
                path: 'assets/enemy/r-ghost.png',
                // Grid positions
                gridX: 4,
                gridY: 5,
                // Pixel positions
                pixelX: game.gridToPixels(4),
                pixelY: game.gridToPixels(5),
                // Movement
                direction: 'right',
                nextPixelX: game.gridToPixels(5),
                nextPixelY: game.gridToPixels(5),
                isMoving: false,
            },
            bleu: {
                ghostElement: null,
                name: 'bleuGhost',
                path: 'assets/enemy/b-ghost.png',
                gridX: 17,
                gridY: 5,
                pixelX: game.gridToPixels(17),
                pixelY: game.gridToPixels(5),
                direction: 'left',
                nextPixelX: game.gridToPixels(16),
                nextPixelY: game.gridToPixels(5),
                isMoving: false,
            },
            orange: {
                ghostElement: null,
                name: 'orangeGhost',
                path: 'assets/enemy/o-ghost.png',
                gridX: 4,
                gridY: 15,
                pixelX: game.gridToPixels(4),
                pixelY: game.gridToPixels(15),
                direction: 'right',
                nextPixelX: game.gridToPixels(5),
                nextPixelY: game.gridToPixels(15),
                isMoving: false,
            },
            pink: {
                ghostElement: null,
                name: 'pinkGhost',
                path: 'assets/enemy/p-ghost.png',
                gridX: 17,
                gridY: 15,
                pixelX: game.gridToPixels(17),
                pixelY: game.gridToPixels(15),
                direction: 'left',
                nextPixelX: game.gridToPixels(16),
                nextPixelY: game.gridToPixels(15),
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
            img.style.padding = '1px'
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
                ghost.gridX = this.game.pixelsToGrid(ghost.pixelX);
                ghost.gridY = this.game.pixelsToGrid(ghost.pixelY);
                
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
        let nextGridX = ghost.gridX;
        let nextGridY = ghost.gridY;

        if (ghost.direction === 'up') nextGridY--;
        else if (ghost.direction === 'down') nextGridY++;
        else if (ghost.direction === 'left') nextGridX--;
        else if (ghost.direction === 'right') nextGridX++;

        // If next position is invalid, choose new direction
        if (this.game.gameBoard.map[nextGridY] && this.game.gameBoard.map[nextGridY][nextGridX] === 1) {
            ghost.direction = this.randomValidDirection(ghost);

            // Recalculate next position with new direction
            nextGridX = ghost.gridX;
            nextGridY = ghost.gridY;
            
            if (ghost.direction === 'up') nextGridY--;
            else if (ghost.direction === 'down') nextGridY++;
            else if (ghost.direction === 'left') nextGridX--;
            else if (ghost.direction === 'right') nextGridX++;
        }
            
        // Set target position
        ghost.nextPixelX = this.game.gridToPixels(nextGridX);
        ghost.nextPixelY = this.game.gridToPixels(nextGridY);
        ghost.isMoving = true;
    }

    randomValidDirection(ghost) { 
        const validDirections = [];
        
        // Check each direction for validity
        for (const dir of this.directions) {
            let nextGridX = ghost.gridX;
            let nextGridY = ghost.gridY;
            
            if (dir === 'up') nextGridY--;
            else if (dir === 'down') nextGridY++;
            else if (dir === 'left') nextGridX--;
            else if (dir === 'right') nextGridX++;
            
            if (this.game.gameBoard.map[nextGridY] && this.game.gameBoard.map[nextGridY][nextGridX] !== 1) {
                validDirections.push(dir);
            }
        }
        
        // Return a random valid direction
        return validDirections[Math.floor(Math.random() * validDirections.length)];
    }

    moveGhostTowardsTarget(ghost, deltaTime) {
        const moveDistance = this.game.ghostSpeed * deltaTime;
        
        // Calculate direction vector
        const dx = ghost.nextPixelX - ghost.pixelX;
        const dy = ghost.nextPixelY - ghost.pixelY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If we're very close to target, snap to it
        if (distance < moveDistance) {
            ghost.pixelX = ghost.nextPixelX;
            ghost.pixelY = ghost.nextPixelY;
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
            ghost.gridX = val === 'red' || val === 'orange'? 4: 17;
            ghost.gridY = val === 'red' || val === 'bleu'? 5: 15;
            
            ghost.pixelX = this.game.gridToPixels(ghost.gridX);
            ghost.pixelY = this.game.gridToPixels(ghost.gridY);
            
            // Reset movement
            ghost.direction = val === 'red' || val === 'orange'? 'right': 'left';
            ghost.isMoving = false;
        });
    }
}