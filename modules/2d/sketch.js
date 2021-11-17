function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let pause = true;
let grid;
let cols;
let rows;
let cnv; // THIS IS THE CANVAS!!
let colors;
let resolution = 10;

function generateCells(grid, states) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(states));
    }
  }
}

function setup(k = 2) {
  // get the number of states
  let states = document.getElementById("states").value || 2;  
  document.getElementById("states_count").innerHTML = "Number of States: " + states;
  colors = colorBank(states);
  cnv = createCanvas(1200, 800);
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
  let bank = [];
  if (states == 2) {
    document.getElementById("colors_bank").innerHTML = "Default Blank & White";
    return [0, 255];
  }
  for (let i = 0; i < states; i++) {
    let rand_color = [floor(random(255)), floor(random(255)), floor(random(255))];
    while (bank.includes(rand_color)) {
      rand_color = [floor(random(255)), floor(random(255)), floor(random(255))];
    }
    bank.push(rand_color);
  }
  let output = "";
  bank.forEach(color => {
    output += `(${color[0]}, ${color[1]} , ${color[0]})\n`
  });
  document.getElementById("colors_bank").innerHTML = output;
  return bank;
}

function draw() {
  //console.log("Drawing...");
  if (!pause) {
    background(0);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        //console.log("grid["+i+"]["+j+"] = " + grid[i][j]);
          fill(colors[grid[i][j]]);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        
      }
    }

    let next = make2DArray(cols, rows);

    // Compute next based on grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j];
        // Count live neighbors!
        let neighbors = countNeighbors(grid, i, j);

        if (state == 0 && neighbors == 3) {
          next[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          next[i][j] = 0;
        } else {
          next[i][j] = state;
        }
      }
    }
    grid = next;
  }
}

function countNeighbors(grid, x, y) {
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

// Mouse Functions

function mouseClicked() {
  //alert(mouseX + ", " + mouseY);
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