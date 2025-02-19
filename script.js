// // make cellules for game-board
// for (i=0;i < rows * cols;i++) { // rows * cols = 20 * 20 = 400 perimeter (تنتمنتspace)
//     const cell = document.createElement('div') // create element into html code
//     cell.classList.add('cell'); // classList make list of elements // add for increment number of cell an the list
//     gameBoard.appendChild(cell)
// }

// const map = [ // 10 * 10
//     [1,1,1,1,1,1,1,1,1,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,0,0,0,0,0,0,0,0,1],
//     [1,1,1,1,1,1,1,1,1,1]
//   ];

// const map = [
//     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
//     [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
//     [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
//     [1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
//     [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
//     [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
//     [1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1],
//     [1,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,0,0,0,1],
//     [1,0,1,1,1,0,1,1,1,0,0,1,1,0,1,0,1,1,1,0,1],
//     [1,0,0,0,1,0,1,1,1,0,0,0,0,0,1,0,1,0,0,0,1],
//     [1,1,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,1,1],
//     [1,0,0,0,1,0,1,0,0,0,0,0,1,1,1,0,1,0,0,0,1],
//     [1,0,1,1,1,0,1,0,1,1,0,0,1,1,1,0,1,1,1,0,1],
//     [1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,1],
//     [1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1],
//     [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
//     [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
//     [1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
//     [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
//     [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
//     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
// ];

const map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // 21 * 21
             [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
             [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
             [1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1],
             [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1],
             [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
             [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
             [1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1],
             [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
             [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
             [1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1],
             [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
             [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
             [1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1],
             [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1],
             [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
             [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
             [1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1],
             [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
             [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
             [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

const gameBoard = document.getElementById("game-board");
const rows = 21;
const cols = 21;

let score = 0;

let pacmanPosition = { x: 10, y: 5 };
let redGhostPosition = { x:4, y: 5};
let bleuGhostPosition = { x:17, y: 5};
let orangeGhostPosition = { x:4, y: 15};
let pinkGhostPosition = { x:17, y: 15};
let darkBleuGhostPosition = { x:9, y: 13};

let pacmanDirection = ''; // default movement direction
let redGhostDirection = 'right'; // default movement direction
let bleuGhostDirection = 'left';
let orangeGhostDirection = 'right';
let pinkGhostDirection = 'left';
let darkBleuGhostDirection = 'up';

// Generate grid cells
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (map[y][x] === 1) {
            cell.classList.add("wall"); // Add wall styling
        } else if (map[y][x] === 0) {
            cell.innerHTML += ' <div class="dot"> </div>'
        }
        gameBoard.appendChild(cell);
    }
}



// class Ghost {
//     constructor(color, direction, position) {
//         this.color = color
//         this.direction = direction
//         this.position = position
//     }


//     setPosition(position) {
//         this.position = position
//     }
// }

// const RedGhost = new Ghost("red", "right", "6 18")
// console.log("RED GHOST :\n",RedGhost)

// RedGhost.setPosition('8 20')
// console.log("NEW RED GHOST :\n",RedGhost)

const redGhost = document.createElement('div');
redGhost.classList.add('redGhost');
gameBoard.appendChild(redGhost);
redGhost.innerHTML += ' <img src="red-ghost-solo.png"> </img> '

const bleuGhost = document.createElement('div');
bleuGhost.classList.add('bleuGhost');
gameBoard.appendChild(bleuGhost);
bleuGhost.innerHTML += ' <img src="bleu-ghost-solo.png"> </img> '

const orangeGhost = document.createElement('div');
orangeGhost.classList.add('orangeGhost');
gameBoard.appendChild(orangeGhost);
orangeGhost.innerHTML += ' <img src="orange-ghost-solo.png"> </img> '

const pinkGhost = document.createElement('div');
pinkGhost.classList.add('pinkGhost');
gameBoard.appendChild(pinkGhost);
pinkGhost.innerHTML += ' <img src="pink-ghost-solo.png"> </img> '

const darkBleuGhost = document.createElement('div');
darkBleuGhost.classList.add('darkBleuGhost');
gameBoard.appendChild(darkBleuGhost);
darkBleuGhost.innerHTML += ' <img src="dark-bleu-ghost-solo.png"> </img> '

// Create Pac-Man element
const pacman = document.createElement('div');
pacman.classList.add('pacman');
gameBoard.appendChild(pacman);

let frameIndex = 0;
const frameWidth = 20; // Width of one Pac-Man frame
const totalFrames = 6; // Number of frames in the sprite

// Function to update Pac-Man's position
function updatePacmanPosition() {
    pacman.style.left = `${pacmanPosition.x * 20}px`;
    pacman.style.top = `${pacmanPosition.y * 20}px`;
}

function updateRedGhostPosition() {
    redGhost.style.left = `${redGhostPosition.x * 20}px`;
    redGhost.style.top = `${redGhostPosition.y * 20}px`;
}

function updateBleuGhostPosition() {
    bleuGhost.style.left = `${bleuGhostPosition.x * 20}px`;
    bleuGhost.style.top = `${bleuGhostPosition.y * 20}px`;
}

function updateOrangeGhostPosition() {
    orangeGhost.style.left = `${orangeGhostPosition.x * 20}px`;
    orangeGhost.style.top = `${orangeGhostPosition.y * 20}px`;
}

function updatePinkGhostPosition() {
    pinkGhost.style.left = `${pinkGhostPosition.x * 20}px`;
    pinkGhost.style.top = `${pinkGhostPosition.y * 20}px`;
}

function updateDarkBleuGhostPosition() {
    darkBleuGhost.style.left = `${darkBleuGhostPosition.x * 20}px`;
    darkBleuGhost.style.top = `${darkBleuGhostPosition.y * 20}px`;
}

const random = () => {
    let n = Math.floor(Math.random()* 4)
    const ghostDirection = ['up', 'down', 'left', 'right']
    return ghostDirection[n];
}

// Function to handle key presses
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        pacman.style.transform = `rotate(${270}deg)`
        pacmanDirection = 'up'
    } else if (event.key === 'ArrowDown') {
        pacman.style.transform = `rotate(${90}deg)`
        pacmanDirection = 'down'
    } else if (event.key === 'ArrowLeft') {
        pacman.style.transform = `rotate(${180}deg)`
        pacmanDirection = 'left'
    } else if (event.key === 'ArrowRight') {
        pacman.style.transform = `rotate(${0}deg)`
        pacmanDirection = 'right'
    }
});

function animatePacMan() {
    frameIndex = (frameIndex + 1) % totalFrames; // Loop through frames
    pacman.style.backgroundPosition = `-${frameIndex * frameWidth}px 0px`; 

    setTimeout(() => {requestAnimationFrame(animatePacMan);}, 150); // Control speed (100ms per frame)
}

// Game loop function
function gameLoop() {
    if (pacmanDirection != '') {

        let newX = pacmanPosition.x;
        let newY = pacmanPosition.y;

        let newXRG = redGhostPosition.x;
        let newYRG = redGhostPosition.y;

        let newXBG = bleuGhostPosition.x;
        let newYBG = bleuGhostPosition.y;
        
        let newXOG = orangeGhostPosition.x;
        let newYOG = orangeGhostPosition.y;
        
        let newXPG = pinkGhostPosition.x;
        let newYPG = pinkGhostPosition.y;
        
        let newXDBG = darkBleuGhostPosition.x;
        let newYDBG = darkBleuGhostPosition.y;

        if (newX === newXRG && newY === newYRG) return pacmanDirection = '';
        if (newX === newXBG && newY === newYBG) return pacmanDirection = '';
        if (newX === newXOG && newY === newYOG) return pacmanDirection = '';
        if (newX === newXPG && newY === newYPG) return pacmanDirection = '';
        if (newX === newXDBG && newY === newYDBG) return pacmanDirection = '';

        // pac-man
        if (pacmanDirection === 'up') newY--;
        else if (pacmanDirection === 'down') newY++;
        else if (pacmanDirection === 'left') newX--;
        else if (pacmanDirection === 'right') newX++;
        // red
        if (redGhostDirection === 'up') newYRG--;
        else if (redGhostDirection === 'down') newYRG++;
        else if (redGhostDirection === 'left') newXRG--;
        else if (redGhostDirection === 'right') newXRG++;
        // bleu
        if (bleuGhostDirection === 'up') newYBG--;
        else if (bleuGhostDirection === 'down') newYBG++;
        else if (bleuGhostDirection === 'left') newXBG--;
        else if (bleuGhostDirection === 'right') newXBG++;
        // orange
        if (orangeGhostDirection === 'up') newYOG--;
        else if (orangeGhostDirection === 'down') newYOG++;
        else if (orangeGhostDirection === 'left') newXOG--;
        else if (orangeGhostDirection === 'right') newXOG++;
        // pink
        if (pinkGhostDirection === 'up') newYPG--;
        else if (pinkGhostDirection === 'down') newYPG++;
        else if (pinkGhostDirection === 'left') newXPG--;
        else if (pinkGhostDirection === 'right') newXPG++;
        // dark-bleu
        if (darkBleuGhostDirection === 'up') newYDBG--;
        else if (darkBleuGhostDirection === 'down') newYDBG++;
        else if (darkBleuGhostDirection === 'left') newXDBG--;
        else if (darkBleuGhostDirection === 'right') newXDBG++;
        
        if (map[newYRG] && map[newYRG][newXRG] === 1) {
            redGhostDirection = random();
        }
        if (map[newYBG] && map[newYBG][newXBG] === 1) {
            bleuGhostDirection = random();
        }
        if (map[newYOG] && map[newYOG][newXOG] === 1) {
            orangeGhostDirection = random();
        }
        if (map[newYPG] && map[newYPG][newXPG] === 1) {
            pinkGhostDirection = random();
        }
        if (map[newYDBG] && map[newYDBG][newXDBG] === 1) {
            darkBleuGhostDirection = random();
        }

        // Check if the new position is valid (not a wall)
        if ((map[newY] && map[newY][newX] === 0) || (map[newY] && map[newY][newX] === 2)) {
            
            map[newY][newX] = 2

            if (map[newY] && map[newY][newX] === 2) {
                const pacmanCell = gameBoard.children[pacmanPosition.y * cols + pacmanPosition.x];
                if (pacmanCell.querySelector('.dot')) {
                    pacmanCell.removeChild(pacmanCell.querySelector('.dot'));
                    score += 10
                    document.getElementById('score').innerText = score;
                }
            }
            pacmanPosition.x = newX;
            pacmanPosition.y = newY;
        }
        
        // Check if the new position is valid (not a wall)
        if (map[newYRG] && (map[newYRG][newXRG] === 0 || map[newYRG][newXRG] === 2)) {
            redGhostPosition.x = newXRG;
            redGhostPosition.y = newYRG;
        }
        // Check if the new position is valid (not a wall)
        if (map[newYBG] && (map[newYBG][newXBG] === 0 || map[newYBG][newXBG] === 2)) {
            bleuGhostPosition.x = newXBG;
            bleuGhostPosition.y = newYBG;
        }
        // Check if the new position is valid (not a wall)
        if (map[newYOG] && (map[newYOG][newXOG] === 0 || map[newYOG][newXOG] === 2)) {
            orangeGhostPosition.x = newXOG;
            orangeGhostPosition.y = newYOG;
        }
        // Check if the new position is valid (not a wall)
        if (map[newYPG] && (map[newYPG][newXPG] === 0 || map[newYPG][newXPG] === 2)) {
            pinkGhostPosition.x = newXPG;
            pinkGhostPosition.y = newYPG;
        }
        // Check if the new position is valid (not a wall)
        if (map[newYDBG] && (map[newYDBG][newXDBG] === 0 || map[newYDBG][newXDBG] === 2)) {
            darkBleuGhostPosition.x = newXDBG;
            darkBleuGhostPosition.y = newYDBG;
        }

        updatePacmanPosition();
        updateRedGhostPosition();
        updateBleuGhostPosition();
        updateOrangeGhostPosition();
        updatePinkGhostPosition();
        updateDarkBleuGhostPosition();
    }
}

setInterval(gameLoop, 150);

// Start the game loop (Pac-Man moves every 200ms)
animatePacMan(); // Start animation

// Initialize Pac-Man position
updatePacmanPosition();
updateRedGhostPosition();
updateBleuGhostPosition();
updateOrangeGhostPosition();
updatePinkGhostPosition();
updateDarkBleuGhostPosition();
