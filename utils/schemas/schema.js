let cond_reqs = `{
  $schema: "https://json-schema.org/draft/2019-09/schema",
  name: "conditional_requirement",
  type: "object",
  properties: {
    type: {
      type: "string",
      enum: ["totalling", "total-p", "probability", "expression"],
    },
  },
  required: ["type"],
  if: {
    properties: { type: "" },
  },
}`;