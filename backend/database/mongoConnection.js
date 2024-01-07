let MongoClient = require("mongodb").MongoClient;
let constants = require("../constants/constants");
let connectionUrl = constants.mongoUrl;
let _ = require("lodash");
let client = new MongoClient(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createConnection() {
  try {
    await client.connect();
    let db = client.db();
    return db.collection("students");
  } catch (error) {
    console.error("Error connecting to Mongo DB", error);
  }
}

async function getFilterData(filters) {
  try {
    let query = {};
    let db = await createConnection();

    if (!_.isEmpty(filters)) {
      if (filters.hasOwnProperty("name")) {
        query["name"] = { $regex: filters.name, $options: "i" };
      }
      if (filters.hasOwnProperty("city")) {
        query["city"] = { $regex: filters.city, $options: "i" };
      }
      if (filters.hasOwnProperty("CGPA")) {
        query["CGPA"] = { $gte: Number(filters.CGPA) };
      }
      if (filters.hasOwnProperty("college")) {
        query["college"] = { $regex: filters.college, $options: "i" };
      }
      if (filters.hasOwnProperty("branch")) {
        query["branch"] = { $regex: filters.branch, $options: "i" };
      }
      console.log(query);
    }

    let pageNumber =
      filters["pageNumber"] != undefined ? Number(filters["pageNumber"]) : 1;
    let pageSize =
      filters["pageSize"] != undefined ? Number(filters["pageSize"]) : 10;

    let pageToSkip = (pageNumber - 1) * pageSize;

    let result = await db
      .find(query)
      .skip(pageToSkip)
      .limit(pageSize)
      .toArray();

    return result;
  } catch (error) {
    console.log("Error fetching records: " + error);
    throw new Error({ status: 500, message: "Something went wrong" });
  }
}

module.exports = getFilterData;
