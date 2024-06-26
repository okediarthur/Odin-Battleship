import Gameboard from './gameboard.js';

class Player {
    constructor(type) {
        this.gameboard = new Gameboard();
        this.type = type; 
    }

    takeTurn(opponentBoard, x, y) {
        opponentBoard.receiveAttack(x, y);
    }

    computerMove(opponentBoard) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (opponentBoard.grid[x][y] !== null && !opponentBoard.missedShots.some(shot => shot[0] === x && shot[1] === y));

        opponentBoard.receiveAttack(x, y);
    }
}

export default Player;
