function setPause() {
  pause = !pause;
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
