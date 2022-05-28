import Ship from '../components/Ship.js';

function Player() {
  function generateShips() {
    const defaultShips = [
      { name: 'carrier', length: 5 },
      { name: 'battleship', length: 4 },
      { name: 'destroyer', length: 3 },
      { name: 'submarine', length: 3 },
      { name: 'patrol boat', length: 2 },
    ];

    const ships = {};
    defaultShips.forEach((ship) => {
      ships[ship.name] = new Ship(ship.length);
    });

    return ships;
  }

  const previousAttacks = [];
  const ships = generateShips();

  function checkIfInvalidMove(row, col) {
    return previousAttacks.some(([prevRow, prevCol]) => prevRow === row && prevCol === col);
  }

  function playerMove(computerGameboard, computerShips, row, col) {
    if (checkIfInvalidMove(row, col)) return 'invalid';

    previousAttacks.push([row, col]);
    computerGameboard.receiveAttack(computerShips, row, col);
  }

  function computerMove(playerGameboard, playerShips) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);

    while (checkIfInvalidMove(row, col)) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      console.log(previousAttacks);
    }


    playerGameboard.receiveAttack(playerShips, row, col);

    return [row, col];
  }

  return {
    ships,
    playerMove,
    computerMove,
  };
}

export default Player;

// Tests

// module.exports = Player;

// function computerMove() {
//   function checkIfInvalidMove(previousAttacks, row, col) {
//     return previousAttacks.some(([prevRow, prevCol]) => prevRow === row && prevCol === col);
//   }

//   const previousAttacks = [
//     [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9],
//     [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9],
//     [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8], [2, 9],
//     [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9],
//     [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [4, 9],
//     [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 7], [5, 8], [5, 9],
//     [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 8], [6, 9],
//     [7, 0], [7, 1], [7, 2], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9],
//     [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9],
//     [9, 0], [9, 1], [9, 2], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 8], [9, 9],
//   ];
//   let row = Math.floor(Math.random() * 10);
//   let col = Math.floor(Math.random() * 10);

//   while (checkIfInvalidMove(previousAttacks, row, col)) {
//     row = Math.floor(Math.random() * 10);
//     col = Math.floor(Math.random() * 10);
//   }

//   return { row, col };
// }

// module.exports = computerMove;
