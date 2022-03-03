let expt = {
  0: {
    // figure out how to do lhs, comp, and rhs
    nextstate: {
      required: {
        1: {
          lhs: {
            type: "states",
            states: [3, 4],
          },
          cmp: ">",
          rhs: {
            type: "states",
            states: [1, 2],
          },
          conn: "AND",
        },
      },
      satisfied: 3,
      else: {
        lhs: {
          type: "states",
          states: [3, 4],
        },
        cmp: "<",
        rhs: {
          type: "states",
          states: [1, 2],
        },
        conn: "AND",
      },
      satisfied_2: 1,
      else_2: 2
    },
  },
  1: {
    // figure out how to do lhs, comp, and rhs
    nextstate: {
      required: {
        1: {
          lhs: {
            type: "states",
            states: [3, 4],
          },
          cmp: ">",
          rhs: {
            type: "states",
            states: [1, 2],
          },
          conn: "AND",
        },
      },
      satisfied: 3,
      else: 1,
    },
  },
};
