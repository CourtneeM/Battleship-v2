import Gameboard from './Gameboard.js';
import gameboardDisplay from './display-controller/gameboard.js';
import gameboardController from './event-controller/gameboard.js';
import Player from './Player.js';

function gameplay() {
  const player = Player();
  const computer = Player();
  const playerGameboard = Gameboard();
  const computerGameboard = Gameboard();
  let gameOver = false;

  gameboardDisplay.generate(playerGameboard.gameboard);
  gameboardDisplay.generate(computerGameboard.gameboard, true);

  [...document.querySelectorAll('.enemy-square')].forEach((square) => {
    gameboardController.boardListener(computerGameboard, computer.ships, square, playerTurn);
  });

  function playerTurn(row, col) {
    if (gameOver) return;

    const computerGameboardContainer = document.querySelector('#enemy-gameboard-container');

    if (player.playerMove(computerGameboard, computer.ships, row, col) === 'invalid') return;
    gameboardDisplay.update(computerGameboardContainer, row, col);

    if (checkForWinner(computer)) {
      endGame('Player');
      return;
    }
    computerTurn();
  }

  function computerTurn() {
    if (gameOver) return;

    const playerGameboardContainer = document.querySelector('.gameboard-container');
    const [row, col] = computer.computerMove(playerGameboard, player.ships);

    gameboardDisplay.update(playerGameboardContainer, row, col);
    if (checkForWinner(player)) endGame('Computer');
  }

  function checkForWinner(currentPlayer) {
    return Object.values(currentPlayer.ships).every((ship) => ship.isSunk());
  }

  function endGame(winner) {
    gameOver = true;
    gameboardDisplay.endGame(winner);
    // declare winner and lock down boards
  }
}

export default gameplay;
