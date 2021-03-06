function Ship(length) {
  return {
    length,
    layout: [...Array(length)].map((() => 'o')),
    coordinates: [],
    hit(i) {
      this.layout[i] = 'x';
    },
    isSunk() {
      return this.layout.every((el) => el === 'x');
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
