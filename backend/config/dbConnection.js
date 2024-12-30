import sql from "mssql";
import dbConfig from "./dbConfig.js";

async function connectToDB() {
  try {
    const pool = await sql.connect(dbConfig);
    console.log('Connected to SQL Server!');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}




export default connectToDB;
