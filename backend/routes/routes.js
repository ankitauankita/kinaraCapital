let express = require("express");
let router = express.Router();
let getByFilter = require("../controller/studentController.js");

router.get("/getStudentByFilter", getByFilter);

module.exports = router;
