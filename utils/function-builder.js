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
    } else if (reqs.type == "expression") {
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
     else {
       // (reqs.type == "probability")
       condition = `probability(${reqs.p})`
     }
  }

  return condition;
}

function default_builder(def) {
  let check = condition_builder(def.conditional_requirements[0]);
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
  console.log("body: " + f + dflt);
  return new Function("neighs", "cur_state", f + dflt);
}
