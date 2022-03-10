function renderFormStates(states, formID) {
  let formElem = document.getElementById(formID);
  let inp = "";
  formElem.innerHTML = inp;
  for (let i = 0; i < states; i++) {
      console.log(`${colors[i]}`)
      let nxt = `<label style="color: rgb(${colors[i]})"> state ${i}</label>`
    inp += inp ? "</br>" + nxt : nxt;
  }
  formElem.innerHTML = inp;
}
