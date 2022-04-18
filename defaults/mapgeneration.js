let map_generation = {
    $_meta: {
      num_states: 2,
      colors: {
        0: "blue",
        1: "green"
      }
    },
    default: {
      next: {
        conditional_requirements: [
          {
            type: "totalling",
            neighbour_state: 1,
            total: [1, 2, 3, 4],
          },
        ],
        satisfied: 0,
        else: 1,
      },
    },
  };
  