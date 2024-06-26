import Player from "../src/player";
import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

test('player can take a turn', () => {
    const player = new Player('real');
    const opponent = new Player('real');
    const ship = new Ship(1);
    opponent.gameboard.placeShip(ship, 0, 0);
    player.takeTurn(opponent.gameboard, 0, 0);
    expect(ship.hits).toBe(1);
});