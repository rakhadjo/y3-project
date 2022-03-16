String.prototype.format = function () {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
};

function probability(n) {
  return !!n && Math.random() <= n;
}

function if_builder(condition, satisfied_rtn, otherwise) {
  let rtn = "";
  if (typeof otherwise == "number") {
    rtn += `if (${condition}) { return ${satisfied_rtn} } return ${otherwise}`;
  }
  return rtn;
}

function condition_builder(requirements) {
  let condition = "";
  let rng = "";
  let inner_cond = "";
  for (let reqs in requirements) {
    if (requirements[reqs].hasOwnProperty("type")) {
      if (requirements[reqs].type == "totalling") {
        rng = `neighs[${requirements[reqs].neighbour_state}]`;
        inner_cond = `[${requirements[reqs].total}].includes(${rng})`;
      } else if (requirements[reqs].type == "expression") {
        for (let st in requirements[reqs].lhs.neighbour_states) {
          let nxt = `neighs[${requirements[reqs].lhs.neighbour_states[st]}]`;
          rng += rng ? ` + ${nxt}` : `${nxt}`;
        }
        rng += ` ${requirements[reqs].cmp} `;
        let _rhs = "";
        for (let _st in requirements[reqs].rhs.neighbour_states) {
          let _nxt = `neighs[${requirements[reqs].rhs.neighbour_states[_st]}]`;
          _rhs += _rhs ? ` + ${_nxt}` : `${_nxt}`;
        }
        inner_cond = rng + _rhs;
      } else {
        // (reqs.type == "probability")
        inner_cond = `probability(${requirements[reqs].p})`;
      }
      condition += condition ? "&& " + inner_cond : inner_cond;
    }
  }

  return condition;
}

function default_builder(def) {
  let check = condition_builder(def.conditional_requirements);
  return if_builder(check, def.satisfied, def.else);
}

// try to implement the moving lizard rules
function create_function(json_rules) {
  let f = "";
  let dflt = "";
  for (var key in json_rules) {
    if (key == "default") {
      let stmt = default_builder(json_rules.default.next);
      dflt += dflt ? "" : `else { ${stmt} }`;
    } else {
      // not the `default` value
      //console.log(`checking: ${json_rules[key].next}`);
      let top_if = `if (cur_state == ${key}) {`;
      f += f ? " else " + top_if : top_if;
      let inner_if = "";
      let check = condition_builder(
        json_rules[key].next.conditional_requirements
      );
      let cond = if_builder(
        check,
        json_rules[key].next.satisfied,
        json_rules[key].next.else
      );
      inner_if += inner_if ? " else " + cond : cond
      f += inner_if + " }"
    }

    //f += "}";
  }
  console.log("body: " + f + dflt);
  return new Function("neighs", "cur_state", f + dflt);
}
