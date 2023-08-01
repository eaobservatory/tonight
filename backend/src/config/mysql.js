const mysql = require("mysql");
const dotenv = require("dotenv");
const util = require("util");

dotenv.config({ path: "../.env" });

// omp database connection
const mysqlOMPConnection = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.STAFF_USERNAME,
  password: process.env.STAFF_PASSWORD,
  database: "omp",
  timezone: "Z",
});

mysqlOMPConnection.connect((err) => {
  if (err) {
    console.error("An error occurred while connecting to the OMP database");
    throw err;
  }
  console.log("Connected to the OMP database!");
});

const queryOMP = util
  .promisify(mysqlOMPConnection.query)
  .bind(mysqlOMPConnection);

// jcmt database connection
const mysqlJCMTConnection = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.STAFF_USERNAME,
  password: process.env.STAFF_PASSWORD,
  database: "jcmt",
  timezone: "Z",
});

mysqlJCMTConnection.connect((err) => {
  if (err) {
    console.error("An error occurred while connecting to the JCMT database");
    throw err;
  }
  console.log("Connected to the JCMT database!");
});

const queryJCMT = util
  .promisify(mysqlJCMTConnection.query)
  .bind(mysqlJCMTConnection);

module.exports = {
  queryOMP,
  queryJCMT,
};
