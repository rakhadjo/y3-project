// forest fire simulation!

/**
 * 1. a cell that cannot be burned stays the same
 * 2. a cell that is burning down at present time will be completely burned in the next step
 * 3. a burned cell cannot burn again
 * 4. if a cell is burning down at the present time and there are next-nearest neigbor cells containing fuel, the fire can propagae to its neighbors with probability p_burn
 */

/**
 * 0: burnt or unable to burn
 * 1: burnable
 * 2: burning down
 */

let firesim = {
  $_meta: {
    num_states: 3,
    colors: {
      0: "black",
      1: "green",
      2: "red"
    }
  },
  default: {
    next: {
      conditional_requirements: [
        {
          type: "probability",
          p: 1,
        },
      ],
      satisfied: 0,
      else: 0,
    },
  },
  1: {
    next: {
      conditional_requirements: [
        {
          type: "total-p",
          neighbour_state: 2,
          total: [1, 2, 3, 4],
          p: 1,
        },
        {
          type: "total-p",
          neighbour_state: 2,
          total: [5, 6, 7, 8],
          p: 0.8,
        },
      ],
      satisfied: 2,
      else: 1,
    },
  },
};
