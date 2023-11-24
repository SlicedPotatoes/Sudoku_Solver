const GRID_SIZE = 9;
const SQUARE_SIZE = 3;
const EMPTY = 0;

function solve(sudoku) {
  if (sudoku.isEnd()) {
    return sudoku.isValid();
  }

  let pos = sudoku.firstEmpty();
  let possibleNumber = sudoku.getPossibleNumber(pos.x, pos.y);

  if (possibleNumber.length == 0) {
    sudoku.undo();
    return false;
  }

  for (let n of possibleNumber) {
    sudoku.updateCase(pos.x, pos.y, n);
    if (solve(sudoku)) {
      return true;
    }
  }
  sudoku.undo();
  return false;
}
class Sudoku {
  constructor(grid) {
    this.grid = grid;
    this.history = [];
  }
  updateCase(x, y, value) {
    this.grid[y][x] = value;
    this.history.push({ x: x, y: y, value: value });
  }
  undo() {
    let lastPlay = this.history.pop();
    this.grid[lastPlay.y][lastPlay.x] = EMPTY;
  }
  firstEmpty() {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        if (this.grid[y][x] === EMPTY) {
          return { x: x, y: y };
        }
      }
    }
    return { x: -1, y: -1 };
  }
  checkRow(index) {
    let checked = Array(GRID_SIZE).fill(false);

    for (let x = 0; x < GRID_SIZE; x++) {
      let number = this.grid[index][x];

      if (number === EMPTY) {
        continue;
      }

      if (checked[number - 1]) {
        return false;
      }

      checked[number - 1] = true;
    }
    return true;
  }
  checkCol(index) {
    let checked = Array(GRID_SIZE).fill(false);

    for (let y = 0; y < GRID_SIZE; y++) {
      let number = this.grid[y][index];

      if (number === EMPTY) {
        continue;
      }

      if (checked[number - 1]) {
        return false;
      }

      checked[number - 1] = true;
    }
    return true;
  }
  checkSquare(index) {
    let checked = Array(GRID_SIZE).fill(false);
    let rowOffset = index - (index % SQUARE_SIZE);
    let colOffset = (index % SQUARE_SIZE) * SQUARE_SIZE;

    for (let x = 0; x < SQUARE_SIZE; x++) {
      for (let y = 0; y < SQUARE_SIZE; y++) {
        let _x = x + colOffset;
        let _y = y + rowOffset;

        let number = this.grid[_y][_x];

        if (number === EMPTY) {
          continue;
        }

        if (checked[number - 1]) {
          return false;
        }

        checked[number - 1] = true;
      }
    }
    return true;
  }
  isValid() {
    for (let i = 0; i < GRID_SIZE; i++) {
      if (!this.checkRow(i)) {
        console.error("Row Invalide");
        return false;
      }
      if (!this.checkCol(i)) {
        console.error("Col Invalide");
        return false;
      }
      if (!this.checkSquare(i)) {
        console.error("Square Invalide");
        return false;
      }
    }
    return true;
  }
  isEnd() {
    let pos = this.firstEmpty();
    return pos.x == -1 && pos.y == -1;
  }
  getPossibleNumber(x, y) {
    let checked = Array(GRID_SIZE).fill(false);

    for (let _x = 0; _x < GRID_SIZE; _x++) {
      let number = this.grid[y][_x];
      if (number === EMPTY) {
        continue;
      }
      checked[number - 1] = true;
    }
    for (let _y = 0; _y < GRID_SIZE; _y++) {
      let number = this.grid[_y][x];
      if (number === EMPTY) {
        continue;
      }
      checked[number - 1] = true;
    }

    let indexSquare = SQUARE_SIZE * Math.floor(y / SQUARE_SIZE) + Math.floor(x / SQUARE_SIZE);
    let rowOffset = indexSquare - (indexSquare % SQUARE_SIZE);
    let colOffset = (indexSquare % SQUARE_SIZE) * SQUARE_SIZE;

    for (let _x = 0; _x < SQUARE_SIZE; _x++) {
      for (let _y = 0; _y < SQUARE_SIZE; _y++) {
        let __x = _x + colOffset;
        let __y = _y + rowOffset;

        let number = this.grid[__y][__x];

        if (number === EMPTY) {
          continue;
        }
        checked[number - 1] = true;
      }
    }

    let arr = [];

    for (let i = 0; i < GRID_SIZE; i++) {
      if (!checked[i]) {
        arr.push(i + 1);
      }
    }
    return arr;
  }
}
/*let sudoku = new Sudoku([
  [2, 5, 0, 0, 0, 0, 0, 0, 4],
  [0, 0, 0, 0, 5, 0, 0, 0, 9],
  [0, 8, 0, 3, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 2],
  [0, 3, 0, 0, 0, 7, 0, 0, 0],
  [8, 0, 0, 0, 4, 0, 1, 6, 0],
  [1, 0, 0, 0, 6, 0, 5, 8, 0],
  [0, 0, 0, 0, 0, 0, 0, 9, 0],
  [0, 0, 6, 4, 0, 0, 0, 0, 0],
]);

for (let y = 0; y < GRID_SIZE; y++) {
  let str = "";
  for (let x = 0; x < GRID_SIZE; x++) {
    str += sudoku.grid[y][x] + " ";
  }
  console.log(str);
}

console.log(solve(sudoku));

for (let y = 0; y < GRID_SIZE; y++) {
  let str = "";
  for (let x = 0; x < GRID_SIZE; x++) {
    str += sudoku.grid[y][x] + " ";
  }
  console.log(str);
}*/
