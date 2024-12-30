import connectToDB from "../config/dbConnection.js";
import sql from "mssql"; 

const Sale = {
  
  executeQuery: async (query, inputs = []) => {
    try {
      const pool = await connectToDB();
      const request = pool.request();

      inputs.forEach(({ name, type, value }) => {
        request.input(name, type, value);
      });

      const result = await request.query(query);
      return result;
    } catch (err) {
      console.error("Database query error:", err);
      throw err;
    }
  },

  // Get all sales
  getAll: async () => {
    const query = "SELECT * FROM Sales";
    const result = await Sale.executeQuery(query);
    return result.recordset;
  },

  // Get sale by id
  getById: async (id) => {
    const query = "SELECT * FROM Sales WHERE Id = @Id";
    const inputs = [{ name: "Id", type: sql.Int, value: id }];

    const result = await Sale.executeQuery(query, inputs);
    return result.recordset[0] || null;
  },

  // Create sale
create: async (sale) => {
    
    const requiredFields = [
      "carId",
      "saleDate",
      "salePrice",
      "customerName",
      "customerEmail",
    ];
  
    for (const field of requiredFields) {
      if (!sale[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
  
   
    const query = `INSERT INTO Sales 
      (CarId, SaleDate, SalePrice, CustomerName, CustomerEmail)
      VALUES 
      (@CarId, @SaleDate, @SalePrice, @CustomerName, @CustomerEmail)`;
  

    const inputs = Object.keys(sale).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      type:
        key === "carId" || key === "salePrice" ? sql.Int : sql.NVarChar, 
      value: sale[key],
    }));
  
    
    const result = await Sale.executeQuery(query, inputs);    
    return result.rowsAffected[0] > 0;
  },
  
  // Update sale 
  updateSale: async (id, saleData) => {
    const fields = Object.keys(saleData)
      .map((key) => `${key} = @${key}`)
      .join(", ");

    const query = `UPDATE Sales SET ${fields} WHERE Id = @Id`;

    const inputs = Object.keys(saleData).map((key) => ({
      name: key,
      type: typeof saleData[key] === "number" ? sql.Int : sql.NVarChar,
      value: saleData[key],
    }));
    inputs.push({ name: "Id", type: sql.Int, value: id });

    const result = await Sale.executeQuery(query, inputs);
    return result.rowsAffected[0] > 0;
  },

  // Delete a sale
  delete: async (id) => {
    const query = "DELETE FROM Sales WHERE Id = @Id";
    const inputs = [{ name: "Id", type: sql.Int, value: id }];

    const result = await Sale.executeQuery(query, inputs);
    return result.rowsAffected[0] > 0;
  },
};

export default Sale;
