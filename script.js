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

// Pac-Man | Ghosts
const pacmanClass = {
    name: 'pacMan',
    life: 5,
    position: { x: 10, y: 5 },
    nextPosition: {x: 10, y: 5},
    direction: '',
    nextDirection: ''
}
const redGhostClass = {
    name: 'redGhost',
    position: { x:4, y: 5},
    nextPosition: { x:4, y: 5},
    direction: 'right',
}
const bleuGhostClass = {
    name: 'bleuGhost',
    position: { x:17, y: 5},
    nextPosition: {x: 17, y: 5},
    direction: 'left',
}
const orangeGhostClass = {
    name: 'orangeGhost',
    position: { x:4, y: 15},
    nextPosition: { x:4, y: 15},
    direction: 'right',
}
const pinkGhostClass = {
    name: 'pinkGhost',
    position: { x:17, y: 15},
    nextPosition: { x:17, y: 15},
    direction: 'left',
}
const darkGhostClass = {
    name: 'darkGhost',
    position: { x:9, y: 13},
    nextPosition: { x:9, y: 13},
    direction: 'up',
}

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

const allClass = [redGhostClass, bleuGhostClass, orangeGhostClass, pinkGhostClass, darkGhostClass, pacmanClass]

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
const totalFrames = 6; // Number of frames in the sprite

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

const generateDirection = () => {
    // check pac-man Position
    
    return 'left'
}
const random = () => ['up', 'down', 'left', 'right'][Math.floor(Math.random()* 4)];



function animatePacMan() {
    const pacman = document.getElementById(pacmanClass.name);

    frameIndex = (frameIndex + 1) % totalFrames; // Loop through frames
    pacman.style.backgroundPosition = `-${frameIndex * frameWidth}px 0px`; 
    
    setTimeout(() => requestAnimationFrame(animatePacMan), 200); // Control speed (100ms per frame)
}
animatePacMan()

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
    
    pacmanClass.life = 5
    pacLife.forEach(element => {
        element.style.opacity = 1
    })
    
    resetPosition()
}

function resetPosition() {

    pacmanClass.position = { x: 10, y: 5 }
    pacmanClass.nextPosition = {x: 10, y: 5}
    pacmanClass.direction = ''

    redGhostClass.position = { x:4, y: 5}
    redGhostClass.nextPosition = { x:4, y: 5}
    redGhostClass.direction = 'right'

    bleuGhostClass.position = { x:17, y: 5}
    bleuGhostClass.nextPosition = {x: 17, y: 5}
    bleuGhostClass.direction = 'left'

    orangeGhostClass.position = { x:4, y: 15}
    orangeGhostClass.nextPosition = { x:4, y: 15}
    orangeGhostClass.direction = 'right'

    pinkGhostClass.position = { x:17, y: 15}
    pinkGhostClass.nextPosition = { x:17, y: 15}
    pinkGhostClass.direction = 'left'

    darkGhostClass.position = { x:9, y: 13}
    darkGhostClass.nextPosition = { x:9, y: 13}
    darkGhostClass.direction = 'up'
}

function checkpacmandiretion() {

    if (pacmanClass.nextDirection === 'up') pacmanClass.nextPosition.y--;
    else if (pacmanClass.nextDirection === 'down') pacmanClass.nextPosition.y++;
    else if (pacmanClass.nextDirection === 'left') pacmanClass.nextPosition.x--;
    else if (pacmanClass.nextDirection === 'right') pacmanClass.nextPosition.x++;

    if (map[pacmanClass.position.y] && pacmanClass.nextDirection !== '' && (map[pacmanClass.nextPosition.y][pacmanClass.nextPosition.x] === 2 || map[pacmanClass.nextPosition.y][pacmanClass.nextPosition.x] === 0)) {
        pacmanClass.direction = pacmanClass.nextDirection
    }

    pacmanClass.nextPosition.y = pacmanClass.position.y
    pacmanClass.nextPosition.x = pacmanClass.position.x
}

// Game loop function
function gameLoop() {
    if (pacmanClass.life > 0 && inGame && score < 2200 && !gameover) {

        allClass.slice(0, allClass.length-1).forEach(ghost => {
            if (pacmanClass.position.x === ghost.position.x && pacmanClass.position.y === ghost.position.y) {
                if (pacmanClass.life > 0) {
                    pacmanClass.life--
                    pacLife[pacmanClass.life].style.opacity = 0
                }
                inGame = false;
            }
        })
        
        if (!inGame) {
            if (pacmanClass.life === 0) gameover = true;
            resetPosition()
            return
        }
        
        checkpacmandiretion()

        // increse position from direction
        allClass.forEach(obj => {
            if (obj.direction === 'up') obj.nextPosition.y--;
            else if (obj.direction === 'down') obj.nextPosition.y++;
            else if (obj.direction === 'left') obj.nextPosition.x--;
            else if (obj.direction === 'right') obj.nextPosition.x++;
        });

        // handle pac-man next position from next direction
        
        allClass.slice(0, allClass.length-1).forEach(ghost => {
            if (map[ghost.nextPosition.y] && (map[ghost.nextPosition.y][ghost.nextPosition.x] === 1 || map[ghost.nextPosition.y][ghost.nextPosition.x] === 2)) {
                ghost.direction = random();
            }
        });
        
        // Check if the new position is valid (not a wall)
        if (map[pacmanClass.nextPosition.y] && map[pacmanClass.nextPosition.y][pacmanClass.nextPosition.x] !== 1) {
            
            if (map[pacmanClass.position.y] && (map[pacmanClass.position.y][pacmanClass.position.x] === 2 || map[pacmanClass.position.y][pacmanClass.position.x] === 0)) {
                const pacmanCell = gameBoard.children[pacmanClass.position.y * cols + pacmanClass.position.x];

                if (pacmanCell.dataset.hasDot === 'true') {
                    pacmanCell.classList.remove('dot');  // Remove dot visually
                    pacmanCell.dataset.hasDot = 'false'; // Mark as eaten
                    score += 10;
                    document.getElementById('score').innerHTML = score;
                }
            }

            pacmanClass.position.x = pacmanClass.nextPosition.x;
            pacmanClass.position.y = pacmanClass.nextPosition.y;
        } else {
            pacmanClass.nextPosition.x = pacmanClass.position.x;
            pacmanClass.nextPosition.y = pacmanClass.position.y;
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

        // updateposition();
        allClass.forEach(obj => {
            updatePosition(obj.name, obj.position, obj.direction);
        });
    }
}

// Function to handle key presses
document.addEventListener('keydown', (event) => {
    inGame = true
    if (event.key === 'ArrowUp') {
        pacmanClass.nextDirection = 'up'
    } else if (event.key === 'ArrowDown') {
        pacmanClass.nextDirection = 'down'
    } else if (event.key === 'ArrowLeft') {
        pacmanClass.nextDirection = 'left'
    } else if (event.key === 'ArrowRight') {
        pacmanClass.nextDirection = 'right'
    }
    if (gameover || score === 2200) {
        resetData()
    }

    checkpacmandiretion()
});

setInterval(gameLoop, 150);
