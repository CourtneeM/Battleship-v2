import Gameboard from './Gameboard.js';
import gameboardDisplay from './display-controller/gameboard.js';
import gameboardController from './event-controller/gameboard.js';
import Player from './Player.js';

const gameplay = (() => {
  const player = new Player();
  const computer = new Player();
  const playerGameboard = new Gameboard();
  const computerGameboard = new Gameboard();
  let currentPlayer = 'computer';

  gameboardDisplay.generate(playerGameboard.gameboard);
  gameboardDisplay.generate(computerGameboard.gameboard, true);

  [...document.querySelectorAll('.enemy-square')].forEach((square) => {
    gameboardController.boardListener(computerGameboard, computer.ships, square);
  });

  function playerTurn(row, col) {
    const computerGameboardContainer = document.querySelector('#enemy-gameboard-container');

    // player.playerMove(computerGameboard, computer.ships, row, col);
    gameboardDisplay.update(computerGameboardContainer, row, col);

    currentPlayer = 'computer';
  }

  function computerTurn() {
    const playerGameboardContainer = document.querySelector('.gameboard-container');
    const [row, col] = player.computerMove(playerGameboard, player.ships);
    gameboardDisplay.update(playerGameboardContainer, row, col);

    currentPlayer = 'player';
  }

  function playRound() {
    // playerTurn();
    while (currentPlayer === 'computer') {
      computerTurn();
    }

    // check if winner
  }

  return {
    playRound,
  };
})();

export default gameplay;
