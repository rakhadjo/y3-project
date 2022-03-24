let ajv = require("ajv");

// only one schema is there, so will only input rules
function obeysJsonSchema(json_rules) {
  return true;
}
