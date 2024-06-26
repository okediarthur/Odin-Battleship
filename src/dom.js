import Player from './player.js';
import Ship from './ship.js';
import Gameboard from './gameboard.js';  

function renderBoard(board, elementId) {
    const boardElement = document.getElementById(elementId);
    boardElement.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.dataset.x = i;
            cell.dataset.y = j;
            cell.classList.add('cell');
            if (board.grid[i][j]) {
                cell.classList.add('ship');
                if (board.grid[i][j].isSunk()) {
                    cell.classList.add('sunk');
                }
            } else if (board.missedShots.some(shot => shot[0] === i && shot[1] === j)) {
                cell.classList.add('miss');
            }
            boardElement.appendChild(cell);
        }
    }
}

function initializeGame() {
    const player = new Player('real');
    const computer = new Player('computer');

    player.gameboard.placeShip(new Ship(3), 0, 0);
    computer.gameboard.placeShip(new Ship(3), 0, 0);

    renderBoard(player.gameboard, 'playerBoard');
    renderBoard(computer.gameboard, 'computerBoard');

    document.getElementById('computerBoard').addEventListener('click', (event) => {
        const x = parseInt(event.target.dataset.x);
        const y = parseInt(event.target.dataset.y);
        if (!event.target.classList.contains('cell') || event.target.classList.contains('hit') || event.target.classList.contains('miss')) return;

        player.takeTurn(computer.gameboard, x, y);

        if (computer.gameboard.allSunk()) {
            alert('Player wins!');
            return;
        }

        computer.computerMove(player.gameboard);

        if (player.gameboard.allSunk()) {
            alert('Computer wins!');
        }

        renderBoard(player.gameboard, 'playerBoard');
        renderBoard(computer.gameboard, 'computerBoard');
    });
}

export { renderBoard, initializeGame };
