function renderFormStatesFromActiveRules(json_rules, randomButton) {
  let content = randomButton ? textarea_val : json_rules;
  let formInput = `
  <br />
  <label for="rules_textarea">Rules:</label> <br />
  <textarea id="rules_textarea" name="rules_textarea" rows="25" cols="80">
    ${content}
  </textarea>
  <br><br>
  <button onclick="parseCustomRules()">Apply Custom Rules!</button>`;
  document.getElementById("rulesform").innerHTML = formInput;
}

function onPresetRadioChange(src) {
  let x;
  if (src.value == "firesim") {
    x = JSON.stringify(firesim, null, "\t")
  } else {
    x = JSON.stringify(conway_default, null, "\t")
  }
  renderFormStatesFromActiveRules(x, false);
}

function parseCustomRules() {
  let contents = document.getElementById("rules_textarea").value;
  textarea_val = contents;
  if (obeysJsonSchema(contents)) {
    custom_rules = create_function(JSON.parse(contents));
    custom_rules_mode = true;
    setup(null, false);
    alert("your rules are now live!");
    document.getElementById("rules_textarea").value = contents;
  } else {
    alert("pls apply rules properly");
    console.log(tv4.error);
  }
}

import("../libraries/tv4");

// only one schema is there, so will only input rules
// return some feed back on rules validation if bad
function obeysJsonSchema(json_rules) {
  try {
    let k = JSON.parse(json_rules);
    return tv4.validate(k, schema); // nice implementation, now i just gotta implement the schema
  } catch (err) {
    return false;
  }
}

function showHelp() {
  window.location.replace("/help.html");
}
