function renderFormStates(states, formID, type = "totalling") {
  let formElem = document.getElementById(formID);
  let inp = "";
  formElem.innerHTML = inp;
  for (let i = 0; i < states; i++) {
    inp += generateIndividualClauses(i, type, states);
  }
  formElem.innerHTML = inp;
}

function renderFormStatesFromActiveRules(json_rules, formID, randomButton) {
  let formElemt = document.getElementById(formID);
  let content = randomButton ? textarea_val : json_rules;
  let formInput = `
  <br />
  <label for="rules_textarea">Rules:</label> <br />
  <textarea id="rules_textarea" name="rules_textarea" rows="25" cols="80">
    ${content}
  </textarea>
  <br><br>
  <button onclick="parseCustomRules()">Apply Custom Rules!</button>`;
  formElemt.innerHTML = formInput;
}

function parseCustomRules() {
  let contents = document.getElementById("rules_textarea").value;
  textarea_val = contents
  if (obeysJsonSchema(contents)) {
    custom_rules = create_function(JSON.parse(contents));
    custom_rules_mode = true;
    setup(null, false);
    alert("your rules are now live!");
    document.getElementById("rules_textarea").value = contents;
  } else {
    alert("pls apply rules properly");
  }
}

let ajv = require("ajv");

// only one schema is there, so will only input rules
function obeysJsonSchema(json_rules) {

  return true;
  
}


function showHelp() {
  window.location.replace("/help.html");
}
