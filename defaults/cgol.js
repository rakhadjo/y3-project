let conway_default = {
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
