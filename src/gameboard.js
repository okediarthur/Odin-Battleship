class Gameboard {
    constructor() {
        this.grid = Array(10).fill(null).map(() => Array(10).fill(null));
        this.ships = [];
        this.missedShots = [];
    }

    placeShip(ship, x, y) {
        for (let i = 0; i < ship.length; i++) {
            this.grid[x][y + i] = ship;
        }
        this.ships.push(ship);
    }

    receiveAttack(x, y) {
        if (this.grid[x][y]) {
            this.grid[x][y].hit();
            if (this.grid[x][y].isSunk()) {
                this.ships = this.ships.filter(ship => !ship.isSunk());
            }
        } else {
            this.missedShots.push([x, y]);
        }
    }

    allSunk() {
        return this.ships.length === 0;
    }
}

export default Gameboard;
