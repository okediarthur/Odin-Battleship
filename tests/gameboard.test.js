import Gameboard from "../src/gameboard";
import Ship from "../src/ship";

test('placeShip correctly places a ship', () => {
    const board = new Gameboard();
    const ship = new Ship(3);
    board.placeShip(ship, 0, 0);
    expect(board.grid[0][0]).toBe(ship);
    expect(board.grid[0][1]).toBe(ship);
    expect(board.grid[0][2]).toBe(ship);
});

test('receiveAttack correctly registers a hit', () => {
    const board = new Gameboard();
    const ship = new Ship(3);
    board.placeShip(ship, 0, 0);
    board.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
});

test('allSunk correctly identifies when all ships are sunk', () => {
    const board = new Gameboard();
    const ship = new Ship(1);
    board.placeShip(ship, 0, 0);
    board.receiveAttack(0, 0);
    expect(board.allSunk()).toBe(true);
});