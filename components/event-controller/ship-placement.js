function shipPlacementController(placeShipBtn, player, playerGameboard, placeShip, activateBoard) {
  placeShipBtn.addEventListener('click', () => {
    const shipSelectorEl = document.querySelector('#ships-selector');
    const selectedShipEl = [...shipSelectorEl.children][shipSelectorEl.selectedIndex];

    const rowSelector = document.querySelector('#row-drop-down');
    const rowIndex = Number([...rowSelector.children][rowSelector.selectedIndex].value);

    const colSelector = document.querySelector('#col-drop-down');
    const colIndex = Number([...colSelector.children][colSelector.selectedIndex].value);

    const orientationSelector = document.querySelector('#orientation-drop-down');
    const orientation = [...orientationSelector.children][orientationSelector.selectedIndex].value;

    const playerShips = Object.values(player.ships).filter((ship) => ship.coordinates.length === 0);
    const selectedPlayerShip = playerShips[shipSelectorEl.selectedIndex];

    if (playerGameboard.placeShip(selectedPlayerShip, [rowIndex, colIndex], orientation)) return;
    placeShip(document.querySelector('#player-gameboard-container > .grid-container'), selectedPlayerShip.length, rowIndex, colIndex, orientation);

    playerShips.splice(shipSelectorEl.selectedIndex);
    shipSelectorEl.removeChild(selectedShipEl);

    if ([...shipSelectorEl.children].length === 0) {
      document.querySelector('body').removeChild(document.querySelector('#ship-placement-container'));
      activateBoard();
    }
  });
}

export default shipPlacementController;
