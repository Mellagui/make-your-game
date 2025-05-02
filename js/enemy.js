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
                gridX: 4,
                gridY: 5,
                pixelX: game.gridToPixels(4),
                pixelY: game.gridToPixels(5),
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
            
            if (ghost.ghostElement) {
                ghost.ghostElement.remove();
            }
            // // for svg ghost elements
            // <i class='bx bx-ghost' ></i>
            // ghost.ghostElement.classList.add('bx')
            // ghost.ghostElement.classList.add('bx-ghost')

            ghost.ghostElement = document.createElement('div');
            ghost.ghostElement.id = ghost.name;
            ghost.ghostElement.className = ghost.name;
            ghost.ghostElement.style.width = `${this.width}px`;
            ghost.ghostElement.style.height = `${this.height}px`;
            
            const img = document.createElement('img');
            img.src = ghost.path;
            ghost.ghostElement.appendChild(img);

            this.game.gameBoard.board.appendChild(ghost.ghostElement);

            this.render(ghost);
        });
    }
    
    render(ghost) {
        if (ghost.ghostElement) ghost.ghostElement.style.transform = `translate(${ghost.pixelX}px, ${ghost.pixelY}px)`;
    }

    update(deltaTime) {
        this.ghostARR.forEach(val => {
            const ghost = this.ghosts[val];

            // if not moving update grid position
            if (!ghost.isMoving) {
                ghost.gridX = this.game.pixelsToGrid(ghost.pixelX);
                ghost.gridY = this.game.pixelsToGrid(ghost.pixelY);

                // decide next position
                this.decideGhostMove(ghost);
            }

            if (ghost.isMoving) this.move(ghost, deltaTime);

            this.render(ghost);
        });
    }

    playerTrack(ghost) {
        if (this.game.player.gridX === ghost.gridX) {
            if (this.game.player.gridY > ghost.gridY) {
                return 'down'
            } else return 'up'
        } else if (this.game.player.gridY === ghost.gridY) {
            if (this.game.player.gridX > ghost.gridX) {
                return 'right'
            } else return 'left'
        }
    }

    decideGhostMove(ghost) {
        let nextGridX = ghost.gridX, nextGridY = ghost.gridY;

        if (ghost.direction === 'up') nextGridY--;
        else if (ghost.direction === 'down') nextGridY++;
        else if (ghost.direction === 'left') nextGridX--;
        else if (ghost.direction === 'right') nextGridX++;

        // if next position is invalid, choose new direction
        if (this.game.gameBoard.map[ghost.gridX]?.[ghost.gridY] === 2) {
            if (this.game.player.gridX === ghost.gridX || this.game.player.gridY === ghost.gridY) {
                ghost.direction = this.playerTrack(ghost)

                nextGridX = ghost.gridX, nextGridY = ghost.gridY;

                if (ghost.direction === 'up') nextGridY--;
                else if (ghost.direction === 'down') nextGridY++;
                else if (ghost.direction === 'left') nextGridX--;
                else if (ghost.direction === 'right') nextGridX++;

                if (this.game.gameBoard.map[nextGridX]?.[nextGridY] === 1) {
                    ghost.direction = this.randomValidDirection(ghost);
                }

            } else ghost.direction = this.randomValidDirection(ghost);

            nextGridX = ghost.gridX; nextGridY = ghost.gridY;

            if (ghost.direction === 'up') nextGridY--;
            else if (ghost.direction === 'down') nextGridY++;
            else if (ghost.direction === 'left') nextGridX--;
            else if (ghost.direction === 'right') nextGridX++;
        }

        // set next position
        ghost.nextPixelX = this.game.gridToPixels(nextGridX);
        ghost.nextPixelY = this.game.gridToPixels(nextGridY);
        ghost.isMoving = true;
    }

    randomValidDirection(ghost) {
        let validDirections = this.directions.filter(dir => {
            let nextGridX = ghost.gridX, nextGridY = ghost.gridY;

            if (dir === 'up') nextGridY--;
            else if (dir === 'down') nextGridY++;
            else if (dir === 'left') nextGridX--;
            else if (dir === 'right') nextGridX++;

            return this.game.gameBoard.map[nextGridY]?.[nextGridX] !== 1;
        })

        // if (validDirections.length > 1) validDirections.map(val => val != ghost.direction);

        return validDirections[Math.floor(Math.random() * validDirections.length)];
    }

    move(ghost, deltaTime) {
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
            // console.log()
        }
    }

    checkCollisionWithPlayer(playerX, playerY) {
        const px = this.game.pixelsToGrid(playerX);
        const py = this.game.pixelsToGrid(playerY);

        this.ghostARR.forEach(val => {
            const ghost = this.ghosts[val];
            const gx = this.game.pixelsToGrid(ghost.pixelX);
            const gy = this.game.pixelsToGrid(ghost.pixelY);

            if (px === gx && py === gy && this.game.lives > 0) {
                this.game.lives--;
                this.game.ui.updateLives(this.game.lives);
                this.game.inGame = false;
            }
        });
    }

    reset() {
        this.ghostARR.forEach(val => {
            const ghost = this.ghosts[val];

            ghost.gridX = val === 'red' || val === 'orange'? 4: 17;
            ghost.gridY = val === 'red' || val === 'bleu'? 5: 15;

            ghost.pixelX = this.game.gridToPixels(ghost.gridX);
            ghost.pixelY = this.game.gridToPixels(ghost.gridY);

            ghost.direction = val === 'red' || val === 'orange'? 'right': 'left';
            ghost.isMoving = false;
        });
    }
}