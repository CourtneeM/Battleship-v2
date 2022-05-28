import Gameboard from './Gameboard.js';
import gameboardDisplay from './display-controller/gameboard.js';
import gameboardController from './event-controller/gameboard.js';
import Player from './Player.js';

function gameplay() {
  const player = Player();
  const computer = Player();
  const playerGameboard = Gameboard();
  const computerGameboard = Gameboard();

  gameboardDisplay.generate(playerGameboard.gameboard);
  gameboardDisplay.generate(computerGameboard.gameboard, true);

  [...document.querySelectorAll('.enemy-square')].forEach((square) => {
    gameboardController.boardListener(computerGameboard, computer.ships, square, playerTurn);
  });

  function playerTurn(row, col) {
    const computerGameboardContainer = document.querySelector('#enemy-gameboard-container');

    if (player.playerMove(computerGameboard, computer.ships, row, col) === 'invalid') return;
    gameboardDisplay.update(computerGameboardContainer, row, col);

    if (checkForWinner(computer)) console.log('player is the winner!');
    computerTurn();
  }

  function computerTurn() {
    const playerGameboardContainer = document.querySelector('.gameboard-container');
    const [row, col] = computer.computerMove(playerGameboard, player.ships);

    gameboardDisplay.update(playerGameboardContainer, row, col);
    if (checkForWinner(player)) console.log('computer is the winner!');
  }

  function checkForWinner(currentPlayer) {
    return Object.values(currentPlayer.ships).every((ship) => ship.isSunk());
  }
}

export default gameplay;
