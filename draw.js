const MODAL = document.getElementById("modal");

function init() {
  //Génération de la grille de Sudoku
  let html = "";
  for (let indexSquare = 0; indexSquare < GRID_SIZE; indexSquare++) {
    let rowOffset = indexSquare - (indexSquare % SQUARE_SIZE);
    let colOffset = (indexSquare % SQUARE_SIZE) * SQUARE_SIZE;

    html += '<div class="display-grid border-box square">';
    for (let indexCell = 0; indexCell < GRID_SIZE; indexCell++) {
      let x = indexCell % 3;
      let y = (indexCell - x) / 3;
      x += colOffset;
      y += rowOffset;

      html += `<div id="cell_${y + "_" + x}" class="border-box case"></div>`;
    }
    html += "</div>";
  }
  document.getElementById("sudoku-container").innerHTML = html;

  //Génération des inputs de la grille
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      var input = document.createElement("input");
      input.type = "text";
      input.id = `input-${y + "_" + x}`;
      input.className = "element-in-case";

      input.addEventListener("input", function () {
        let inputValue = this.value;
        inputValue = inputValue.replace(/[^1-9]/g, "");
        if (inputValue.length > 1) {
          inputValue = inputValue.slice(-1);
        }
        this.value = inputValue;
      });

      document.getElementById(`cell_${y + "_" + x}`).appendChild(input);
    }
  }

  //Fonction validation grid
  document.getElementById("btn-is-valid").addEventListener("click", function () {
    let sudoku = getSudoku();

    if (sudoku.isValid()) {
      openModal("Grille avec aucune contradiction");
    } else {
      openModal("Grille Invalide !");
    }
  });

  //Fonction solve grid
  document.getElementById("btn-solve").addEventListener("click", function () {
    let sudoku = getSudoku();

    if (!sudoku.isValid()) {
      openModal("Grille Invalide !");
      return;
    }

    let startTime = new Date();

    solve(sudoku);

    let endTime = new Date();

    let elapsedSeconds = (endTime - startTime) / 1000;

    console.log("Temps écoulé: " + elapsedSeconds + " secondes");

    if (sudoku.isValid()) {
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          document.getElementById(`input-${y + "_" + x}`).value = sudoku.grid[y][x];
        }
      }
    }
  });

  //Reset grid
  document.getElementById("btn-clear").addEventListener("click", function () {
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        document.getElementById(`input-${y + "_" + x}`).value = "";
      }
    }
  });

  //Close Modal
  document.getElementById("closeModalBtn").addEventListener("click", function () {
    MODAL.style.display = "none";
  });
}

function openModal(text) {
  document.getElementById("modal-text").innerHTML = text;
  MODAL.style.display = "flex";
}

function getSudoku() {
  let grid = Array(GRID_SIZE)
    .fill(0)
    .map(() => new Array(GRID_SIZE).fill(0));
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      let value = document.getElementById(`input-${y + "_" + x}`).value;
      if (value != "") {
        grid[y][x] = parseInt(value);
      }
    }
  }

  let sudoku = new Sudoku(grid);

  return sudoku;
}

init();
