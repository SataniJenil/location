const createConnection = require("../config/connection");

let createLocationTable = async () => {
  try {
    const queryName = `
        CREATE TABLE IF NOT EXISTS locationDb(
         id SERIAL PRIMARY KEY,   
         name VARCHAR(255) NOT NULL,   
         address VARCHAR(255),   
         latitude DOUBLE PRECISION NOT NULL,
         longitude DOUBLE PRECISION NOT NULL,
          isActive  BOOLEAN DEFAULT true,
          isDeleted  BOOLEAN DEFAULT false
        )
        `;
    const connection = await createConnection.getConnection();
    await connection.query(queryName);
    connection.release();
    console.log("table is created");
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
module.exports = createLocationTable;
