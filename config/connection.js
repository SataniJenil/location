let mysql = require("mysql2/promise");
//this is local db that's why i don't crate rnv file
let con = {
  host: "localhost",
  user: "root",
  password: "123 Main Street, City, Country",
  database: "mysql",
};

const createConnection = mysql.createPool(con);

createConnection
  .getConnection()
  .then((connection) => {
    console.log("database connected successfully");
    connection.release();
  })
  .catch((error) => {
    console.log("database connection failed", error);
  });

module.exports = createConnection;
