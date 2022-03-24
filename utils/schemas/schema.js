let schema_state = {
  name: "state",
  type: "object",
  properties: {
    next: {
      type: "object",
    },
  },
};

let schema_next = {
  name: "next",
  type: "object",
  properties: {
    conditional_requirements: {
      type: "array",
      items: "",
    },
    satisfied: {
      type: "boolean",
    },
    else: {
      type: "boolean",
    },
  },
};

let schema_cond_reqs = {
  name: "conditional_requirement",
  type: "object",
  properties: {
    type: {
      enum: ["totalling", "total-p", "probability", "expression"],
    },
  },
  required: ["type"],
  additionalproperties: true,
};

let schema = {
  type: "object",
};
