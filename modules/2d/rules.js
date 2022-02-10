/* neighs = 
{
  0: #dead cell,
  1: #weak_fire cell,
  2: #strong_fire_count,
  3: #weak_water_count,
  4: #strong_water_count

  preprocess
  get metrics to compare
  gridification of the animation(?)

  make editing the rules really user friendly
  think about evaluation

} */

function parse_rules (json_specs) {
  var parsed = JSON.parse(json_specs);
  for (var key in parsed) {
    
  }
}

const cgol_rules = (neighs, cur_state) => {
  if (cur_state) {
    return neighs[1] == 2 || neighs[1] == 3 ? 1 : 0;
  }
  return neighs[1] == 3 ? 1 : 0;
};

const fire_1 = (neighs, cur_state) => {
  switch (cur_state) {
    case 0:
      // use switches instead of if + ternary!!
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 3;
      }
      return neighs[3] + neighs[4] < neighs[1] + neighs[2] ? 1 : 2;
    case 1:
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 0;
      }
      return neighs[3] + neighs[4] < neighs[1] + neighs[2] ? 2 : 3;
    case 2:
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 1;
      }
      return neighs[3] + neighs[4] < neighs[1] + neighs[2] ? 2 : 3;
    case 3:
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 0;
      }
      return neighs[3] + neighs[4] < neighs[1] + neighs[2] ? 1 : 2;
    default:
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 4;
      }
      return neighs[3] + neighs[4] < neighs[1] + neighs[2] ? 1 : 2;
  }
};

/* neighs = 
{
  0: #dead cell,
  1: #weak_fire cell,
  2: #strong_fire_count,
  3: #weak_water_count,
  4: #strong_water_count
} */
let rulesets_fire_1 = {
  // Dead
  0: {
    nextState: (neighs) => {
      // more water than fire
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 3;
        // more fire than water
      } else if (neighs[3] + neighs[4] < neighs[1] + neighs[2]) {
        return 1;
        // equal amt of both
      } else {
        return 3;
      }
    },
  },
  // R1 -> weak fire
  1: {
    nextState: (neighs) => {
      // more water than fire
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 0;
        // more fire than water
      } else if (neighs[3] + neighs[4] < neighs[1] + neighs[2]) {
        return 2;
        // equal amt of both
      } else {
        return 3;
      }
    },
  },
  // R2 -> strong fire
  2: {
    nextState: (neighs) => {
      // more water than fire
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 1;
        // more fire than water
      } else if (neighs[3] + neighs[4] < neighs[1] + neighs[2]) {
        return 2;
        // equal amt of both
      } else {
        return 2;
      }
    },
  },
  // B1 -> weak water
  3: {
    nextState: (neighs) => {
      // more water than fire
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 0;
        // more fire than water
      } else if (neighs[3] + neighs[4] < neighs[1] + neighs[2]) {
        return 0;
        // equal amt of both
      } else {
        return 1;
      }
    },
  },
  // B2 -> strong water
  4: {
    nextState: (neighs) => {
      // more water than fire
      if (neighs[3] + neighs[4] > neighs[1] + neighs[2]) {
        return 4;
        // more fire than water
      } else if (neighs[3] + neighs[4] < neighs[1] + neighs[2]) {
        return 1;
        // equal amt of both
      } else {
        return 4;
      }
    },
  },
};
