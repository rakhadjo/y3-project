function setPause() {
  pause = !pause;
}

function setFire() {
  // set 3 states
  states = 3;
  // set fire colors
  announceColors("Forest Fire Mode");
  colors = [
    [0, 0, 0],
    [255, 0, 0],
    [32, 168, 5],
  ];
  // determine rules
  active_rules = create_function(firesim);
}

function announceColors(colors) {
  document.getElementById("colors_bank").innerHTML = colors;
}

function announceStates(states) {
  document.getElementById("states_count").innerHTML =
    "Number of States: " + states;
}

function announceDepth(depth) {
  document.getElementById("depth_count").innerHTML = "Depth: " + depth;
}

// UTILITY CANVAS FUNCTIONS

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x + (0.23 * windowWidth), y);
}

function windowResized() {
  centerCanvas();
}

function showHelp() {
  window.open('/help.html', '_blank');
}

function showMain() {
  window.open('/index.html', '_blank');
}
