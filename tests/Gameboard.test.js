const Gameboard = require('../components/Gameboard');

test('A gameboard object is returned', () => {
  expect(Gameboard()).toEqual({
    a: ['', '', '', '', '', '', '', '', '', ''],
    b: ['', '', '', '', '', '', '', '', '', ''],
    c: ['', '', '', '', '', '', '', '', '', ''],
    d: ['', '', '', '', '', '', '', '', '', ''],
    e: ['', '', '', '', '', '', '', '', '', ''],
    f: ['', '', '', '', '', '', '', '', '', ''],
    g: ['', '', '', '', '', '', '', '', '', ''],
    h: ['', '', '', '', '', '', '', '', '', ''],
    i: ['', '', '', '', '', '', '', '', '', ''],
    j: ['', '', '', '', '', '', '', '', '', ''],
  });
});
