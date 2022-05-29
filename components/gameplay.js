import Gameboard from './Gameboard.js';
import shipPlacementDisplay from './display-controller/ship-placement.js';
import gameboardDisplay from './display-controller/gameboard.js';
import gameboardController from './event-controller/gameboard.js';
import Player from './Player.js';

function gameplay() {
  const player = Player();
  const computer = Player();
  const playerGameboard = Gameboard();
  const computerGameboard = Gameboard();
  let gameOver = false;

  shipPlacementDisplay(player);
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

    const resetBtn = document.querySelector('#reset-btn');
    resetBtn.addEventListener('click', gameplay);
  }
}

export default gameplay;

// add ship placement in UI
// 3 drop downs with numbers 0-9 on the first two, horizontal/vertical on last
// place ship button next to drop downs
