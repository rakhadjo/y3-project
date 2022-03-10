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
