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

// RULE DEFINER FUNCTIONS

function parseCustomRules() {
  let contents = document.getElementById("rules_textarea").value;
  if (obeysJsonSchema(contents)) {
    custom_rules = create_function(JSON.parse(contents));
    custom_rules_mode = true
    setup()
    alert("your rules are now live!")

  } else {
    alert("pls apply rules properly")
  }
}

function obeysJsonSchema(json_rules) {
  // apply through schema here, for now just return T
  return true;
  
}

function showHelp() {
  window.location.replace("/help.html");
}
