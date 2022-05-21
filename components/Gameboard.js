/* eslint-disable no-plusplus */
function Gameboard() {
  const gameboard = [
    ['', 'o', 'o', 'o', 'o', 'o', '', '', '', ''],
    ['', '', '', '', '', '', '', 'o', '', ''],
    ['', 'o', '', '', '', '', '', 'o', '', ''],
    ['', 'o', '', '', '', '', '', 'o', '', ''],
    ['', 'o', '', '', '', '', '', 'o', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', 'o', 'o', 'o', '', '', ''],
    ['', 'o', 'o', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
  ];

  const missedAttacks = [];

  function checkIfOffGrid(shipLength, row, col, direction) {
    if (direction === 'horizontal') {
      return gameboard[row][col + shipLength] === undefined;
    }

    return gameboard[row + shipLength][col] === undefined;
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
      if (checkIfOffGrid(ship.length, row, col, direction)) return 'Error, cannot place ship off grid';
      if (checkIfOccupied(ship.length, row, col, direction)) return 'Space occupied by another ship';

      for (let i = 0; i < ship.length; i++) {
        gameboard[row][col + i] = 'o';
      }
    } else if (direction === 'vertical') {
      if (checkIfOffGrid(ship.length, row, col, direction)) return 'Error, cannot place ship off grid';
      if (checkIfOccupied(ship.length, row, col, direction)) return 'Space occupied by another ship';

      for (let i = 0; i < ship.length; i++) {
        gameboard[row + i][col] = 'o';
      }
    }

    ship.coordinates.push([row, col]);
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
