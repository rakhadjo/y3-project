let map_generation = {
    $_meta: {},
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
  