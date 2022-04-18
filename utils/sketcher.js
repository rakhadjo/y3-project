const isColor = (strColor) => {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== "";
};

function genRandomColor() {
  return [floor(random(255)), floor(random(255)), floor(random(255))];
}

// generate random colors according to number of states
function colorBank(states, fireMode = false, colors_map = null) {
  if (colors_map) {
    if (Object.keys(colors_map).length == states) {
      let bank = [];
      for (let i = 0; i < states; i++) {
        if (isColor(colors_map[i])) {
          bank.push(colors_map[i]);
        } else {
          bank.push(genRandomColor());
        }
      }
      announceColors("custom user defined colors: " + bank);
      return bank;
    }
  }
  if (states == 2) {
    announceColors("Default Black & White");
    return [0, 255];
  } else if (fireMode && states > 2) {
    announceColors("Forest Fire Mode");
    // 0: burnt, 1: burnable, 2: burning
    return [
      [0, 0, 0],
      [32, 168, 5],
      [255, 0, 0],
    ];
    // can accept string colors, hex, or 3-RGB values. thats cool
    // return ["#DC143C", "#DC143C", "#DC143C"]
  }
  let bank = [];
  for (let i = 0; i < states; i++) {
    let rand_color = genRandomColor();
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
