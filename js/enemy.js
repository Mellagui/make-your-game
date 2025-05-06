export class Ghosts {
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 20;

        this.directions = ['up', 'down', 'left', 'right'];
        this.ghosts = {
            red: {
                ghostElement: null,
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
        for (const [name, ghost] of Object.entries(this.ghosts)) {
            
            if (ghost.ghostElement) ghost.ghostElement.remove();

            ghost.ghostElement = document.createElement('div');
            ghost.ghostElement.id = name;
            ghost.ghostElement.className = name;
            ghost.ghostElement.style.width = `${this.width}px`;
            ghost.ghostElement.style.height = `${this.height}px`;
            
            const img = document.createElement('img');
            img.src = ghost.path;
            ghost.ghostElement.appendChild(img);

            this.game.gameBoard.board.appendChild(ghost.ghostElement);

            this.render(ghost);
        };
    }

    render(ghost) {
        if (ghost.ghostElement) ghost.ghostElement.style.transform = `translate(${ghost.pixelX}px, ${ghost.pixelY}px)`;
    }

    update(deltaTime) {
        for (const ghost of Object.values(this.ghosts)) {
            // if not moving update grid position
            if (!ghost.isMoving) {
                ghost.gridX = this.game.pixelsToGrid(ghost.pixelX);
                ghost.gridY = this.game.pixelsToGrid(ghost.pixelY);

                // decide next position
                this.decideGhostMove(ghost);
            }

            if (ghost.isMoving) this.move(ghost, deltaTime);

            this.render(ghost);
        };
    }

    playerTrack(ghost) {
        // vertical
        if (this.game.player.gridX === ghost.gridX) {
            if (this.game.player.gridY > ghost.gridY) {
                return 'down'
            }
            return 'up'
        // horizontal
        } else if (this.game.player.gridY === ghost.gridY) {
            if (this.game.player.gridX > ghost.gridX) {
                return 'right'
            }
            return 'left'
        }
    }

    decideGhostMove(ghost) {
        let nextGridX = ghost.gridX, nextGridY = ghost.gridY;

        // if position in map = 2
        if (this.game.gameBoard.map[ghost.gridY]?.[ghost.gridX] === 2) {

            // if player and ghost in the same line
            if (this.game.player.gridX === ghost.gridX || this.game.player.gridY === ghost.gridY) {

                ghost.direction = this.playerTrack(ghost);

                if (ghost.direction === 'up') nextGridY--;
                else if (ghost.direction === 'down') nextGridY++;
                else if (ghost.direction === 'left') nextGridX--;
                else if (ghost.direction === 'right') nextGridX++;

                // if next position for ghosts equal wall, cancel player tracking
                if (this.game.gameBoard.isWall(nextGridX, nextGridY)) ghost.direction = this.randomValidDirection(ghost);

                nextGridX = ghost.gridX; nextGridY = ghost.gridY;

            } else ghost.direction = this.randomValidDirection(ghost);
        }

        if (ghost.direction === 'up') nextGridY--;
        else if (ghost.direction === 'down') nextGridY++;
        else if (ghost.direction === 'left') nextGridX--;
        else if (ghost.direction === 'right') nextGridX++;

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

            return !this.game.gameBoard.isWall(nextGridX, nextGridY);
        })

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
        }
    }

    checkCollisionWithPlayer() {
        const player = {
            width: this.game.player.width,
            height: this.game.player.height,
            x: this.game.player.pixelX,
            y: this.game.player.pixelY
        };

        for (const value of Object.values(this.ghosts)) {

            if (this.checkCollision(value, player) && this.game.lives > 0) {
                this.game.lives--;
                this.game.ui.updateLives(this.game.lives);
                this.game.inGame = false;
                return
            }
        };
    }

    checkCollision(ghost, player) {
        return (
            ghost.pixelX + 4 < player.x + player.width &&
            ghost.pixelX - 4 + this.width > player.x &&
            ghost.pixelY + 4 < player.y + player.height &&
            ghost.pixelY - 4 + this.height > player.y
        );
    }

    reset() {
        for (const [name, value] of Object.entries(this.ghosts)) {

            value.gridX = name === 'red' || name === 'orange'? 4: 17;
            value.gridY = name === 'red' || name === 'bleu'? 5: 15;

            value.pixelX = this.game.gridToPixels(value.gridX);
            value.pixelY = this.game.gridToPixels(value.gridY);

            value.direction = name === 'red' || name === 'orange'? 'right': 'left';
            value.isMoving = false;
        };
    }
}