document.addEventListener('DOMContentLoaded', () => {
    // initialize game
    // game.init()

    // set up responsive scalling
    setupResponsiveScaling()

    // Listen fo window resize events
    window.addEventListener('resize', setupResponsiveScaling)
})

function setupResponsiveScaling() {
    const gameContainer = document.querySelector('.game-container')
    const subject = document.querySelector('.subject')

    const baseWidth = 420
    const baseHeight = 640

    const availableWidth = gameContainer.clientWidth
    const availableHeight = gameContainer.clientHeight

    const scaleX = availableWidth / baseWidth
    const scaleY = availableHeight / baseHeight

    const scale = Math.min(scaleX, scaleY)

    subject.style.transform = `scale(${scale})`
}

const map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // 21 * 21
             [1,2,0,0,0,2,0,0,0,2,1,2,0,0,0,2,0,0,0,2,1],
             [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
             [1,0,1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1],
             [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1],
             [1,2,0,2,0,0,0,2,0,2,0,2,0,2,0,0,0,2,0,2,1],
             [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
             [1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1,0,1],
             [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
             [1,2,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,2,1],
             [1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1],
             [1,2,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,2,1],
             [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
             [1,0,1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1],
             [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1],
             [1,2,0,2,0,0,0,2,0,2,0,2,0,2,0,0,0,2,0,2,1],
             [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
             [1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1,0,1],
             [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
             [1,2,0,0,0,2,0,0,0,2,1,2,0,0,0,2,0,0,0,2,1],
             [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

const gameBoard = document.getElementById("game-board");
const rows = 21;
const cols = 21;

const pacLife = document.querySelectorAll('.pacLife')


let randomDirectionPM = true
let score = 0;
let time = 0;
let inGame = false;
let gameover = false;
let life = 5;
let pacmanNextDirection = '';

// CLASS PLAYER //

// Pac-Man | Ghosts
const pacman = {
    name: 'pacMan',
    position: { x: 10, y: 5 },
    nextPosition: {x: 10, y: 5},
    direction: '',
}
const redGhost = {
    name: 'redGhost',
    position: { x:4, y: 5},
    nextPosition: { x:4, y: 5},
    direction: 'right',
}
const bleuGhost = {
    name: 'bleuGhost',
    position: { x:17, y: 5},
    nextPosition: {x: 17, y: 5},
    direction: 'left',
}
const orangeGhost = {
    name: 'orangeGhost',
    position: { x:4, y: 15},
    nextPosition: { x:4, y: 15},
    direction: 'right',
}
const pinkGhost = {
    name: 'pinkGhost',
    position: { x:17, y: 15},
    nextPosition: { x:17, y: 15},
    direction: 'left',
}
const darkGhost = {
    name: 'darkGhost',
    position: { x:9, y: 13},
    nextPosition: { x:9, y: 13},
    direction: 'up',
}

// // Calculate cell size dynamically
// function calculateCellSize() {
//     const boardRect = gameBoard.getBoundingClientRect();
//     const cellWidth = boardRect.width / cols;
//     const cellHeight = boardRect.height / rows;
//     return { width: cellWidth, height: cellHeight };
// }

// // Generate grid cells
// function generateGrid() {
//     gameBoard.innerHTML = ""; // Clear any previous grid if it exists

//     for (let y = 0; y < rows; y++) {
//         for (let x = 0; x < cols; x++) {
//             const cell = document.createElement("div");
//             cell.classList.add("cell");

//             // Add walls and dots as per map
//             if (map[y][x] === 1) {
//                 cell.classList.add("wall");
//             } else if (map[y][x] === 0 || map[y][x] === 2) {
//                 cell.classList.add("dot");
//                 cell.dataset.hasDot = 'true';
//             }

//             gameBoard.appendChild(cell);
//         }
//     }
// }

// // Update Pac-Man and Ghost Position Responsively
// function updatePosition(name, position, direction = '') {
//     const div = document.getElementById(`${name}`);
//     const { width, height } = calculateCellSize();

//     // Rotate Pac-Man based on direction
//     if (name === 'pacMan') {
//         if (direction === 'up') div.style.transform = `rotate(${270}deg)`;
//         else if (direction === 'down') div.style.transform = `rotate(${90}deg)`;
//         else if (direction === 'left') div.style.transform = `rotate(${180}deg)`;
//         else if (direction === 'right') div.style.transform = `rotate(${0}deg)`;
//     }

//     div.style.left = `${position.x * width}px`;
//     div.style.top = `${position.y * height}px`;
//     div.style.width = `${width}px`;
//     div.style.height = `${height}px`;
// }

// // Initialize Game Characters (Pac-Man & Ghosts)
// function initializeCharacters() {
//     const allClass = [redGhost, bleuGhost, orangeGhost, pinkGhost, darkGhost, pacman];

//     allClass.forEach(obj => {
//         const div = document.createElement('div');
//         div.classList.add(obj.name);
//         div.id = obj.name;
//         gameBoard.appendChild(div);

//         if (obj.name !== 'pacMan') {
//             const img = document.createElement('img');
//             img.src = `${obj.name}-solo.png`;
//             div.appendChild(img);
//         }

//         const { width, height } = calculateCellSize();
//         div.style.left = `${obj.position.x * width}px`;
//         div.style.top = `${obj.position.y * height}px`;
//         div.style.width = `${width}px`;
//         div.style.height = `${height}px`;
//     });
// }

// // Call Functions to Generate the Responsive Grid and Characters
// generateGrid();
// initializeCharacters();


// Generate grid cells
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        if (map[y][x] === 1) {
            cell.classList.add("wall"); // Add wall styling
        } else if (map[y][x] === 0 || map[y][x] === 2) {
            cell.classList.add('dot');
            cell.dataset.hasDot = 'true';
        }
        gameBoard.appendChild(cell);
    }
}

const allClass = [redGhost, bleuGhost, orangeGhost, pinkGhost, darkGhost, pacman]

// Append PacMan & Ghosts Elements
allClass.forEach(obj => {
    const div = document.createElement('div');
    div.classList.add(obj.name);
    div.id = obj.name;
    gameBoard.appendChild(div);

    if (obj.name != 'pacMan') {
        const img = document.createElement('img');
        img.src = `${obj.name}-solo.png`;
        div.appendChild(img);
    }
    div.style.left = `${obj.position.x * 20}px`;
    div.style.top = `${obj.position.y * 20}px`;
})

let frameIndex = 0;
const frameWidth = 20; // Width of one Pac-Man frame
const totalFrames = 6; // Number of frames in the sprite || 0 = last frame || 1 = first frame

function animatePacMan() {
    const pac_man = document.getElementById(pacman.name);
    
    frameIndex = (frameIndex + 1) % totalFrames; // Loop through frames
    pac_man.style.backgroundPosition = `-${frameIndex * frameWidth}px 0px`; 
    
    setTimeout(() => requestAnimationFrame(animatePacMan), 100); // Control speed (100ms per frame)
    // id = clearTimeout()
}
animatePacMan()

const random = () => ['up', 'down', 'left', 'right'][Math.floor(Math.random()* 4)];

// Update Positions
function updatePosition(name, position, direction = '') {
    const div = document.getElementById(`${name}`);
    if (name === 'pacMan') {
        if (direction === 'up') {
            div.style.transform = `rotate(${270}deg)`
        } else if (direction === 'down') {
            div.style.transform = `rotate(${90}deg)`
        } else if (direction === 'left') {
            div.style.transform = `rotate(${180}deg)`
        } else if (direction === 'right') {
            div.style.transform = `rotate(${0}deg)`
        }
    }
    div.style.left = `${position.x * 20}px`;
    div.style.top = `${position.y * 20}px`;
}

function resetData() {
    gameover = false
    score = 0
    document.getElementById('score').innerHTML = score;
    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (map[y][x] === 0 || map[y][x] === 2) {
                const cell = gameBoard.children[y * cols + x];
                cell.classList.add('dot');      // Restore dot visually
                cell.dataset.hasDot = 'true';    // Mark as having dot
            }
        }
    }
    
    life = 5
    pacLife.forEach(element => {
        element.style.opacity = 1
    })
    
    resetPosition()
}

function resetPosition() {

    pacman.position = { x: 10, y: 5 }
    pacman.nextPosition = {x: 10, y: 5}
    pacman.direction = ''

    redGhost.position = { x:4, y: 5}
    redGhost.nextPosition = { x:4, y: 5}
    redGhost.direction = 'right'
    
    bleuGhost.position = { x:17, y: 5}
    bleuGhost.nextPosition = {x: 17, y: 5}
    bleuGhost.direction = 'left'

    orangeGhost.position = { x:4, y: 15}
    orangeGhost.nextPosition = { x:4, y: 15}
    orangeGhost.direction = 'right'

    pinkGhost.position = { x:17, y: 15}
    pinkGhost.nextPosition = { x:17, y: 15}
    pinkGhost.direction = 'left'

    darkGhost.position = { x:9, y: 13}
    darkGhost.nextPosition = { x:9, y: 13}
    darkGhost.direction = 'up'
}

function checkpacmandiretion() {

    if (pacmanNextDirection === 'up') pacman.nextPosition.y--;
    else if (pacmanNextDirection === 'down') pacman.nextPosition.y++;
    else if (pacmanNextDirection === 'left') pacman.nextPosition.x--;
    else if (pacmanNextDirection === 'right') pacman.nextPosition.x++;

    if (pacmanNextDirection !== '' && map[pacman.position.y] && (map[pacman.nextPosition.y][pacman.nextPosition.x] === 2 || map[pacman.nextPosition.y][pacman.nextPosition.x] === 0)) {
        pacman.direction = pacmanNextDirection
    }

    pacman.nextPosition.y = pacman.position.y
    pacman.nextPosition.x = pacman.position.x
}

// Game loop function
function gameLoop() {
    if (life > 0 && inGame && score < 2200 && !gameover) {

        allClass.slice(0, allClass.length-1).forEach(ghost => {

            if (pacman.position.x === ghost.position.x && pacman.position.y === ghost.position.y) {
                if (life > 0) {
                    life--
                    pacLife[life].style.opacity = 0
                }
                inGame = false;
            }
        })
        
        if (!inGame) {
            if (life === 0) gameover = true;
            resetPosition()
            return
        }
        
        // handle pac-man next position from next direction
        checkpacmandiretion()

        // increse position from direction
        allClass.forEach(obj => {
            if (obj.direction === 'up') obj.nextPosition.y--;
            else if (obj.direction === 'down') obj.nextPosition.y++;
            else if (obj.direction === 'left') obj.nextPosition.x--;
            else if (obj.direction === 'right') obj.nextPosition.x++;
        });
        
        allClass.slice(0, allClass.length-1).forEach(ghost => {
            if (map[ghost.nextPosition.y] && (map[ghost.nextPosition.y][ghost.nextPosition.x] === 1 || map[ghost.nextPosition.y][ghost.nextPosition.x] === 2)) {
                ghost.direction = random();
            }
        });
        
        // Check if the new position is valid (not a wall)
        if (map[pacman.nextPosition.y] && map[pacman.nextPosition.y][pacman.nextPosition.x] !== 1) {
            
            if (map[pacman.position.y] && (map[pacman.position.y][pacman.position.x] === 2 || map[pacman.position.y][pacman.position.x] === 0)) {
                const pacmanCell = gameBoard.children[pacman.position.y * cols + pacman.position.x];

                if (pacmanCell.dataset.hasDot === 'true') {
                    pacmanCell.classList.remove('dot');  // Remove dot visually
                    pacmanCell.dataset.hasDot = 'false'; // Mark as eaten
                    score += 10;
                    document.getElementById('score').innerHTML = score;
                }
            }

            pacman.position.x = pacman.nextPosition.x;
            pacman.position.y = pacman.nextPosition.y;
        } else {
            pacman.nextPosition.x = pacman.position.x;
            pacman.nextPosition.y = pacman.position.y;
        }

        // Check if the next position is valid (not a wall)
        allClass.slice(0, allClass.length-1).forEach(ghost => {
            if (map[ghost.nextPosition.y] && map[ghost.nextPosition.y][ghost.nextPosition.x] !== 1) {
                ghost.position.x = ghost.nextPosition.x;
                ghost.position.y = ghost.nextPosition.y;
            } else {
                ghost.nextPosition.x = ghost.position.x;
                ghost.nextPosition.y = ghost.position.y;
            }
        });

        allClass.forEach(obj => {
            updatePosition(obj.name, obj.position, obj.direction);
        });
        
    }
}

// Function to handle key presses
document.addEventListener('keydown', (event) => {
    if (gameover || score === 2200) {
        resetData();
        return;
    }
    inGame = true
    
    const directions = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right'
    };
    
    if (directions[event.key]) {
        pacmanNextDirection = directions[event.key];
    }

    checkpacmandiretion();
});

setInterval(gameLoop, 150);