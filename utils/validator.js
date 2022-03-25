import("../libraries/tv4");

// only one schema is there, so will only input rules
// return some feed back on rules validation if bad
function obeysJsonSchema(json_rules) {
  try {
    let k = JSON.parse(json_rules);
    return tv4.validate(k, schema); // nice implementation, now i just gotta implement the schema
  } catch (err) {
    return false;
  }
}