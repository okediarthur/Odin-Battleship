import Player from "./player";

document.addEventListener('DOMContentLoaded', () => {
    const player = new Player('real');
    const computer = new Player('computer');

    player.gameboard.placeShip(new Ship(3), 0, 0);
    computer.gameboard.placeShip(new Ship(3), 0, 0);

    renderBoard(player.gameboard, 'playerBoard');
    renderBoard(computer.gameboard, 'computerBoard');

    document.getElementById('computerBoard').addEventListener('click', (event) => {
        const x = parseInt(event.target.dataset.x);
        const y = parseInt(event.target.dataset.y);
        player.takeTurn(computer.gameboard, x, y);

        if(computer.gameboard.allSunk()){
            alert('Player Wins!');
            return;
        }

        computer.computerMove(player.gameboard);
        if(player.gameboard.allSunk()){
            alert('Computer wins!');
        }

        renderBoard(player.gameboard, 'playerBoard');
        renderBoard(computer.gameboard, 'computerBoard');

    });
});

function renderBoard(board, elementId){
    const boardElement = document.getElementById(elementId);
    boardElement.innerHTML = '';
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            const cell = document.createElement('div');
            cell.dataset.x = i;
            cell.dataset.y = j; 
            if(board.grid[i][j]){
                cell.classList.add('ship');
                if(board.grid[i][j].isSunk()){
                    cell.classList.add('sunk');
                }
            } else if (board.missedShots.some(shot => shot[0] === i && shot[1] === j)){
                cell.classList.add('miss');
            }
            boardElement.appendChild(cell);
        }
    }
}