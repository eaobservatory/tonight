import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: "@/../env" });

// omp database connection
export const poolOMP = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.STAFF_USERNAME,
  password: process.env.STAFF_PASSWORD,
  database: "omp",
  timezone: "Z",
});

// jcmt database connection
export const poolJCMT = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.STAFF_USERNAME,
  password: process.env.STAFF_PASSWORD,
  database: "jcmt",
  timezone: "Z",
});
