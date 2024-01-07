let getStudentData = require("../service/studentService");
let _ = require("lodash");

async function getByFilter(req, res) {
  try {
    let filter = req.query;
    if (
      filter.hasOwnProperty("name") ||
      filter.hasOwnProperty("city") ||
      filter.hasOwnProperty("CGPA") ||
      filter.hasOwnProperty("college") ||
      filter.hasOwnProperty("branch") ||
      filter.hasOwnProperty("pageNumber") ||
      filter.hasOwnProperty("pageSize") ||
      _.isEmpty(filter)
    ) {
      let result = await getStudentData(filter);
      return res.status(result.status).send(result.data);
    } else {
      return res.status(400).send({ msg: "Invalid search criteria" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = getByFilter;
