let getFilterData = require("../database/mongoConnection");
let _ = require("lodash");

async function getStudentData(data) {
  try {
    let result = await getFilterData(data);
    let response = {};
    if (!_.isEmpty(result)) {
      (response.status = 200), (response.data = result);
    } else {
      (response.status = 400), (response.data = "No Records Found");
    }
    return response;
  } catch (error) {
    throw error;
  }
}

module.exports = getStudentData;
