// generate random colors according to number of states
function colorBank(states) {
  if (states == 2) {
    announceColors("Default Black & White");
    return [0, 255];
  }
  let bank = [];
  for (let i = 0; i < states; i++) {
    let rand_color = [
      floor(random(255)),
      floor(random(255)),
      floor(random(255)),
    ];
    while (bank.includes(rand_color)) {
      rand_color = [floor(random(255)), floor(random(255)), floor(random(255))];
    }
    bank.push(rand_color);
  }
  let output = "Colors: [";
  bank.forEach((color) => {
    output += `(${color[0]}, ${color[1]} , ${color[0]})`;
  });
  announceColors(output + "]");
  return bank;
}

function step() {
  pause = false;
  draw();
  console.log("");
  pause = true;
}