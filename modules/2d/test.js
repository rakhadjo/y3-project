let exp = {
  0: {
    // figure out how to do lhs, comp, and rhs
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
      else: 1,
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
  //return f;
  return new Function("neighs", "cur_state", f);
}

var x = create_function(exp)
console.log(x.format)