/* neighs = 
{
  0: #dead cell,
  1: #weak_fire cell,
  2: #strong_fire_count,
  3: #weak_water_count,
  4: #strong_water_count

  preprocess
  get metrics to compare
  gridification of the animation(?)

  make editing the rules really user friendly
  think about evaluation

} */

// from stackoverflow
String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
};

function if_builder(condition, satisfied_rtn, otherwise) {
  let rtn = "";
  rtn += "if ( {0} ) { return {1} } return {2} ".format(
    condition,
    satisfied_rtn,
    otherwise
  );
  return rtn;
}

/**
 * 
 * @param reqs: 
      {
      lhs: { type: 'states', states: [ 1 ] },
      cmp: 'in',
      rhs: { type: 'values', vals: [ 3, 4 ] },
      conn: 'AND'
      } 
 * @returns String
 */
function condition_builder(reqs) {
  //console.log(reqs)
  let condition = "";
  let rng = "";
  if (reqs.lhs.type == "states" && reqs.rhs.type == "values") {
    rng += rng
      ? " + " + "neighs[" + reqs.lhs.states + "]"
      : "neighs[" + reqs.lhs.states + "]";

    condition = "[" + reqs.rhs.vals + "]" + ".includes(" + rng + ")";
  }

  return condition;
}

function create_function(json_rules) {
  let f = "";
  for (var key in json_rules) {
    let top_if = "if ( {0} == {1} ) { ".format("cur_state", key);
    f += f ? "else " + top_if : top_if;
    let inner_if = "";
    for (var req in json_rules[key].nextstate.required) {
      /*let comp = "neighs[" + req + "]";
      let accp = "[" + json_rules[key].nextstate.required[req] + "]";
      let check = accp + ".includes(" + comp + ")";*/
      console.log("check: ")
      console.log(json_rules[key].nextstate.required[req])
      let check = condition_builder(json_rules[key].nextstate.required[req])
      let cond = if_builder(
        check,
        json_rules[key].nextstate.satisfied,
        json_rules[key].nextstate.else
      );
      inner_if += inner_if ? "else " + cond : cond;
      f += inner_if;
    }
    f += "} ";
    /**
    if (!f) {
      let val = "neighs[ %s ]".format(json_rules[key].nextstate.required);
      let condition = "neighs[ %s ]".format();
      f += if_builder(true, condition)
    } else {

    }  */
  }
  return f;
  //return new Function("neighs", "cur_state", f);
}

const cgol_rules = (neighs, cur_state) => {
  if (cur_state == 0) {
    if ([3].includes(neighs[1])) {
      return 1;
    }
    return 0;
  } else if (cur_state == 1) {
    if ([2, 3].includes(neighs[1])) {
      return 1;
    }
    return 0;
  }
};

const fire_1 = (neighs, cur_state) => {
  switch (cur_state) {
    case 0:
      // use switches instead of if + ternary!!
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 3;
      }
      return neighs[3] + neighs[4] < neighs[1] + neighs[2] ? 1 : 2;
    case 1:
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 0;
      }
      return neighs[3] + neighs[4] < neighs[1] + neighs[2] ? 2 : 3;
    case 2:
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 1;
      }
      return neighs[3] + neighs[4] < neighs[1] + neighs[2] ? 2 : 3;
    case 3:
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 0;
      }
      return neighs[3] + neighs[4] < neighs[1] + neighs[2] ? 1 : 2;
    default:
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 4;
      }
      return neighs[3] + neighs[4] < neighs[1] + neighs[2] ? 1 : 2;
  }
};

/* neighs = 
{
  0: #dead cell,
  1: #weak_fire cell,
  2: #strong_fire_count,
  3: #weak_water_count,
  4: #strong_water_count
} */
let rulesets_fire_1 = {
  // Dead
  0: {
    nextState: (neighs) => {
      // more water than fire
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 3;
        // more fire than water
      } else if (neighs[3] + neighs[4] < neighs[1] + neighs[2]) {
        return 1;
        // equal amt of both
      } else {
        return 3;
      }
    },
  },
  // R1 -> weak fire
  1: {
    nextState: (neighs) => {
      // more water than fire
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 0;
        // more fire than water
      } else if (neighs[3] + neighs[4] < neighs[1] + neighs[2]) {
        return 2;
        // equal amt of both
      } else {
        return 3;
      }
    },
  },
  // R2 -> strong fire
  2: {
    nextState: (neighs) => {
      // more water than fire
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 1;
        // more fire than water
      } else if (neighs[3] + neighs[4] < neighs[1] + neighs[2]) {
        return 2;
        // equal amt of both
      } else {
        return 2;
      }
    },
  },
  // B1 -> weak water
  3: {
    nextState: (neighs) => {
      // more water than fire
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 0;
        // more fire than water
      } else if (neighs[3] + neighs[4] < neighs[1] + neighs[2]) {
        return 0;
        // equal amt of both
      } else {
        return 1;
      }
    },
  },
  // B2 -> strong water
  4: {
    nextState: (neighs) => {
      // more water than fire
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 4;
        // more fire than water
      } else if (neighs[3] + neighs[4] < neighs[1] + neighs[2]) {
        return 1;
        // equal amt of both
      } else {
        return 4;
      }
    },
  },
};
