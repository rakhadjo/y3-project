

import("../libraries/tv4");

function obeysJsonSchema(json_rules, schema_select = schema) {
    console.log(schema_select)
    try {
        let k = JSON.parse(json_rules);
        let v_results = tv4.validate(k, schema_select)
        let output = `validator results: ${v_results} \n ${tv4.error}`
        if (tv4.error && tv4.error.dataPath) {
            output += `\n ${tv4.error} at: ${tv4.error.dataPath}`
        }
        alert(output)
        return v_results;
    } catch(err) {
        console.log("custom error: " + err)
        return false
    }
}


// only one schema is there, so will only input rules
// return some feed back on rules validation if bad
