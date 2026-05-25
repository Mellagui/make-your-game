export class Controller {
    constructor(game) {
        this.game = game;

        this.directions = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        };

        this.setupEventListeners();
    }
    // Helper for direction buttons
    const handleDirection = (dir) => {
        if (!this.game.inGame) {
            this.game.resetPosition();
            this.game.ui.hideMenu();
            this.game.inGame = true;
        }
        if (!this.game.currentMenu) {
            this.game.player.nextDirection = dir;
        }
    };

    // Mobile Direction Buttons
    document.getElementById('btn-up').addEventListener('click', () => handleDirection('up'));
    document.getElementById('btn-down').addEventListener('click', () => handleDirection('down'));
    document.getElementById('btn-left').addEventListener('click', () => handleDirection('left'));
    document.getElementById('btn-right').addEventListener('click', () => handleDirection('right'));

    // Mobile Pause/Start Button
    document.getElementById('btn-pause').addEventListener('click', () => {
        if (this.game.inGame && !this.game.victory && !this.game.gameOver) {
            this.game.togglePause();
        } else if (this.game.victory || this.game.gameOver) {
            this.game.resetGame();
        }
    });
    // setupEventListeners() {

        //document.getElementById('reset').addEventListen//er('click', () => this.game.resetGame());

        //document.getElementById('continue').addEventLis//tener('click', () => {
           // if (this.game.inGame && !this.game.victory && !this.game.gameOver) {
               // this.game.togglePause();
            //    return
         //   }

          //  if (!this.game.inGame) {
          //      this.game.resetPosition();
           //     this.game.ui.hideMenu();
            //    this.game.inGame = true;

             //   console.log('continue');
       //     }
    //    });

      //  document.addEventListener('keydown', e => {
          //  if ((e.key === ' ' || e.key === 'p') && this.game.inGame && !this.game.victory && !this.game.gameOver) {
               // this.game.togglePause();
            //    return
         //   }

          //  if (this.game.victory || this.game.gameOver) {
             //   this.game.resetGame();
             //   return

         //   } else if (!this.game.inGame) {
           //     this.game.resetPosition();
            //    this.game.ui.hideMenu();
            //    this.game.inGame = true;

            //    console.log('game started');
          //  }

           // if (!this.game.currentMenu && //this.directions[e.key]) //this.game.player.nextDirection = //this.directions[e.key];
       // });
    }
}