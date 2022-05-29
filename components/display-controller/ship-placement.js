function shipsDisplay(player) {
  const shipsDropDown = document.createElement('select');
  shipsDropDown.id = 'ships-selector';

  const shipNames = Object.keys(player.ships);
  Object.values(player.ships).forEach((ship, i) => {
    const option = document.createElement('option');
    option.value = `${shipNames[i]}: ${ship.length} spaces`;
    option.textContent = `${shipNames[i]}: ${ship.length} spaces`;

    shipsDropDown.appendChild(option);
  });

  return shipsDropDown;
}

function coordinatesDropDown() {
  const rowDropDown = document.createElement('select');
  const colDownDrop = document.createElement('select');

  [rowDropDown, colDownDrop].forEach((select) => {
    for (let i = 0; i <= 9; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      select.appendChild(option);
    }
  });

  return [rowDropDown, colDownDrop];
}

function orientationDropDown() {
  const orientationDropDown = document.createElement('select');
  const horizontalOption = document.createElement('option');
  const verticalOption = document.createElement('option');

  horizontalOption.value = 'horizontal';
  horizontalOption.textContent = 'horizontal';
  verticalOption.value = 'vertical';
  verticalOption.textContent = 'vertical';

  [horizontalOption, verticalOption].forEach((el) => orientationDropDown.appendChild(el));

  return orientationDropDown;
}

function shipPlacementDisplay(player) {
  const shipPlacementContainer = document.createElement('div');
  const placeShipBtn = document.createElement('button');

  shipPlacementContainer.id = 'ship-placement-container';

  placeShipBtn.textContent = 'Place Ship';
  // add event listener

  [shipsDisplay(player), ...coordinatesDropDown(), orientationDropDown(), placeShipBtn]
    .forEach((el) => shipPlacementContainer.appendChild(el));

  document.querySelector('body').appendChild(shipPlacementContainer);
}

export default shipPlacementDisplay;
