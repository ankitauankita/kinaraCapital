let express = require("express");
let app = express();
let routes = require("./routes/routes.js");
let constants = require("./constants/constants.js");
port = constants.port;
const cors = require("cors");

app.use(cors({ origin: constants.frontendurl }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
