module.exports = {
  port: process.env.PORT || 3000,
  mongoUrl: process.env.MONGOURL || "mongodb://localhost:27017/studentdb",
  frontendurl: process.env.FRONTENDURL || "http://localhost:4200",
};
