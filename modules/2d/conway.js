let exp = {
  0: {
    // figure out how to do lhs, comp, and rhs
    nextstate: {
      required: {
        0: {
          lhs: {
            type: "states",
            states: [1],
          },
          cmp: "in",
          rhs: {
            type: "values",
            vals: [3],
          },
          conn: "AND",
        },
      },
      satisfied: 1,
      else: 1,
    },
  },
  1: {
    nextstate: {
      required: {
        0: {
          lhs: {
            type: "states",
            states: [1],
          },
          cmp: "in",
          rhs: {
            type: "values",
            vals: [2, 3],
          },
        },
      },
      satisfied: 1,
      else: 1,
    },
  },
};
