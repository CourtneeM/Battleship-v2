/* eslint-disable no-plusplus */
function Gameboard() {
  const gameboard = [
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ];

  const missedAttacks = [];

  function checkIfOffGrid(shipLength, row, col, direction) {
    if (direction === 'horizontal') {
      return gameboard[row][col + shipLength - 1] === undefined;
    }

    return gameboard[row + shipLength - 1] === undefined
    || gameboard[row + shipLength - 1][col] === undefined;
  }

  function checkIfOccupied(shipLength, row, col, direction) {
    if (direction === 'horizontal') {
      for (let i = 0; i < shipLength; i++) {
        if (gameboard[row][col + i] !== '') return true;
      }
    } else {
      for (let i = 0; i < shipLength; i++) {
        if (gameboard[row + i][col] !== '') return true;
      }
    }

    return false;
  }

  function placeShip(ship, [row, col], direction) {
    if (direction === 'horizontal') {
      if (checkIfOffGrid(ship.length, row, col, direction)) return true;
      if (checkIfOccupied(ship.length, row, col, direction)) return true;

      for (let i = 0; i < ship.length; i++) {
        gameboard[row][col + i] = 'o';
        ship.coordinates.push([row, col + i]);
      }
    } else if (direction === 'vertical') {
      if (checkIfOffGrid(ship.length, row, col, direction)) return true;
      if (checkIfOccupied(ship.length, row, col, direction)) return true;

      for (let i = 0; i < ship.length; i++) {
        gameboard[row + i][col] = 'o';
        ship.coordinates.push([row + i, col]);
      }
    }
  }

  function placeEnemyShips(computer) {
    const directions = ['horizontal', 'vertical'];
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let direction = directions[Math.floor(Math.random() * 2)];

    Object.values(computer.ships).forEach((ship) => {
      while (checkIfOffGrid(ship.length, row, col, direction)
      || checkIfOccupied(ship.length, row, col, direction)) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        direction = directions[Math.floor(Math.random() * 2)];
      }
      placeShip(ship, [row, col], direction);
    });
  }

  function receiveAttack(ships, row, col) {
    let hit = false;

    Object.values(ships).forEach((ship) => {
      if (hit) return;
      ship.coordinates.forEach(([shipRow, shipCol], i) => {
        if (hit) return;

        if (shipRow === row && shipCol === col) {
          hit = true;
          ship.hit(i);
        }
      });
    });

    if (!hit) missedAttacks.push([row, col]);
    gameboard[row][col] = 'x';
  }

  function checkIfAllSunk(ships) {
    ships.every((ship) => ship.isSunk());
  }

  return {
    gameboard,
    placeShip,
    placeEnemyShips,
    receiveAttack,
    checkIfAllSunk,
  };
}

export default Gameboard;

// Testing

// module.exports = Gameboard;

// function placeShip(shipLength = 4, [row = 0, column = 3], direction = 'horizontal') {
//   const gameboard = [
//     ['', '', '', ''],
//   ];

//   if (direction === 'horizontal') {
//     if (gameboard[row][column + shipLength] === undefined) return 'error';

//     for (let i = 0; i < shipLength; i++) {
//       gameboard[row][column + i] = 'o';
//     }
//   } else if (direction === 'vertical') {
//     for (let i = 0; i < shipLength; i++) {
//       gameboard[row + i][column] = 'o';
//     }
//   }

//   return gameboard;
// }

// module.exports = placeShip;
