// forest fire simulation!

/**
 * 1. a cell that cannot be burned stays the same
 * 2. a cell that is burning down at present time will be completely burned in the next step
 * 3. a burned cell cannot burn again
 * 4. if a cell is burning down at the present time and there are next-nearest neigbor cells containing fuel, the fire can propagae to its neighbors with probability p_burn
 */

/**
 * 0: burnt or unable to burn
 * 1: burning down
 * 2: burnable
 */

let firesim = {
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
  2: {
    next: {
      conditional_requirements: [
        {
          type: "totalling",
          neighbour_state: 1,
          total: [1, 2, 3, 4, 5, 6, 7, 8],
        },
        {
          type: "probability",
          p: 0.8,
        },
      ],
      satisfied: 1,
      else: 2,
    },
  },
};
