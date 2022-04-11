let schema = {
  type: "object",
  properties: {
    $_meta: {
      type: "object",
    },
  },
  patternProperties: {
    "^.*$": {
      $ref: "#/$defs/state",
    },
  },
  $defs: {
    state: {
      type: "object",
      additionalProperties: false,
      properties: {
        next: {
          type: "object",
          properties: {
            conditional_requirements: { $ref: "#/$defs/reqs_list" },
            satisfied: { type: "integer" },
            else: { type: "integer" },
          },
          required: ["conditional_requirements", "satisfied", "else"],
        },
      },
    },
    reqs_list: {
      type: "array",
      items: [{ $ref: "#/$defs/reqs" }],
    },
    reqs: {
      additionalProperties: true,
      type: "object",
      properties: {
        type: {
          enum: ["totalling", "total-p", "expression", "probability"],
        },
        neighbour_state: {
          type: "integer",
        },
        total: {
          type: "array",
          items: [{ type: "integer" }],
        },
      },
      allOf: [
        {
          if: {
            required: ["type"],
            properties: {
              type: {
                const: "totalling",
              },
            },
          },
          then: {
            required: ["neighbour_state", "total"],
            properties: {
              neighbour_state: { type: "integer" },
              total: {
                type: "array",
                items: [
                  {
                    type: "integer",
                  },
                ],
              },
            },
          },
        },
        {
          if: {
            properties: {
              type: {
                const: "total-p",
              },
            },
            required: ["type"],
          },
          then: {
            required: ["neighbour_state", "p", "total"],
            properties: {
              neighbour_state: { type: "integer" },
              p: { type: "number" },
              total: {
                type: "array",
                items: [
                  {
                    type: "integer",
                  },
                ],
              },
            },
          },
        },
        {
          if: {
            properties: {
              type: {
                const: "expression",
              },
            },
            required: ["type"],
          },
          then: {
            required: ["lhs", "rhs", "cmp"],
            properties: {
              lhs: {
                type: "object",
                properties: {
                  neighbour_states: {
                    type: "array",
                    items: [{ type: "integer" }],
                  },
                },
              },
              rhs: {
                type: "object",
                properties: {
                  neighbour_states: {
                    type: "array",
                    items: [{ type: "integer" }],
                  },
                },
              },
              cmp: {
                enum: ["<", ">", "="],
              },
            },
          },
        },
        {
          if: {
            properties: {
              type: {
                const: "probability",
              },
            },
            required: ["type"],
          },
          then: {
            required: ["p"],
            properties: {
              p: { type: "number" },
            },
          },
        },
      ],
    },
  },
}
;
