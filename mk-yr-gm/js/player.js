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
        }
        // this.path = 'assets/character/pacman-frames.png',
        this.pacmanElement = null;

        this.nextDirection = '';
        this.name = 'pacMan';
        this.x = 10;
        this.y = 5;
        this.direction = '';
        this.nextPosition = {x: 10, y: 5};

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
        this.animator = new ElementAnimator(this.pacmanElement, this.animations)
        this.animator.setAnimation('pm-frames')
        
        // Initial render
        this.render();
        
        console.log('Player element created at position:', this.x, this.y);
    }
    
    render() {
        if (this.pacmanElement) {
            this.pacmanElement.style.left = `${this.x * this.height}px`;
            this.pacmanElement.style.top = `${this.y * this.width}px`;
        }
    }

    reset() {
        this.x = 10;
        this.y = 5;
        this.nextPosition = {x: 10, y: 5}
        this.direction = ''
    }

    checkpacmandiretion() {

        if (this.nextDirection === 'up') this.nextPosition.y--;
        else if (this.nextDirection === 'down') this.nextPosition.y++;
        else if (this.nextDirection === 'left') this.nextPosition.x--;
        else if (this.nextDirection === 'right') this.nextPosition.x++;
    
        if (this.nextDirection !== '' && this.game.gameBoard.map[this.y] && (this.game.gameBoard.map[this.nextPosition.y][this.nextPosition.x] === 2 || this.game.gameBoard.map[this.nextPosition.y][this.nextPosition.x] === 0)) {
            this.direction = this.nextDirection
        }
    
        this.nextPosition.y = this.y
        this.nextPosition.x = this.x
    }

    incres() {
        if (this.direction === 'up') this.nextPosition.y--;
        else if (this.direction === 'down') this.nextPosition.y++;
        else if (this.direction === 'left') this.nextPosition.x--;
        else if (this.direction === 'right') this.nextPosition.x++;
    }

    pacmanPosition() {
        if (this.game.gameBoard.map[this.nextPosition.y] && this.game.gameBoard.map[this.nextPosition.y][this.nextPosition.x] !== 1) {
                    
            if (this.game.gameBoard.map[this.y] && (this.game.gameBoard.map[this.y][this.x] === 2 || this.game.gameBoard.map[this.y][this.x] === 0)) {
                const pacmanCell = document.getElementById(`${this.x}-${this.y}`);

                if (pacmanCell.dataset.hasDot === 'true') {
                    pacmanCell.classList.remove('dot');  // Remove dot visually
                    pacmanCell.dataset.hasDot = 'false'; // Mark as eaten
                    this.game.score += 10;
                    this.game.ui.updateScore(this.game.score)
                }
            }

            this.x = this.nextPosition.x;
            this.y = this.nextPosition.y;
        } else {
            this.nextPosition.x = this.x;
            this.nextPosition.y = this.y;
        }
    }

    updatePosition() {
        if (this.direction === 'up') {
            this.pacmanElement.style.transform = `rotate(${270}deg)`
        } else if (this.direction === 'down') {
            this.pacmanElement.style.transform = `rotate(${90}deg)`
        } else if (this.direction === 'left') {
            this.pacmanElement.style.transform = `rotate(${180}deg)`
        } else if (this.direction === 'right') {
            this.pacmanElement.style.transform = `rotate(${0}deg)`
        }
        
        this.pacmanElement.style.left = `${this.x * 20}px`;
        this.pacmanElement.style.top = `${this.y * 20}px`;
    }
}