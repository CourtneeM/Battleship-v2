const gameboardController = (() => {
  function boardListener(enemyGameboard, enemyShips, colDiv, playerTurn) {
    colDiv.addEventListener('click', (e) => {
      const row = [...e.target.parentElement.parentElement.children]
        .indexOf(e.target.parentElement);
      const col = [...e.target.parentElement.children].indexOf(e.target);

      enemyGameboard.receiveAttack(enemyShips, row, col);
      playerTurn(row, col);
    });
  }

  return {
    boardListener,
  };
})();

export default gameboardController;
