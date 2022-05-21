const gameboardDisplay = (() => {
  function generate(gameboard, interactive = false) {
    const gameboardContainer = document.createElement('div');

    gameboardContainer.id = interactive ? 'enemy-gameboard-container' : 'player-gameboard-container';
    gameboardContainer.classList.add('gameboard-container');

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

      gameboardContainer.appendChild(rowDiv);
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
    // remove gameboard and call generate
  }

  return {
    generate,
    update,
  };
})();

export default gameboardDisplay;
