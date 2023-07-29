const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const mysqlOMPConnection = mysql.createConnection({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.STAFF_USERNAME,
  password: process.env.STAFF_PASSWORD,
  database: "omp",
});

mysqlOMPConnection.connect((err) => {
  if (err) {
    console.error("An error occurred while connecting to the MySQL DB");
    throw err;
  }
  console.log("Connected to MySQL!");
});

const queryOMP = util
  .promisify(mysqlOMPConnection.query)
  .bind(mysqlOMPConnection);

module.exports = {
  queryOMP,
};
