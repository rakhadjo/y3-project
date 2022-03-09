let exp3_woo = {
  0: {
    next: {
      conditional_requirements: [
        {
          type: "totalling",
          neighbour_state: 1,
          total: [3],
        },
      ],
      satisfied: 1,
      else: 0,
    },
  },
  default: {
    next: {
      conditional_requirements: [
        {
          type: "totalling",
          neighbour_state: 1,
          total: [2, 3],
        },
      ],
      satisfied: 1,
      else: 0,
    },
  },
};

let exp3_w2oo = {
  1: {
    next: {
      conditional_requirements: [
        {
          type: "totalling",
          neighbour_state: 0,
          total: [3],
        },
      ],
      satisfied: 0,
      else: 1,
    },
  },
  0: {
    next: {
      conditional_requirements: [
        {
          type: "totalling",
          neighbour_state: 0,
          total: [2, 3],
        },
      ],
      satisfied: 0,
      else: 1,
    },
  },
};