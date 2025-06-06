export class GameBoard {
    constructor(game) {
        this.game = game;
        this.board = document.getElementById('game-board');
        this.rows = 21;
        this.cols = 21;
        this.cellSize = 20;
        this.cellMap = {};
        this.map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // 21 * 21
                    [1,2,0,0,0,2,0,0,0,2,1,2,0,0,0,2,0,0,0,2,1],
                    [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
                    [1,0,1,2,0,2,0,2,1,0,1,0,1,2,0,2,0,2,1,0,1],
                    [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1],
                    [1,2,0,2,0,0,0,2,0,2,0,2,0,2,0,0,0,2,0,2,1],
                    [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1],
                    [1,0,1,2,0,2,0,2,1,0,1,0,1,2,0,2,0,2,1,0,1],
                    [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
                    [1,2,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,2,1],
                    [1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1],
                    [1,2,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,2,1],
                    [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
                    [1,0,1,2,0,2,0,2,1,0,1,0,1,2,0,2,0,2,1,0,1],
                    [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1],
                    [1,2,0,2,0,0,0,2,0,2,0,2,0,2,0,0,0,2,0,2,1],
                    [1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1],
                    [1,0,1,2,0,2,0,2,1,0,1,0,1,2,0,2,0,2,1,0,1],
                    [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
                    [1,2,0,0,0,2,0,0,0,2,1,2,0,0,0,2,0,0,0,2,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
    }

    createBoard() {
        this.board.innerHTML = '';

        // Set board dimensions
        this.board.style.width = `${this.cols * this.cellSize}px`;
        this.board.style.height = `${this.cols * this.cellSize}px`;

        // Generate grid cells
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const cell = this.createCell(x, y);

                if (this.map[y][x] === 1) {
                    cell.classList.add("wall"); // Add wall styling
                } else if (this.map[y][x] === 0 || this.map[y][x] === 2) {
                    cell.classList.add('dot');
                    cell.dataset.hasDot = 'true';
                }
                this.board.appendChild(cell);

                const id = `${x}-${y}`;
                this.cellMap[id] = document.getElementById(id);
            }
        }
        this.game.maxScore = document.querySelectorAll('.dot').length * 10;
    }

    createCell(x, y) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `${x}-${y}`;
        return cell;
    }

    isWall(x, y) {
        if (!(x >= 0 && y >= 0 && x < this.cols && y < this.rows)) return true;
        return this.map[y][x] === 1;
    }
}