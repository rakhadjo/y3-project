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

function addTabListener() {
  document
    .getElementById("rules_textarea")
    .addEventListener("keydown", function (e) {
      if (e.key == "Tab") {
        e.preventDefault();
        let sel_start = this.selectionStart;
        let sel_end = this.selectionEnd;
        // set textarea value to: text before caret + tab + text after caret
        this.value =
          this.value.substring(0, sel_start) +
          "\t" +
          this.value.substring(sel_end);

        // put caret at right position again
        this.selectionStart = this.selectionEnd = sel_start + 1;
      }
    });
}

function onPresetRadioChange(src) {
  let x;
  if (src.value == "firesim") {
    x = JSON.stringify(firesim, null, "\t");
  } else if (src.value == "map_generation") {
    x = JSON.stringify(map_generation, null, "\t");
  } else {
    x = JSON.stringify(conway_default, null, "\t");
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
    custom_rules = conway_default;
  }
}

function showHelp() {
  window.location.replace("/help.html");
}
