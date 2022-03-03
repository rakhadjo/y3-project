let pause = true;
let elements;
let span;
let resolution = 10;
let rule;

let state;
let next_state;

function random(elements) {
  let arr = new Array(elements);
  for (let i = 0; i < elements; i++) {
    arr[i] = floor(random(2));
  }
  return arr;
}

function setup() {
  createCanvas(600, 400);
  background(0);
  span = width / resolution;
  state = random(10);
  step();
}

function draw() {
  if (!pause) {
    
    next_state = new Array(elements);
    
    state = next_state;
    

  }


}

function step() {
  pause = false;
  draw();
  pause = true;
}
