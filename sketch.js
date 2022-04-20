let pause = true;
let grid;
let temp_grid;
let cols;
let rows;
let cnv; // THIS IS THE CANVAS!!
let colors;
let resolution = 10;
let generationCount = 0;

let custom_rules_mode = false;
let custom_rules;
let textarea_val;

let active_rules; // rules to be applied
let rules_str;
let depth; // how far you should look outwards

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
  temp_grid = grid;
}

function generateFireCells(grid) {
  generateCells(grid, 2);
  grid[floor(random(cols))][floor(random(rows))] = 2;
}

function setup(
  k = 2,
  newGrid = true,
  randomBtn = false,
  updateStateNum = false,
  fireMode = false
) {
  // get the number of states
  generationCount = 0;
  let states = parseInt(document.getElementById("states").value) || 2;
  depth = parseInt(document.getElementById("depth").value) || 0;
  announceStates(states);
  announceDepth(depth);
  textarea_val = !textarea_val
    ? JSON.stringify(conway_default, null, "\t")
    : textarea_val;
  renderFormStatesFromActiveRules(textarea_val, randomBtn);
  colors = colorBank(
    states,
    fireMode,
    JSON.parse(textarea_val)["$_meta"]["colors"]
  );
  //console.log("textarea_val" + JSON.stringify(JSON.parse(textarea_val)["$_meta"]["colors"]));
  addTabListener();
  active_rules = custom_rules_mode
    ? custom_rules
    : create_function(conway_default);
  cnv = createCanvas(windowWidth / 2, 600);
  centerCanvas();
  background(0);
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  grid = make2DArray(cols, rows);
  if (fireMode && states > 2) {
    generateFireCells(grid);
  } else if (fireMode && states <= 2) {
    alert("Error: Please have 2 or more states");
    grid = temp_grid;
  } else {
    if (newGrid) {
      generateCells(grid, states);
    } else {
      grid = temp_grid;
    }
  }
  step();
}

function draw() {
  if (!pause) {
    generationCount++;
    background(0);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        //console.log(`grid[${i}][${j}]: ${grid[i][j]}`)
        fill(colors[grid[i][j]]);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }

    // Compute next based on grid
    grid = applyRule(grid, active_rules);
    document.getElementById("gen_count").innerHTML =
      "Generation: " + (generationCount - 1);
  }
}

function countNeighbors(grid, x, y, inp_depth) {
  let res = {}; // neighbour types
  for (let i = -1 - inp_depth; i < 2 + inp_depth; i++) {
    for (let j = -1 - inp_depth; j < 2 + inp_depth; j++) {
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

function applyRule(current, rules) {
  let next = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      next[i][j] = rules(countNeighbors(current, i, j, depth), current[i][j]);
    }
  }
  return next;
}
