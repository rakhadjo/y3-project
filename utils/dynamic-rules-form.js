function renderFormStates(states, formID) {
  let formElem = document.getElementById(formID);
  let inp = "";
  formElem.innerHTML = inp;
  for (let i = 0; i < states; i++) {
    console.log(`${colors[i]}`);
    let nxt = `<label style="color: rgb(${colors[i]})"> state ${i}</label>`;
    let inp_rad = `
    <br> 
    <label for="${i}_nextstate">Next State: 
    <input type="text" id="${i}_nextstate"> <br /> <br />
    <input checked value="totalling" type="radio" id="${i}_totalling" name="${i}_ruletype" onChange="handleTypeChange(this, ${i})"> 
    <label for=${i}_totalling>Totalling</label> 
    <input value="expression" type="radio" id="${i}_expression" name="${i}_ruletype" onChange="handleTypeChange(this, ${i})"> 
    <label for=${i}_expression>Espression</label>`;

    nxt += inp_rad;

    //nxt += getRuleInput("totalling", i, states)

    inp += inp ? "</br>" + nxt : nxt;
  }
  formElem.innerHTML = inp;
}

function getRuleInput(type, i, states) {
  let rtn = "";
  if (type == "totalling") {
    rtn += "<br/ ><label>select neighbour's state to measure</label><br/ >";
    // render existing types of neighbor states to determine
    for (let j = 0; j < states; j++) {
        let _txt = `
        <input value="${j}" type="radio" name="${j}_neigh"> 
        <label for=${j}_neigh>${j}</label>`
        rtn += _txt;
    }
    // text box to query how many there should be
    rtn += `
    <label for=${i}_>how many?</label>
    <input type="text" id="${i}_">`
  }
  return rtn;
}

function handleTypeChange(src, i) {
  //save all values
  //render the list again based on the saved file
  if (src.value == "totalling") {
  }
  return "";
}
