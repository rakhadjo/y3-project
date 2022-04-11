

import("../libraries/tv4");

function obeysJsonSchema(json_rules, schema_select = schema) {
    console.log(schema_select)
    try {
        let k = JSON.parse(json_rules);
        let v_results = tv4.validate(k, schema_select, false, false)
        alert("valuidator resdfsdfsults: " + v_results)
        return tv4.validate(k, schema_select);
    } catch(err) {
        console.log("custom error: " + err)
        return false
    }
}


// only one schema is there, so will only input rules
// return some feed back on rules validation if bad
function obeysJsonSchema2(json_rules, schema_select = schema) {
  try {
    let k = JSON.parse(json_rules);
    if (tv4.validate(k, schema_select)) {
        return true;
    } else {
        console.log("validator error: " + tv4.error.dataPath)
        return false;
    }
    return tv4.validate(k, schema_select); // nice implementation, now i just gotta implement the schema
  } catch (err) {
    console.log("err: " + err)
    return false;
  }
}