import gameboardController from "../event-controller/gameboard.js";

const gameboardDisplay = (() => {
  function generate(gameboard, interactive = false) {
    const gameboardContainer = document.createElement('div');
    const gameboardLabel = document.createElement('p');
    const gridContainer = document.createElement('div');

    if (interactive) {
      gameboardContainer.id = 'enemy-gameboard-container';
      gameboardLabel.classList.add('gameboard-label');
      gameboardLabel.textContent = 'Computer';
    } else {
      gameboardContainer.id = 'player-gameboard-container';
      gameboardLabel.classList.add('gameboard-label');
      gameboardLabel.textContent = 'Player';
    }

    gameboardContainer.classList.add('gameboard-container');
    gridContainer.classList.add('grid-container');

    gameboard.forEach((row) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');

      row.forEach((col) => {
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');
        colDiv.textContent = col;

        if (interactive) {
          colDiv.classList.add('enemy-square');
        }

        rowDiv.appendChild(colDiv);
      });

      gridContainer.appendChild(rowDiv);
      [gameboardLabel, gridContainer].forEach((el) => gameboardContainer.appendChild(el));
      document.querySelector('body').appendChild(gameboardContainer);
    });

    return gameboardContainer;
  }

  function update(gameboard, rowIndex, colIndex) {
    const row = [...gameboard.children][rowIndex];
    const square = [...row.children][colIndex];

    square.textContent = 'x';
  }

  function clear() {
    const body = document.querySelector('body');
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
  }

  function endGame(winner) {
    const body = document.querySelector('body');
    const gameOverDiv = document.createElement('div');
    const winningMessageP = document.createElement('p');
    const resetBtn = document.createElement('button');

    gameOverDiv.id = 'game-over-container';
    winningMessageP.id = 'winning-message';
    resetBtn.id = 'reset-btn';
    winningMessageP.textContent = `${winner} is the winner!`;
    resetBtn.textContent = 'Reset Game';

    gameboardController.resetBtnListener(resetBtn, clear, generate);

    [winningMessageP, resetBtn].forEach((el) => gameOverDiv.appendChild(el));
    body.insertBefore(gameOverDiv, body.firstChild);
  }

  return {
    generate,
    update,
    clear,
    endGame,
  };
})();

export default gameboardDisplay;
