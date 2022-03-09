let expt2 = {
  default: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
            conn: "+",
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
            conn: "+",
          },
        },
      ],
      satisfied: 4,
      else: {
        conditional_requirements: [
          {
            type: "expression",
            lhs: {
              neighbour_states: [3, 4],
              conn: "+",
            },
            cmp: "<",
            rhs: {
              neighbour_states: [1, 2],
              conn: "+",
            },
          },
        ],
        satisfied: 1,
        else: 2,
      },
    }
  },
  0: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
            conn: "+",
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
            conn: "+",
          },
        },
      ],
      satisfied: 3,
      else: {
        conditional_requirements: [
          {
            type: "expression",
            lhs: {
              neighbour_states: [3, 4],
              conn: "+",
            },
            cmp: "<",
            rhs: {
              neighbour_states: [1, 2],
              conn: "+",
            },
          },
        ],
        satisfied: 1,
        else: 2,
      },
    },
  },
  1: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
            conn: "+",
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
            conn: "+",
          },
        },
      ],
      satisfied: 0,
      else: {
        conditional_requirements: [
          {
            type: "expression",
            lhs: {
              neighbour_states: [3, 4],
              conn: "+",
            },
            cmp: "<",
            rhs: {
              neighbour_states: [1, 2],
              conn: "+",
            },
          },
        ],
        satisfied: 2,
        else: 3,
      },
    },
  },
  2: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
            conn: "+",
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
            conn: "+",
          },
        },
      ],
      satisfied: 1,
      else: {
        conditional_requirements: [
          {
            type: "expression",
            lhs: {
              neighbour_states: [3, 4],
              conn: "+",
            },
            cmp: "<",
            rhs: {
              neighbour_states: [1, 2],
              conn: "+",
            },
          },
        ],
        satisfied: 2,
        else: 3,
      },
    },
  },
  3: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
            conn: "+",
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
            conn: "+",
          },
        },
      ],
      satisfied: 0,
      else: {
        conditional_requirements: [
          {
            type: "expression",
            lhs: {
              neighbour_states: [3, 4],
              conn: "+",
            },
            cmp: "<",
            rhs: {
              neighbour_states: [1, 2],
              conn: "+",
            },
          },
        ],
        satisfied: 1,
        else: 2,
      },
    },
  },
  4: {
    next: {
      conditional_requirements: [
        {
          type: "expression",
          lhs: {
            neighbour_states: [3, 4],
            conn: "+",
          },
          cmp: ">",
          rhs: {
            neighbour_states: [1, 2],
            conn: "+",
          },
        },
      ],
      satisfied: 4,
      else: {
        conditional_requirements: [
          {
            type: "expression",
            lhs: {
              neighbour_states: [3, 4],
              conn: "+",
            },
            cmp: "<",
            rhs: {
              neighbour_states: [1, 2],
              conn: "+",
            },
          },
        ],
        satisfied: 1,
        else: 2,
      },
    },
  },
};
