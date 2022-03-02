let exp = {
  0: {
    // figure out how to do lhs, comp, and rhs
    // rethink naming of the keys so that people understand
    // in 5w time will need to explain in the report, demo
    // make sure it really works and reads in those rules
    // rule builder diagram is too detailed
    nextstate: {
      required: {
        0: {
          lhs: {
            type: "states",
            states: [1],
          },
          cmp: "in",
          rhs: {
            type: "values",
            vals: [3],
          },
          conn: "AND",
        },
      },
      satisfied: 1,
      else: 0,
    },
  },
  1: {
    nextstate: {
      required: {
        0: {
          lhs: {
            type: "states",
            states: [1],
          },
          cmp: "in",
          rhs: {
            type: "values",
            vals: [2, 3],
          },
        },
      },
      satisfied: 1,
      else: 1,
    },
  },
};

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

function condition_builder(reqs) {
  //console.log(reqs)
  let condition = "";
  let rng = "";
  if (reqs.lhs.type == "states" && reqs.rhs.type == "values") {
    rng += rng
      ? " + " + "neighs[" + reqs.lhs.states + "]"
      : "neighs[" + reqs.lhs.states + "]";

    condition = "[" + reqs.rhs.vals + "]" + ".includes(" + rng + ")";
  } else {
    // (reqs.lhs.type == "states" && reqs.rhs.type == "states")
    for (let st in reqs.lhs.states) {
      rng += rng
        ? " + " + "neighs[" + reqs.lhs.states[st] + "]"
        : "neighs[" + reqs.lhs.states[st] + "]";
    }
    rng += " " + reqs.cmp + " ";
    let _rhs = "";
    for (let _st in reqs.rhs.states) {
      console.log("state!!!");
      _rhs += _rhs
        ? " + " + "neighs[" + reqs.rhs.states[_st] + "]"
        : "neighs[" + reqs.rhs.states[_st] + "]";
    }

    condition = rng + _rhs;
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
      console.log("check: ");
      console.log(json_rules[key].nextstate.required[req]);
      let check = condition_builder(json_rules[key].nextstate.required[req]);
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

let expt = {
  0: {
    // figure out how to do lhs, comp, and rhs
    nextstate: {
      required: {
        1: {
          lhs: {
            type: "states",
            states: [3, 4],
          },
          cmp: ">",
          rhs: {
            type: "states",
            states: [1, 2],
          },
          conn: "AND",
        },
      },
      satisfied: 3,
      else: 1,
    },
  },
  1: {
    // figure out how to do lhs, comp, and rhs
    nextstate: {
      required: {
        1: {
          lhs: {
            type: "states",
            states: [3, 4],
          },
          cmp: ">",
          rhs: {
            type: "states",
            states: [1, 6],
          },
          conn: "AND",
        },
      },
      satisfied: 3,
      else: 1,
    },
  },
};

//console.log(condition_builder(expt[0].nextstate.required[1]));
console.log(create_function(expt));

let cur_state = 0;
let neighs = 0;

if (cur_state == 0) {
  if ([3].includes(neighs[1])) {
    return 1;
  }
  return 0;
} else if (cur_state == 1) {
  if ([2, 3].includes(neighs[1])) {
    return 1;
  }
  return 1;
}
