// ///////////// version 3 ////////////////////

// const map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // 21 * 21
//              [1,2,0,0,0,2,0,0,0,2,1,2,0,0,0,2,0,0,0,2,1],
//              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
//              [1,0,1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1],
//              [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1],
//              [1,2,0,2,0,0,0,2,0,2,0,2,0,2,0,0,0,2,0,2,1],
//              [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
//              [1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1,0,1],
//              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
//              [1,2,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,2,1],
//              [1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1],
//              [1,2,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,2,1],
//              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
//              [1,0,1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1],
//              [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1],
//              [1,2,0,2,0,0,0,2,0,2,0,2,0,2,0,0,0,2,0,2,1],
//              [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
//              [1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1,0,1],
//              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
//              [1,2,0,0,0,2,0,0,0,2,1,2,0,0,0,2,0,0,0,2,1],
//              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

// const gameBoard = document.getElementById("game-board");
// const rows = 21;
// const cols = 21;

// const pacLife = document.querySelectorAll('.pacLife')


// let randomDirectionPM = true
// let score = 0;
// let time = 0;
// let inGame = false;
// let gameover = false;

// // Pac-Man | Ghosts
// const pacmanClass = {
//     name: 'pacMan',
//     life: 5,
//     position: { x: 10, y: 5 },
//     nextPosition: {x: 10, y: 5},
//     direction: '',
//     nextDirection: ''
// }
// const redGhostClass = {
//     name: 'redGhost',
//     position: { x:4, y: 5},
//     nextPosition: { x:4, y: 5},
//     direction: 'right',
// }
// const bleuGhostClass = {
//     name: 'bleuGhost',
//     position: { x:17, y: 5},
//     nextPosition: {x: 17, y: 5},
//     direction: 'left',
// }
// const orangeGhostClass = {
//     name: 'orangeGhost',
//     position: { x:4, y: 15},
//     nextPosition: { x:4, y: 15},
//     direction: 'right',
// }
// const pinkGhostClass = {
//     name: 'pinkGhost',
//     position: { x:17, y: 15},
//     nextPosition: { x:17, y: 15},
//     direction: 'left',
// }
// const darkGhostClass = {
//     name: 'darkGhost',
//     position: { x:9, y: 13},
//     nextPosition: { x:9, y: 13},
//     direction: 'up',
// }

// // Generate grid cells
// for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//         const cell = document.createElement("div");
//         cell.classList.add("cell");

//         if (map[y][x] === 1) {
//             cell.classList.add("wall"); // Add wall styling
//         } else if (map[y][x] === 0 || map[y][x] === 2) {
//             cell.classList.add('dot');
//             cell.dataset.hasDot = 'true';
//         }
//         gameBoard.appendChild(cell);
//     }
// }

// const allClass = [redGhostClass, bleuGhostClass, orangeGhostClass, pinkGhostClass, darkGhostClass, pacmanClass]

// // Append PacMan & Ghosts Elements
// allClass.forEach(obj => {
//     const div = document.createElement('div');
//     div.classList.add(obj.name);
//     div.id = obj.name;
//     gameBoard.appendChild(div);

//     if (obj.name != 'pacMan') {
//         const img = document.createElement('img');
//         img.src = `${obj.name}-solo.png`;
//         div.appendChild(img);
//     }
//     div.style.left = `${obj.position.x * 20}px`;
//     div.style.top = `${obj.position.y * 20}px`;
// })

// let frameIndex = 0;
// const frameWidth = 20; // Width of one Pac-Man frame
// const totalFrames = 6; // Number of frames in the sprite

// function animatePacMan() {
//     const pacman = document.getElementById(pacmanClass.name);

//     frameIndex = (frameIndex + 1) % totalFrames; // Loop through frames
//     pacman.style.backgroundPosition = `-${frameIndex * frameWidth}px 0px`; 
    
//     setTimeout(() => requestAnimationFrame(animatePacMan), 200); // Control speed (100ms per frame)
// }
// animatePacMan()

// const random = () => ['up', 'down', 'left', 'right'][Math.floor(Math.random()* 4)];

// // Update Positions
// function updatePosition(name, position, direction = '') {
//     const div = document.getElementById(`${name}`);
//     if (name === 'pacMan') {
//         if (direction === 'up') {
//             div.style.transform = `rotate(${270}deg)`
//         } else if (direction === 'down') {
//             div.style.transform = `rotate(${90}deg)`
//         } else if (direction === 'left') {
//             div.style.transform = `rotate(${180}deg)`
//         } else if (direction === 'right') {
//             div.style.transform = `rotate(${0}deg)`
//         }
//     }
//     div.style.left = `${position.x * 20}px`;
//     div.style.top = `${position.y * 20}px`;
// }

// function resetData() {
//     gameover = false
//     score = 0
//     document.getElementById('score').innerHTML = score;

//     for (let y = 0; y < rows; y++) {
//         for (let x = 0; x < cols; x++) {
//             if (map[y][x] === 0 || map[y][x] === 2) {
//                 const cell = gameBoard.children[y * cols + x];
//                 cell.classList.add('dot');      // Restore dot visually
//                 cell.dataset.hasDot = 'true';    // Mark as having dot
//             }
//         }
//     }
    
//     pacmanClass.life = 5
//     pacLife.forEach(element => {
//         element.style.opacity = 1
//     })
    
//     resetPosition()
// }

// function resetPosition() {

//     pacmanClass.position = { x: 10, y: 5 }
//     pacmanClass.nextPosition = {x: 10, y: 5}
//     pacmanClass.direction = ''

//     redGhostClass.position = { x:4, y: 5}
//     redGhostClass.nextPosition = { x:4, y: 5}
//     redGhostClass.direction = 'right'

//     bleuGhostClass.position = { x:17, y: 5}
//     bleuGhostClass.nextPosition = {x: 17, y: 5}
//     bleuGhostClass.direction = 'left'

//     orangeGhostClass.position = { x:4, y: 15}
//     orangeGhostClass.nextPosition = { x:4, y: 15}
//     orangeGhostClass.direction = 'right'

//     pinkGhostClass.position = { x:17, y: 15}
//     pinkGhostClass.nextPosition = { x:17, y: 15}
//     pinkGhostClass.direction = 'left'

//     darkGhostClass.position = { x:9, y: 13}
//     darkGhostClass.nextPosition = { x:9, y: 13}
//     darkGhostClass.direction = 'up'
// }

// function checkpacmandiretion() {

//     if (pacmanClass.nextDirection === 'up') pacmanClass.nextPosition.y--;
//     else if (pacmanClass.nextDirection === 'down') pacmanClass.nextPosition.y++;
//     else if (pacmanClass.nextDirection === 'left') pacmanClass.nextPosition.x--;
//     else if (pacmanClass.nextDirection === 'right') pacmanClass.nextPosition.x++;

//     if (pacmanClass.nextDirection !== '' && map[pacmanClass.position.y] && (map[pacmanClass.nextPosition.y][pacmanClass.nextPosition.x] === 2 || map[pacmanClass.nextPosition.y][pacmanClass.nextPosition.x] === 0)) {
//         pacmanClass.direction = pacmanClass.nextDirection
//     }

//     pacmanClass.nextPosition.y = pacmanClass.position.y
//     pacmanClass.nextPosition.x = pacmanClass.position.x
// }

// // Game loop function
// function gameLoop() {
//     if (pacmanClass.life > 0 && inGame && score < 2200 && !gameover) {

//         allClass.slice(0, allClass.length-1).forEach(ghost => {

//             if (pacmanClass.position.x === ghost.position.x && pacmanClass.position.y === ghost.position.y) {
//                 if (pacmanClass.life > 0) {
//                     pacmanClass.life--
//                     pacLife[pacmanClass.life].style.opacity = 0
//                 }
//                 inGame = false;
//             }
//         })
        
//         if (!inGame) {
//             if (pacmanClass.life === 0) gameover = true;
//             resetPosition()
//             return
//         }
        
//         // handle pac-man next position from next direction
//         checkpacmandiretion()

//         // increse position from direction
//         allClass.forEach(obj => {
//             if (obj.direction === 'up') obj.nextPosition.y--;
//             else if (obj.direction === 'down') obj.nextPosition.y++;
//             else if (obj.direction === 'left') obj.nextPosition.x--;
//             else if (obj.direction === 'right') obj.nextPosition.x++;
//         });
        
//         allClass.slice(0, allClass.length-1).forEach(ghost => {
//             if (map[ghost.nextPosition.y] && (map[ghost.nextPosition.y][ghost.nextPosition.x] === 1 || map[ghost.nextPosition.y][ghost.nextPosition.x] === 2)) {
//                 ghost.direction = random();
//             }
//         });
        
//         // Check if the new position is valid (not a wall)
//         if (map[pacmanClass.nextPosition.y] && map[pacmanClass.nextPosition.y][pacmanClass.nextPosition.x] !== 1) {
            
//             if (map[pacmanClass.position.y] && (map[pacmanClass.position.y][pacmanClass.position.x] === 2 || map[pacmanClass.position.y][pacmanClass.position.x] === 0)) {
//                 const pacmanCell = gameBoard.children[pacmanClass.position.y * cols + pacmanClass.position.x];

//                 if (pacmanCell.dataset.hasDot === 'true') {
//                     pacmanCell.classList.remove('dot');  // Remove dot visually
//                     pacmanCell.dataset.hasDot = 'false'; // Mark as eaten
//                     score += 10;
//                     document.getElementById('score').innerHTML = score;
//                 }
//             }

//             pacmanClass.position.x = pacmanClass.nextPosition.x;
//             pacmanClass.position.y = pacmanClass.nextPosition.y;
//         } else {
//             pacmanClass.nextPosition.x = pacmanClass.position.x;
//             pacmanClass.nextPosition.y = pacmanClass.position.y;
//         }

//         // Check if the next position is valid (not a wall)
//         allClass.slice(0, allClass.length-1).forEach(ghost => {
//             if (map[ghost.nextPosition.y] && map[ghost.nextPosition.y][ghost.nextPosition.x] !== 1) {
//                 ghost.position.x = ghost.nextPosition.x;
//                 ghost.position.y = ghost.nextPosition.y;
//             } else {
//                 ghost.nextPosition.x = ghost.position.x;
//                 ghost.nextPosition.y = ghost.position.y;
//             }
//         });

//         allClass.forEach(obj => {
//             updatePosition(obj.name, obj.position, obj.direction);
//         });

//     }
// }

// // Function to handle key presses
// document.addEventListener('keydown', (event) => {
//     inGame = true
//     if (event.key === 'ArrowUp') {
//         pacmanClass.nextDirection = 'up'
//     } else if (event.key === 'ArrowDown') {
//         pacmanClass.nextDirection = 'down'
//     } else if (event.key === 'ArrowLeft') {
//         pacmanClass.nextDirection = 'left'
//     } else if (event.key === 'ArrowRight') {
//         pacmanClass.nextDirection = 'right'
//     }
//     if (gameover || score === 2200) {
//         resetData()
//     }

//     checkpacmandiretion()
//     // gameLoop()
// });

// setInterval(gameLoop, 150);



// // //////////////// version 2 ////////////////////////

// // // Map { 21 cell * 21 cell }
// // const map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
// //              [1,2,0,0,0,2,0,0,0,2,1,2,0,0,0,2,0,0,0,2,1],
// //              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
// //              [1,0,1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1],
// //              [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1],
// //              [1,2,0,2,0,0,0,2,0,2,0,2,0,2,0,0,0,2,0,2,1],
// //              [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
// //              [1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1,0,1],
// //              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
// //              [1,2,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,2,1],
// //              [1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1],
// //              [1,2,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,2,1],
// //              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
// //              [1,0,1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1],
// //              [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1],
// //              [1,2,0,2,0,0,0,2,0,2,0,2,0,2,0,0,0,2,0,2,1],
// //              [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
// //              [1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1,0,1],
// //              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
// //              [1,2,0,0,0,2,0,0,0,2,1,2,0,0,0,2,0,0,0,2,1],
// //              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

// // // GameBoard
// // const gameBoard = document.getElementById("game-board");
// // const rows = 21;
// // const cols = 21;

// // // Generate Grid Cells
// // for (let y = 0; y < rows; y++) {
// //     for (let x = 0; x < cols; x++) {
// //         const cell = document.createElement("div");
// //         cell.classList.add("cell");
// //         if (map[y][x] === 1) {
// //             cell.classList.add("wall"); // Add wall styling
// //         } else if (map[y][x] === 0 || map[y][x] === 2) {
// //             const dot = document.createElement('div');
// //             dot.classList.add('dot');
// //             cell.appendChild(dot);
// //         }
// //         gameBoard.appendChild(cell);
// //     }
// // }

// // // PacMan
// // const pacman = {
// //     name: 'pacMan',
// //     life: 5,
// //     position: { x: 10, y: 5 },
// //     direction: 'up',
// //     nextDirection: '', // isValid direction
// //     cellContent: 0,
// // }

// // // Ghosts Class
// // const redGhost = {
// //     name: 'redGhost',
// //     direction: 'left',
// //     position: { x: 4, y: 5},
// //     cellContent: 0,
// // }
// // const bleuGhost = {
// //     name: 'bleuGhost',
// //     direction: 'left',
// //     position: { x: 17, y: 5},
// //     cellContent: 0,
// // }
// // const orangeGhost = {
// //     name: 'orangeGhost',
// //     direction: 'left',
// //     position: { x: 4, y: 15},
// //     cellContent: 0,
// // }
// // const pinkGhost = {
// //     name: 'pinkGhost',
// //     direction: 'left',
// //     position: { x: 17, y: 15},
// //     cellContent: 0,
// // }
// // const darkGhost = {
// //     name: 'darkGhost',
// //     direction: 'up',
// //     position: { x: 9, y: 13},
// //     cellContent: 0,
// // }

// // // All Class
// // const allClass = [pacman, redGhost, bleuGhost, orangeGhost, pinkGhost, darkGhost];

// // // Append PacMan & Ghosts Elements
// // allClass.forEach(obj => {
// //     const div = document.createElement('div');
// //     div.classList.add(obj.name);
// //     div.id = obj.name;
// //     gameBoard.appendChild(div);
// //     if (obj.name != 'pacMan') {
// //         const img = document.createElement('img');
// //         img.src = `${obj.name}-solo.png`;
// //         div.appendChild(img);
// //     } else div.style.transform = `rotate(${90}deg)`;
// //     div.style.left = `${obj.position.x * 20}px`;
// //     div.style.top = `${obj.position.y * 20}px`;
// // })

// // let frameIndex = 0;
// // const frameWidth = 20; // Width of one Pac-Man frame
// // const totalFrames = 6; // Number of frames in the sprite

// // // PacMan Animation
// // function animatePacMan() {
// //     const pacMan = document.getElementById(`${pacman.name}`);
// //     frameIndex = (frameIndex + 1) % totalFrames; // Loop through frames
// //     pacMan.style.backgroundPosition = `-${frameIndex * frameWidth}px 0px`;
// //     setTimeout(() => requestAnimationFrame(animatePacMan), 150); // Control speed (100ms per frame)
// // }
// // // Start animation
// // animatePacMan();

// // let randomDirection = true;

// // const random = () => ['up', 'down', 'left', 'right'][Math.floor(Math.random()* 4)];

// // // const isValidDirection = () => {

// // // }

// // let score = 0;
// // let time = 0;
// // let inGame = false;
// // let gameover = false;

// // // Function to handle key presses
// // document.addEventListener('keydown', (event) => {
// //     inGame = true;
// //     if (event.key === 'ArrowUp') {
// //         pacman.nextDirection = 'up';
// //     } else if (event.key === 'ArrowDown') {
// //         pacman.nextDirection = 'down';
// //     } else if (event.key === 'ArrowLeft') {
// //         pacman.nextDirection = 'left';
// //     } else if (event.key === 'ArrowRight') {
// //         pacman.nextDirection = 'right';
// //     }
// // });

// // // Update Positions
// // function updatePosition(name, position, direction = '') {
// //     const div = document.getElementById(`${name}`);
// //     if (name === pacman.name && pacman.cellContent === 2) {
// //         direction === 'up'? div.style.transform = `rotate(${270}deg)`:
// //         direction === 'down'? div.style.transform = `rotate(${90}deg)`:
// //         direction === 'left'? div.style.transform = `rotate(${180}deg)`:
// //         direction === 'right'? div.style.transform = `rotate(${0}deg)`: null;
// //     }
// //     div.style.left = `${position.x * 20}px`;
// //     div.style.top = `${position.y * 20}px`;
// // }

// // // Game loop function
// // function gameLoop() {
// //     if (pacman.life > 0 && inGame && score < 2200) {

// //         allClass.slice(1).forEach(ghost => {
// //             if (pacman.position.x === ghost.position.x && pacman.position.y === ghost.position.y) {
// //                 if (pacman.life > 1) {
// //                     pacman.life--;
// //                 }
// //                 inGame = false;
// //                 pacman.direction = '';
// //                 pacman.nextDirection = '';
// //             }
// //         });

// //         if (!inGame) {
// //             if (pacman.life === 0) {
// //                 return gameover = true;
// //             }
// //             return
// //         }
        
        
// //         allClass.forEach(obj => {
// //             updatePosition(obj.name, obj.position, obj.direction);
// //         });
// //     }
// // }

// // // Start the game loop (Pac-Man moves every 200ms)
// // setInterval(() => gameLoop, 150);

// // ///////////////////// version 1 /////////////////////////////

// // // // // make cellules for game-board
// // // // for (i=0;i < rows * cols;i++) { // rows * cols = 20 * 20 = 400 perimeter (تنتمنتspace)
// // // //     const cell = document.createElement('div') // create element into html code
// // // //     cell.classList.add('cell'); // classList make list of elements // add for increment number of cell an the list
// // // //     gameBoard.appendChild(cell)
// // // // }

// // // // const map = [ // 10 * 10
// // // //     [1,1,1,1,1,1,1,1,1,1],
// // // //     [1,0,0,0,0,0,0,0,0,1],
// // // //     [1,0,0,0,0,0,0,0,0,1],
// // // //     [1,0,0,0,0,0,0,0,0,1],
// // // //     [1,0,0,0,0,0,0,0,0,1],
// // // //     [1,0,0,0,0,0,0,0,0,1],
// // // //     [1,0,0,0,0,0,0,0,0,1],
// // // //     [1,0,0,0,0,0,0,0,0,1],
// // // //     [1,0,0,0,0,0,0,0,0,1], 
// // // // const map = [
// // // //     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
// // // //     [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
// // // //     [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
// // // //     [1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
// // // //     [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
// // // //     [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
// // // //     [1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1],
// // // //     [1,0,0,0,0,0,1,0,0,0,0,1,1,0,1,0,0,0,0,0,1],
// // // //     [1,0,1,1,1,0,1,1,1,0,0,1,1,0,1,0,1,1,1,0,1],
// // // //     [1,0,0,0,1,0,1,1,1,0,0,0,0,0,1,0,1,0,0,0,1],
// // // //     [1,1,1,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1,1,1],
// // // //     [1,0,0,0,1,0,1,0,0,0,0,0,1,1,1,0,1,0,0,0,1],
// // // //     [1,0,1,1,1,0,1,0,1,1,0,0,1,1,1,0,1,1,1,0,1],
// // // //     [1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,1],
// // // //     [1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1],
// // // //     [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1],
// // // //     [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
// // // //     [1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1],
// // // //     [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
// // // //     [1,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,1],
// // // //     [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
// // // // ];

// // // const map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // 21 * 21
// // //              [1,2,0,0,0,2,0,0,0,2,1,2,0,0,0,2,0,0,0,2,1],
// // //              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
// // //              [1,0,1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1],
// // //              [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1],
// // //              [1,2,0,2,0,0,0,2,0,2,0,2,0,2,0,0,0,2,0,2,1],
// // //              [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
// // //              [1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1,0,1],
// // //              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
// // //              [1,2,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,2,1],
// // //              [1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1],
// // //              [1,2,0,0,0,2,0,0,0,2,0,2,0,0,0,2,0,0,0,2,1],
// // //              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
// // //              [1,0,1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1],
// // //              [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1],
// // //              [1,2,0,2,0,0,0,2,0,2,0,2,0,2,0,0,0,2,0,2,1],
// // //              [1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1],
// // //              [1,2,0,2,1,2,0,2,1,0,1,2,0,2,1,2,0,2,1,0,1],
// // //              [1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1],
// // //              [1,2,0,0,0,2,0,0,0,2,1,2,0,0,0,2,0,0,0,2,1],
// // //              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

// // // const gameBoard = document.getElementById("game-board");
// // // const rows = 21;
// // // const cols = 21;


// // // // Score | Time
// // // let score = 0;
// // // let time = 0;

// // // // Pac-Man | Ghosts
// // // const pacmanClass = {
// // //     life: 5,
// // //     pacmanPosition: { x: 10, y: 5 },
// // //     // pacmanNextPosition: {x: 11, y: 5}
// // //     pacmanDirection: '', // default movement direction
// // //     // velocity: velocity(),
// // //     name: 'pac-man',
// // // }
// // // const redGhostClass = {
// // //     name: 'red-ghost',
// // //     redGhostPosition: { x:4, y: 5},
// // //     // redGhostNextPosition: {x: 11, y: 5}
// // //     redGhostDirection: 'right', // default movement direction
// // // }
// // // const bleuGhostClass = {
// // //     bleuGhostPosition: { x:17, y: 5},
// // //     // bleuGhostNextPosition: {x: 11, y: 5}
// // //     bleuGhostDirection: 'left',
// // // }
// // // const orangeGhostClass = {
// // //     orangeGhostPosition: { x:4, y: 15},
// // //     // orangeGhostNextPosition: {x: 11, y: 5}
// // //     orangeGhostDirection: 'right',
// // // }
// // // const pinkGhostClass = {
// // //     pinkGhostPosition: { x:17, y: 15},
// // //     // pinkGhostNextPosition: {x: 11, y: 5}
// // //     pinkGhostDirection: 'left',
// // // }
// // // const darkGhostClass = {
// // //     darkGhostPosition: { x:9, y: 13},
// // //     // darkGhostNextPosition: {x: 11, y: 5}
// // //     darkGhostDirection: 'up',
// // // }
// // // // class Ghost {
// // // //     constructor(color, direction, position) {
// // // //         this.color = color
// // // //         this.direction = direction
// // // //         this.position = position
// // // //     }
// // // //     setPosition(position) {
// // // //         this.position = position
// // // //     }
// // // // }

// // // // const RedGhost = new Ghost("red", "right", "6 18")
// // // // console.log("RED GHOST :\n",RedGhost)

// // // // RedGhost.setPosition('8 20')
// // // // console.log("NEW RED GHOST :\n",RedGhost)


// // // // Generate grid cells
// // // for (let y = 0; y < rows; y++) {
// // //     for (let x = 0; x < cols; x++) {
// // //         const cell = document.createElement("div");
// // //         cell.classList.add("cell");
// // //         if (map[y][x] === 1) {
// // //             cell.classList.add("wall"); // Add wall styling
// // //         } else if (map[y][x] === 0 || map[y][x] === 2) {
// // //             cell.innerHTML += ' <div class="dot"> </div>'
// // //         }
// // //         gameBoard.appendChild(cell);
// // //     }
// // // }

// // // const clasS = [pacmanClass, redGhostClass, bleuGhostClass, orangeGhostClass, pinkGhostClass, darkGhostClass]

// // // // clasS.forEach(obj => {
// // // //     const div = document.createElement('div')
// // // //     div.classList.add(`'${obj.name}'`);
// // // //     gameBoard.appendChild(div);
// // // //     div.innerHTML += `' <img src="${obj.name}-solo.png"> </img> '`
// // // // })

// // // const redGhost = document.createElement('div');
// // // redGhost.classList.add('redGhost');
// // // gameBoard.appendChild(redGhost);
// // // redGhost.innerHTML += ` <img src="redGhost-solo.png"> </img> `

// // // const bleuGhost = document.createElement('div');
// // // bleuGhost.classList.add('bleuGhost');
// // // gameBoard.appendChild(bleuGhost);
// // // bleuGhost.innerHTML += ' <img src="bleuGhost-solo.png"> </img> '

// // // const orangeGhost = document.createElement('div');
// // // orangeGhost.classList.add('orangeGhost');
// // // gameBoard.appendChild(orangeGhost);
// // // orangeGhost.innerHTML += ' <img src="orangeGhost-solo.png"> </img> '

// // // const pinkGhost = document.createElement('div');
// // // pinkGhost.classList.add('pinkGhost');
// // // gameBoard.appendChild(pinkGhost);
// // // pinkGhost.innerHTML += ' <img src="pinkGhost-solo.png"> </img> '

// // // const darkGhost = document.createElement('div');
// // // darkGhost.classList.add('darkGhost');
// // // gameBoard.appendChild(darkGhost);
// // // darkGhost.innerHTML += ' <img src="darkGhost-solo.png"> </img> '

// // // // Create Pac-Man element
// // // const pacman = document.createElement('div');
// // // pacman.classList.add('pacMan');
// // // gameBoard.appendChild(pacman);

// // // let frameIndex = 0;
// // // const frameWidth = 20; // Width of one Pac-Man frame
// // // const totalFrames = 6; // Number of frames in the sprite

// // // // Function to update Pac-Man's position
// // // function updatePacmanPosition() {
// // //     pacman.style.left = `${pacmanClass.pacmanPosition.x * 20}px`;
// // //     pacman.style.top = `${pacmanClass.pacmanPosition.y * 20}px`;
// // // }

// // // function updateRedGhostPosition() {
// // //     redGhost.style.left = `${redGhostClass.redGhostPosition.x * 20}px`;
// // //     redGhost.style.top = `${redGhostClass.redGhostPosition.y * 20}px`;
// // // }

// // // function updateBleuGhostPosition() {
// // //     bleuGhost.style.left = `${bleuGhostClass.bleuGhostPosition.x * 20}px`;
// // //     bleuGhost.style.top = `${bleuGhostClass.bleuGhostPosition.y * 20}px`;
// // // }

// // // function updateOrangeGhostPosition() {
// // //     orangeGhost.style.left = `${orangeGhostClass.orangeGhostPosition.x * 20}px`;
// // //     orangeGhost.style.top = `${orangeGhostClass.orangeGhostPosition.y * 20}px`;
// // // }

// // // function updatePinkGhostPosition() {
// // //     pinkGhost.style.left = `${pinkGhostClass.pinkGhostPosition.x * 20}px`;
// // //     pinkGhost.style.top = `${pinkGhostClass.pinkGhostPosition.y * 20}px`;
// // // }

// // // function updateDarkGhostPosition() {
// // //     darkGhost.style.left = `${darkGhostClass.darkGhostPosition.x * 20}px`;
// // //     darkGhost.style.top = `${darkGhostClass.darkGhostPosition.y * 20}px`;
// // // }

// // // let randomDirectionPM = true

// // // const generateDirection = () => {
// // //     // check pac-man Position

// // //     return 'left'
// // // }
// // // const random = () => {
// // //     // if (randomDirectionPM) {
// // //     //     randomDirectionPM = false
// // //     //     return generateDirection()
// // //     // }
// // //     // let n = Math.floor(Math.random()* 4)
// // //     // const ghostDirection = ['up', 'down', 'left', 'right'];
// // //     return ['up', 'down', 'left', 'right'][Math.floor(Math.random()* 4)];
    
// // // }

// // // // Function to handle key presses
// // // document.addEventListener('keydown', (event) => {
// // //     if (event.key === 'ArrowUp') {
// // //         pacman.style.transform = `rotate(${270}deg)`
// // //         pacmanClass.pacmanDirection = 'up'
// // //     } else if (event.key === 'ArrowDown') {
// // //         pacman.style.transform = `rotate(${90}deg)`
// // //         pacmanClass.pacmanDirection = 'down'
// // //     } else if (event.key === 'ArrowLeft') {
// // //         pacman.style.transform = `rotate(${180}deg)`
// // //         pacmanClass.pacmanDirection = 'left'
// // //     } else if (event.key === 'ArrowRight') {
// // //         pacman.style.transform = `rotate(${0}deg)`
// // //         pacmanClass.pacmanDirection = 'right'
// // //     }
// // // });

// // // function animatePacMan() {
// // //     frameIndex = (frameIndex + 1) % totalFrames; // Loop through frames
// // //     pacman.style.backgroundPosition = `-${frameIndex * frameWidth}px 0px`; 

// // //     setTimeout(() => {requestAnimationFrame(animatePacMan);}, 200); // Control speed (100ms per frame)
// // // }

// // // // Game loop function
// // // function gameLoop() {
// // //     if (pacmanClass.pacmanDirection != '') {

// // //         let newX = pacmanClass.pacmanPosition.x;
// // //         let newY = pacmanClass.pacmanPosition.y;

// // //         let newXRG = redGhostClass.redGhostPosition.x;
// // //         let newYRG = redGhostClass.redGhostPosition.y;

// // //         let newXBG = bleuGhostClass.bleuGhostPosition.x;
// // //         let newYBG = bleuGhostClass.bleuGhostPosition.y;
        
// // //         let newXOG = orangeGhostClass.orangeGhostPosition.x;
// // //         let newYOG = orangeGhostClass.orangeGhostPosition.y;
        
// // //         let newXPG = pinkGhostClass.pinkGhostPosition.x;
// // //         let newYPG = pinkGhostClass.pinkGhostPosition.y;
        
// // //         let newXDBG = darkGhostClass.darkGhostPosition.x;
// // //         let newYDBG = darkGhostClass.darkGhostPosition.y;

// // //         if (newX === newXRG && newY === newYRG) return pacmanClass.pacmanDirection = '';
// // //         if (newX === newXBG && newY === newYBG) return pacmanClass.pacmanDirection = '';
// // //         if (newX === newXOG && newY === newYOG) return pacmanClass.pacmanDirection = '';
// // //         if (newX === newXPG && newY === newYPG) return pacmanClass.pacmanDirection = '';
// // //         if (newX === newXDBG && newY === newYDBG) return pacmanClass.pacmanDirection = '';

// // //         // pac-man
// // //         if (pacmanClass.pacmanDirection === 'up') newY--;
// // //         else if (pacmanClass.pacmanDirection === 'down') newY++;
// // //         else if (pacmanClass.pacmanDirection === 'left') newX--;
// // //         else if (pacmanClass.pacmanDirection === 'right') newX++;
// // //         // red
// // //         if (redGhostClass.redGhostDirection === 'up') newYRG--;
// // //         else if (redGhostClass.redGhostDirection === 'down') newYRG++;
// // //         else if (redGhostClass.redGhostDirection === 'left') newXRG--;
// // //         else if (redGhostClass.redGhostDirection === 'right') newXRG++;
// // //         // bleu
// // //         if (bleuGhostClass.bleuGhostDirection === 'up') newYBG--;
// // //         else if (bleuGhostClass.bleuGhostDirection === 'down') newYBG++;
// // //         else if (bleuGhostClass.bleuGhostDirection === 'left') newXBG--;
// // //         else if (bleuGhostClass.bleuGhostDirection === 'right') newXBG++;
// // //         // orange
// // //         if (orangeGhostClass.orangeGhostDirection === 'up') newYOG--;
// // //         else if (orangeGhostClass.orangeGhostDirection === 'down') newYOG++;
// // //         else if (orangeGhostClass.orangeGhostDirection === 'left') newXOG--;
// // //         else if (orangeGhostClass.orangeGhostDirection === 'right') newXOG++;
// // //         // pink
// // //         if (pinkGhostClass.pinkGhostDirection === 'up') newYPG--;
// // //         else if (pinkGhostClass.pinkGhostDirection === 'down') newYPG++;
// // //         else if (pinkGhostClass.pinkGhostDirection === 'left') newXPG--;
// // //         else if (pinkGhostClass.pinkGhostDirection === 'right') newXPG++;
// // //         // dark-bleu
// // //         if (darkGhostClass.darkGhostDirection === 'up') newYDBG--;
// // //         else if (darkGhostClass.darkGhostDirection === 'down') newYDBG++;
// // //         else if (darkGhostClass.darkGhostDirection === 'left') newXDBG--;
// // //         else if (darkGhostClass.darkGhostDirection === 'right') newXDBG++;
        
// // //         if (map[newYRG] && map[newYRG][newXRG] === 1) {
// // //             redGhostClass.redGhostDirection = random();
// // //         }
// // //         if (map[newYBG] && map[newYBG][newXBG] === 1) {
// // //             bleuGhostClass.bleuGhostDirection = random();
// // //         }
// // //         if (map[newYOG] && map[newYOG][newXOG] === 1) {
// // //             orangeGhostClass.orangeGhostDirection = random();
// // //         }
// // //         if (map[newYPG] && map[newYPG][newXPG] === 1) {
// // //             pinkGhostClass.pinkGhostDirection = random();
// // //         }
// // //         if (map[newYDBG] && map[newYDBG][newXDBG] === 1) {
// // //             darkGhostClass.darkGhostDirection = random();
// // //         }

// // //         // Check if the new position is valid (not a wall)
// // //         if ((map[newY] && map[newY][newX] === 0) || (map[newY] && map[newY][newX] === 2)) {
            
// // //             map[newY][newX] = 2

// // //             if (map[newY] && map[newY][newX] === 2) {
// // //                 const pacmanCell = gameBoard.children[pacmanClass.pacmanPosition.y * cols + pacmanClass.pacmanPosition.x];
// // //                 if (pacmanCell.querySelector('.dot')) {
// // //                     pacmanCell.removeChild(pacmanCell.querySelector('.dot'));
// // //                     score += 10
// // //                     document.getElementById('score').innerText = score;
// // //                 }
// // //             }
// // //             pacmanClass.pacmanPosition.x = newX;
// // //             pacmanClass.pacmanPosition.y = newY;
// // //         }
        
// // //         // Check if the new position is valid (not a wall)
// // //         if (map[newYRG] && (map[newYRG][newXRG] === 0 || map[newYRG][newXRG] === 2)) {
// // //             redGhostClass.redGhostPosition.x = newXRG;
// // //             redGhostClass.redGhostPosition.y = newYRG;
// // //         }
// // //         // Check if the new position is valid (not a wall)
// // //         if (map[newYBG] && (map[newYBG][newXBG] === 0 || map[newYBG][newXBG] === 2)) {
// // //             bleuGhostClass.bleuGhostPosition.x = newXBG;
// // //             bleuGhostClass.bleuGhostPosition.y = newYBG;
// // //         }
// // //         // Check if the new position is valid (not a wall)
// // //         if (map[newYOG] && (map[newYOG][newXOG] === 0 || map[newYOG][newXOG] === 2)) {
// // //             orangeGhostClass.orangeGhostPosition.x = newXOG;
// // //             orangeGhostClass.orangeGhostPosition.y = newYOG;
// // //         }
// // //         // Check if the new position is valid (not a wall)
// // //         if (map[newYPG] && (map[newYPG][newXPG] === 0 || map[newYPG][newXPG] === 2)) {
// // //             pinkGhostClass.pinkGhostPosition.x = newXPG;
// // //             pinkGhostClass.pinkGhostPosition.y = newYPG;
// // //         }
// // //         // Check if the new position is valid (not a wall)
// // //         if (map[newYDBG] && (map[newYDBG][newXDBG] === 0 || map[newYDBG][newXDBG] === 2)) {
// // //             darkGhostClass.darkGhostPosition.x = newXDBG;
// // //             darkGhostClass.darkGhostPosition.y = newYDBG;
// // //         }

// // //         updatePacmanPosition();
// // //         updateRedGhostPosition();
// // //         updateBleuGhostPosition();
// // //         updateOrangeGhostPosition();
// // //         updatePinkGhostPosition();
// // //         updateDarkGhostPosition();
// // //     }
// // // }

// // // setInterval(gameLoop, 150);

// // // // Start the game loop (Pac-Man moves every 200ms)
// // // animatePacMan(); // Start animation

// // // // Initialize Pac-Man position
// // // updatePacmanPosition();
// // // updateRedGhostPosition();
// // // updateBleuGhostPosition();
// // // updateOrangeGhostPosition();
// // // updatePinkGhostPosition();
// // // updateDarkGhostPosition();
