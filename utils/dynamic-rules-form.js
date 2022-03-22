function renderFormStates(states, formID, type = "totalling") {
  let formElem = document.getElementById(formID);
  let inp = "";
  formElem.innerHTML = inp;
  for (let i = 0; i < states; i++) {
    inp += generateIndividualClauses(i, type, states);
  }
  formElem.innerHTML = inp;
}

function renderFormStatesFromActiveRules(json_rules, formID) {
  let formElemt = document.getElementById(formID);
  let formInput = `
  <br />
  <label for="rules_textarea">Rules:</label> <br />
  <textarea id="rules_textarea" name="rules_textarea" rows="25" cols="80">
    ${json_rules}
  </textarea>
  <br><br>
  <input type="submit" value="Apply Rules">`;
  formElemt.innerHTML = formInput;
}

function generateIndividualClauses(i, type, states) {
  console.log(`${colors[i]}`);
  let nxt = `<label style="color: rgb(${colors[i]})"> state ${i}</label>`;
  let inp_rad = `
    <br> 
    <input checked value="totalling" type="radio" id="${i}_totalling" name="${i}_ruletype" onChange="handleTypeChange(this, ${i})"> 
    <label for=${i}_totalling>Totalling</label> 
    <input value="expression" type="radio" id="${i}_expression" name="${i}_ruletype" onChange="handleTypeChange(this, ${i})"> 
    <label for=${i}_expression>Expression</label> <br />
    <label for="${i}_nextstate">Next State: 
    <input type="text" id="${i}_nextstate"> <br /> <br />
    `;
  nxt += inp_rad;
  nxt += getRuleInput(type, i, states);
  return nxt;
}

function getRuleInput(type, i, states) {
  let rtn = "";
  if (type == "totalling") {
    rtn += "<label>select neighbour's state to measure</label><br/ >";
    // render existing types of neighbor states to determine
    for (let j = 0; j < states; j++) {
      let _txt = `
        <input value="${j}" type="radio" name="${j}_neigh"> 
        <label for=${j}_neigh>${j}</label>`;
      rtn += _txt;
    }
    // text box to query how many there should be
    rtn += `
    <label for=${i}_>how many?</label>
    <input type="text" id="${i}_">`;
  } else if (type == "expression") {
  } else if (type == "total-p") {
  }
  return rtn;
}

function handleTypeChange(src, i) {
  //save all values
  //render the list again based on the saved file
  console.log("id: " + i);
  console.log("value: " + src.value);
}
