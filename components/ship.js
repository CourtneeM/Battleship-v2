function Ship(length) {
  return {
    length,
    shipLayout: [...Array(length)],
    hit(i) {
      this.shipLayout[i] = 'x';
    },
    isSunk() {
      return this.shipLayout.every((el) => el !== undefined);
    },
  };
}

export default Ship;

// Testing

// module.exports = Ship;

// function isSunk() {
//   const shipLayout = [...Array(4)];
//   const shipLayout = ['x', undefined, 'x', 'x'];

//   return shipLayout.every((el) => el !== undefined);
// }

// module.exports = isSunk;

// function hit(i) {
//   const shipLayout = [undefined, undefined, 'x', undefined];

//   shipLayout[i] = 'x';

//   return shipLayout;
// }

// module.exports = hit;
