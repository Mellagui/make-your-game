import {Game} from './game.js'

// game instance
const game = new Game();

document.addEventListener('DOMContentLoaded', () => {
    // initialize game
    game.init();

    // set up responsive scalling
    setupResponsiveScaling();

    // Listen fo window resize events
    window.addEventListener('resize', setupResponsiveScaling)
})

function setupResponsiveScaling() {
    const gameContainer = document.querySelector('.game-container');
    const subject = document.querySelector('.subject');

    const baseWidth = 420;
    const baseHeight = 640;

    const availableWidth = gameContainer.clientWidth;
    const availableHeight = gameContainer.clientHeight;

    const scaleX = availableWidth / baseWidth;
    const scaleY = availableHeight / baseHeight;

    const scale = Math.min(scaleX, scaleY);

    subject.style.transform = `scale(${scale})`;
}