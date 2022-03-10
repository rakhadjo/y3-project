let expt2 = {
  // addition: add meta information e.g. states numbers and colors 
  
  default: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
          },
        },
      ],
      satisfied: 4,
      else: 2,
    },
  },
  0: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
          },
        },
      ],
      satisfied: 3,
      else: 1,
    },
  },
};
