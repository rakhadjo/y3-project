let pause = true;
let grid;
let cols;
let rows;
let cnv; // THIS IS THE CANVAS!!
let colors;
let resolution = 10;
let generationCount = 0;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function generateCells(grid, states) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(states));
    }
  }
}

function setup(k = 2) {
  // get the number of states
  generationCount = 0;
  let states = document.getElementById("states").value || 2;
  document.getElementById("states_count").innerHTML =
    "Number of States: " + states;
  colors = colorBank(states);
  cnv = createCanvas(windowWidth / 2, 600);
  centerCanvas();
  background(0);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
  generateCells(grid, states);
  step();
}

// generate random colors according to number of states
function colorBank(states) {
  if (states == 2) {
    document.getElementById("colors_bank").innerHTML = "Default Blank & White";
    return [0, 255];
  }
  let bank = [];
  for (let i = 0; i < states; i++) {
    let rand_color = [
      floor(random(255)),
      floor(random(255)),
      floor(random(255)),
    ];
    while (bank.includes(rand_color)) {
      rand_color = [floor(random(255)), floor(random(255)), floor(random(255))];
    }
    bank.push(rand_color);
  }
  let output = "Colors: [";
  bank.forEach((color) => {
    output += `(${color[0]}, ${color[1]} , ${color[0]}) `;
  });
  document.getElementById("colors_bank").innerHTML = output + "]";
  return bank;
}

function draw() {
  if (!pause) {
    generationCount++;
    background(0);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        fill(colors[grid[i][j]]);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }

    // Compute next based on grid
    grid = applyRule(grid, rulesets);
    document.getElementById("gen_count").innerHTML =
      "Generation: " + (generationCount - 1);
  }
}

function countNeighbors(grid, x, y) {
  let res = {};
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (!(grid[col][row] in res)) {
        res[grid[col][row]] = 1;
      } else {
        res[grid[col][row]] += 1;
      }
    }
  }
  res[grid[x][y]] -= 1;
  return res;
}

function countNeighbors_alpha(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function applyRule(current, rules) {
  let next = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      //next[i][j] = rules[current[i][j]][countNeighbors(current, i, j)];
      next[i][j] = rules[current[i][j]].nextState(
        countNeighbors(current, i, j)
      );
    }
  }
  return next;
}

// Mouse Functions

function mouseClicked() {
  //alert(mouseX + ", " + mouseY);
  //alert(grid[mouseX][mouseY]);
}

// Button Functions

function step() {
  pause = false;
  draw();
  pause = true;
}

function setPause() {
  pause = !pause;
}

// util functions

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}
