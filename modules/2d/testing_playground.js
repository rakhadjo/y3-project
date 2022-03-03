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

let exp2 = {
  0: {
    next: {
      conditional_requirements: [
        {
          type: "totalling",
          neighbour_state: 1,
          total: [3],
        },
      ],
      satisfied: 1,
      else: 0,
    },
  },
  1: {
    next: {
      conditional_requirements: [
        {
          type: "totalling",
          neighbour_state: 1,
          total: [2, 3],
        },
      ],
      satisfied: 1,
      else: 0,
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
  if (typeof otherwise == "number") {
    rtn += "if ( {0} ) { return {1} } return {2} ".format(
      condition,
      satisfied_rtn,
      otherwise
    );
  } else {
    // typeof otherwise == 'object'
    let cond_2 = condition_builder(otherwise.conditional_requirements[0]);
    rtn += `if (${condition}) { return ${satisfied_rtn} } 
    else if (${cond_2}) { return ${otherwise.satisfied} } 
    else { return ${otherwise.else} }`;
  }

  return rtn;
}

function condition_builder(reqs) {
  //console.log(reqs)
  let condition = "";
  let rng = "";
  if (reqs.type == "totalling") {
    rng = `neighs[${reqs.neighbour_state}]`;
    condition = `[${reqs.total}].includes(${rng})`;
  } else {
    // (reqs.type == "expression")
    console.log(`reqs: ${reqs.lhs}`);
    for (let st in reqs.lhs.neighbour_states) {
      rng += rng
        ? `${reqs.lhs.conn} neighs[${reqs.lhs.neighbour_states[st]}]`
        : `neighs[${reqs.lhs.neighbour_states[st]}]`;
    }
    rng += ` ${reqs.cmp} `;
    let _rhs = "";
    for (let _st in reqs.rhs.neighbour_states) {
      console.log("state!!!");
      _rhs += _rhs
        ? `${reqs.rhs.conn} neighs[${reqs.rhs.neighbour_states[_st]}]`
        : `neighs[${reqs.rhs.neighbour_states[_st]}]`;
    }

    condition = rng + _rhs;
  }

  return condition;
}

function create_function(json_rules) {
  let f = "";
  for (var key in json_rules) {
    console.log(`checking: ${json_rules[key].next}`);
    let top_if = "if ( {0} == {1} ) { ".format("cur_state", key);
    f += f ? "else " + top_if : top_if;
    let inner_if = "";
    for (let requirement in json_rules[key].next.conditional_requirements) {
      console.log(
        `check 1212: ${json_rules[key].next.conditional_requirements[requirement]}`
      );
      let check = condition_builder(
        json_rules[key].next.conditional_requirements[requirement]
      );
      console.log("MUFUCKAS I MADE IT HERE");
      let cond = if_builder(
        check,
        json_rules[key].next.satisfied,
        json_rules[key].next.else
      );
      inner_if += inner_if ? "else " + cond : cond;
      f += inner_if;
    }
    f += "} ";
  }
  console.log(f);
  return new Function("neighs", "cur_state", f);
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

let expt2 = {
  0: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
            conn: "+",
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
            conn: "+",
          },
        },
      ],
      satisfied: 3,
      else: {
        conditional_requirements: [
          {
            type: "expression",
            lhs: {
              neighbour_states: [3, 4],
              conn: "+",
            },
            cmp: "<",
            rhs: {
              neighbour_states: [1, 2],
              conn: "+",
            },
          },
        ],
        satisfied: 1,
        else: 2,
      },
    },
  },
  1: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
            conn: "+",
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
            conn: "+",
          },
        },
      ],
      satisfied: 0,
      else: {
        conditional_requirements: [
          {
            type: "expression",
            lhs: {
              neighbour_states: [3, 4],
              conn: "+",
            },
            cmp: "<",
            rhs: {
              neighbour_states: [1, 2],
              conn: "+",
            },
          },
        ],
        satisfied: 2,
        else: 3,
      },
    },
  },
  2: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
            conn: "+",
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
            conn: "+",
          },
        },
      ],
      satisfied: 1,
      else: {
        conditional_requirements: [
          {
            type: "expression",
            lhs: {
              neighbour_states: [3, 4],
              conn: "+",
            },
            cmp: "<",
            rhs: {
              neighbour_states: [1, 2],
              conn: "+",
            },
          },
        ],
        satisfied: 2,
        else: 3,
      },
    },
  },
  3: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
            conn: "+",
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
            conn: "+",
          },
        },
      ],
      satisfied: 0,
      else: {
        conditional_requirements: [
          {
            type: "expression",
            lhs: {
              neighbour_states: [3, 4],
              conn: "+",
            },
            cmp: "<",
            rhs: {
              neighbour_states: [1, 2],
              conn: "+",
            },
          },
        ],
        satisfied: 1,
        else: 2,
      },
    },
  },
  0: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
            conn: "+",
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
            conn: "+",
          },
        },
      ],
      satisfied: 4,
      else: {
        conditional_requirements: [
          {
            type: "expression",
            lhs: {
              neighbour_states: [3, 4],
              conn: "+",
            },
            cmp: "<",
            rhs: {
              neighbour_states: [1, 2],
              conn: "+",
            },
          },
        ],
        satisfied: 1,
        else: 2,
      },
    },
  },
};

//console.log(expt2)

create_function(expt2);
