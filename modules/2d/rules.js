let rulesets_ = {
  0: {
    nextState: (neighs) => {
      return neighs[1] == 3 ? 1 : 0;
    },
  },
  1: {
    nextState: (neighs) => {
      return (neighs[1] == 2 || neighs[1] == 3) ? 1 : 0;
    },
  },
};

/* neighs = 
{
  0: #dead cell,
  1: #weak_fire cell,
  2: #strong_fire_count,
  3: #weak_water_count,
  4: #strong_water_count
} */
let rulesets = {
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
    }
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
    }
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
    }
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
    }
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
    }
  },
}