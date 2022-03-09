// UTILITY FUNCTIONS FOR FUNCTION BUILDER FEATURE

String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
};

function if_builder(condition, satisfied_rtn, otherwise) {
  let rtn = "";
  if (typeof otherwise == "number") {
    rtn += `if (${condition}) { return ${satisfied_rtn} } return ${otherwise}`;
  } else {
    // typeof otherwise == 'object'
    let cond_2 = condition_builder(otherwise.conditional_requirements[0]);
    rtn += `if (${condition}) { return ${satisfied_rtn} } else if (${cond_2}) { return ${otherwise.satisfied} } else { return ${otherwise.else} }`;
  }
  return rtn;
}

function condition_builder(reqs) {
  //console.log(reqs)
  let condition = "";
  let rng = "";
  if (reqs.hasOwnProperty("type")) {
    if (reqs.type == "totalling") {
      rng = `neighs[${reqs.neighbour_state}]`;
      condition = `[${reqs.total}].includes(${rng})`;
    } else {
      // (reqs.type == "expression")
      for (let st in reqs.lhs.neighbour_states) {
        let nxt = `neighs[${reqs.lhs.neighbour_states[st]}]`;
        rng += rng ? ` + ${nxt}` : `${nxt}`;
      }
      rng += ` ${reqs.cmp} `;
      let _rhs = "";
      for (let _st in reqs.rhs.neighbour_states) {
        let _nxt = `neighs[${reqs.rhs.neighbour_states[_st]}]`;
        _rhs += _rhs ? ` + ${_nxt}` : `${_nxt}`;
      }
      condition = rng + _rhs;
    }
  }

  return condition;
}

// try to implement the moving lizard rules
function create_function(json_rules) {
  let f = "";
  let dflt = "";
  for (var key in json_rules) {
    if (key == "default") {
      let check = condition_builder(
        json_rules.default.next.conditional_requirements[0]
      );
      let stmt = if_builder(
        check,
        json_rules.default.next.satisfied,
        json_rules.default.next.else
      );
      console.log(`stmt --> ${stmt}`);
      dflt += dflt ? "" : `else { ${stmt} }`;
      console.log(`dflt --> ${dflt}`);
    } else {
      // not the `default` value
      //console.log(`checking: ${json_rules[key].next}`);
      let top_if = `if (cur_state == ${key}) {`;
      f += f ? "else " + top_if : top_if;
      let inner_if = "";
      for (let requirement in json_rules[key].next.conditional_requirements) {
        let check = condition_builder(
          json_rules[key].next.conditional_requirements[requirement]
        );
        let cond = if_builder(
          check,
          json_rules[key].next.satisfied,
          json_rules[key].next.else
        );
        inner_if += inner_if ? "else " + cond : cond;
        f += inner_if + " }";
      }
    }

    //f += "}";
  }
  console.log("body: " + f + dflt)
  return new Function("neighs", "cur_state", f + dflt);
}

// UTILITY FUNCTIONS FOR SKETCHING THE GRAPH

// generate random colors according to number of states
function colorBank(states) {
  if (states == 2) {
    announceColors("Default Black & White");
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
    output += `(${color[0]}, ${color[1]} , ${color[0]})`;
  });
  announceColors(output + "]");
  return bank;
}

function step() {
  pause = false;
  draw();
  console.log("");
  pause = true;
}

// UTILITY FUNCTIONS FOR READING & SETTING HTML INPUT

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
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}
