import { Game } from "./core/game.js"

const game = new Game();

document.addEventListener("DOMContentLoaded", () => {
    game.init();

    setupResponsiveScaling();

    window.addEventListener('resize', setupResponsiveScaling)
});

function setupResponsiveScaling() {
    const gameContainer = document.querySelector('.game-container');
    const subject = document.querySelector('.subject');

    const scaleX = gameContainer.clientWidth / 460;  // fullWidth / baseWidth
    const scaleY = gameContainer.clientHeight / 640; // fullHeight / baseHeight

    const scale = Math.min(scaleX, scaleY);

    subject.style.transform = `scale(${scale})`;
}