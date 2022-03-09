let conway_json = {
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
    1: {
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
      }
    }
  };