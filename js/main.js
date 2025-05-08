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

    const scaleX = gameContainer.clientWidth / 460;  // fullWidth / baseWidth
    const scaleY = gameContainer.clientHeight / 640; // fullHeight / baseHeight

    const scale = Math.min(scaleX, scaleY);

    subject.style.transform = `scale(${scale})`;
}