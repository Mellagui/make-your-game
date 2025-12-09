export class Entity {
    constructor(game) {
        this.game = game;
    }

    gridToPixels(gridVal) {
        return gridVal * this.game.gameBoard.cellSize;
    }

    pixelsToGrid(pixelVal) {
        return Math.round(pixelVal / this.game.gameBoard.cellSize);
    }

    init() {
        console.warn('init() not implemented');
    }

    reset() {
        console.warn('reset() not implemented');
    }

    update(deltaTime) {
        console.warn('update() not implemented');
    }

    render() {
        console.warn('render() not implemented');
    }

    move() {
        console.warn('move() not implemented');
    }
}
