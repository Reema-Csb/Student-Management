const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "22062004", // your password
  port: 5432,
});

module.exports = pool;