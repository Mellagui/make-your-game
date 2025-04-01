export class Ghosts {
    constructor(game) {
        this.game = game;
        this.width = 20;
        this.height = 20;
        this.ghostARR = ['red', 'bleu', 'orange', 'pink', 'dark'];
        this.ghosts = {
            red: {
                ghostElement: null,
                name: 'redGhost',
                path: 'assets/enemy/r-ghost.png',
                position: { x:4, y: 5},
                nextPosition: { x:4, y: 5},
                direction: 'right',
            },
            bleu: {
                ghostElement: null,
                name: 'bleuGhost',
                path: 'assets/enemy/b-ghost.png',
                position: { x:17, y: 5},
                nextPosition: { x:17, y: 5},
                direction: 'left',
            },
            orange: {
                ghostElement: null,
                name: 'orangeGhost',
                path: 'assets/enemy/o-ghost.png',
                position: { x:4, y: 15},
                nextPosition: { x:4, y: 15},
                direction: 'right',
            },
            pink: {
                ghostElement: null,
                name: 'pinkGhost',
                path: 'assets/enemy/p-ghost.png',
                position: { x:17, y: 15},
                nextPosition: { x:17, y: 15},
                direction: 'left',
            },
            dark: {
                ghostElement: null,
                name: 'darkGhost',
                path: 'assets/enemy/d-ghost.png',
                position: { x:9, y: 13},
                nextPosition: { x:9, y: 13},
                direction: 'up',
            }
        };

        this.createGhostElement();
    }

    createGhostElement() {

        this.ghostARR.forEach(val => {
            const e = this.ghosts[val]
            
                // Remove any existing player element
                if (e.ghostElement) {
                e.ghostElement.remove();
            }
            
            e.ghostElement = document.createElement('div');
            e.ghostElement.className = e.name;
            e.ghostElement.style.width = `${this.width}px`;
            e.ghostElement.style.height = `${this.height}px`;
            e.ghostElement.id = e.name;
            
            const img = document.createElement('img');
            img.src = e.path;
            e.ghostElement.appendChild(img);

            // Add the player element to the game board
            this.game.gameBoard.board.appendChild(e.ghostElement);
            
            // Initial render
            this.render(e);
        });
        
        console.log('ghosts element created succes');
    }
    
    render(e) {
        if (e.ghostElement) {
            e.ghostElement.style.left = `${e.position.x * this.height}px`;
            e.ghostElement.style.top = `${e.position.y * this.width}px`;
        }
    }

    random() {
        return ['up', 'down', 'left', 'right'][Math.floor(Math.random()* 4)]
    }

    ppEqualGp(x, y) {
        this.ghostARR.forEach(val => {
            let ghost = this.ghosts[val]
            if (x === ghost.position.x && y === ghost.position.y) {
                if (this.game.lives > 0) {
                    this.game.lives--
                    this.game.ui.updateLives(this.game.lives);
                }
                this.game.inGame = false;
            }
        })
    }

    reset() {
        this.ghosts.red.position = { x:4, y: 5}
        this.ghosts.red.nextPosition = { x:4, y: 5}
        this.ghosts.red.direction = 'right'
        
        this.ghosts.bleu.position = { x:17, y: 5}
        this.ghosts.bleu.nextPosition = {x: 17, y: 5}
        this.ghosts.bleu.direction = 'left'
    
        this.ghosts.orange.position = { x:4, y: 15}
        this.ghosts.orange.nextPosition = { x:4, y: 15}
        this.ghosts.orange.direction = 'right'
    
        this.ghosts.pink.position = { x:17, y: 15}
        this.ghosts.pink.nextPosition = { x:17, y: 15}
        this.ghosts.pink.direction = 'left'
    
        this.ghosts.dark.position = { x:9, y: 13}
        this.ghosts.dark.nextPosition = { x:9, y: 13}
        this.ghosts.dark.direction = 'up'
    }

    incres() {
        this.ghostARR.forEach(val => {
            let ghost = this.ghosts[val]
            if (ghost.direction === 'up') ghost.nextPosition.y--;
            else if (ghost.direction === 'down') ghost.nextPosition.y++;
            else if (ghost.direction === 'left') ghost.nextPosition.x--;
            else if (ghost.direction === 'right') ghost.nextPosition.x++;
        });
    }

    generate() {
        this.ghostARR.forEach(val => {
            let ghost = this.ghosts[val]
            if (this.game.gameBoard.map[ghost.nextPosition.y] && (this.game.gameBoard.map[ghost.nextPosition.y][ghost.nextPosition.x] === 1 || this.game.gameBoard.map[ghost.nextPosition.y][ghost.nextPosition.x] === 2)) {
                ghost.direction = this.random();
            }
        });
    }

    nextPositionNotWall() {
        this.ghostARR.forEach(val => {
            let ghost = this.ghosts[val]
            if (this.game.gameBoard.map[ghost.nextPosition.y] && this.game.gameBoard.map[ghost.nextPosition.y][ghost.nextPosition.x] !== 1) {
                ghost.position.x = ghost.nextPosition.x;
                ghost.position.y = ghost.nextPosition.y;
            } else {
                ghost.nextPosition.x = ghost.position.x;
                ghost.nextPosition.y = ghost.position.y;
            }
        });
    }

    updatePosition() {
        this.ghostARR.forEach(val => {
            let ghost = this.ghosts[val]
                ghost.ghostElement.style.left = `${ghost.position.x * 20}px`;
                ghost.ghostElement.style.top = `${ghost.position.y * 20}px`;
        });
    }
}