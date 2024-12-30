import connectToDB from "../config/dbConnection.js";
import sql from "mssql"; 

const Car = {
  
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

  // Get all cars
  getAll: async () => {
    const query = "SELECT * FROM Cars";
    const result = await Car.executeQuery(query);
    return result.recordset;
  },

  // Get car by id
  getById: async (id) => {
    const query = "SELECT * FROM Cars WHERE Id = @Id";
    const inputs = [{ name: "Id", type: sql.Int, value: id }];

    const result = await Car.executeQuery(query, inputs);
    return result.recordset[0] || null;
  },

  // Create a car
  create: async (car) => {
    const requiredFields = [
      "brand",
      "model",
      "type",
      "year",
      "mileage",
      "engineSize",
      "fuelType",
      "color",
      "stock",
      "transmission",
      "doors",
      "status",
      "price",
      "photo",
    ];

    for (const field of requiredFields) {
      if (!car[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    const query = `INSERT INTO Cars 
      (Brand, Model, Type, Year, Mileage, EngineSize, FuelType, Color, Stock, Transmission, Doors, Status, Price, Photo)
      VALUES 
      (@Brand, @Model, @Type, @Year, @Mileage, @EngineSize, @FuelType, @Color, @Stock, @Transmission, @Doors, @Status, @Price, @Photo)`;

    const inputs = Object.keys(car).map((key) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      type:
        key === "year" || key === "mileage" || key === "doors"
          ? sql.Int
          : key === "engineSize" || key === "price"
          ? sql.Decimal(10, 2)
          : sql.NVarChar,
      value: car[key],
    }));

    const result = await Car.executeQuery(query, inputs);
    return result.rowsAffected[0] > 0;
  },

  // Update car status
  updateStatus: async (id, status) => {
    const query = `UPDATE Cars SET Status = @Status WHERE Id = @Id`;
    const inputs = [
      { name: "Status", type: sql.NVarChar, value: status },
      { name: "Id", type: sql.Int, value: id },
    ];

    const result = await Car.executeQuery(query, inputs);
    return result.rowsAffected[0] > 0;
  },

  // Update car attributes
  updateCar: async (id, carData) => {
    const fields = Object.keys(carData)
      .map((key) => `${key} = @${key}`)
      .join(", ");

    const query = `UPDATE Cars SET ${fields} WHERE Id = @Id`;

    const inputs = Object.keys(carData).map((key) => ({
      name: key,
      type: typeof carData[key] === "number" ? sql.Int : sql.NVarChar,
      value: carData[key],
    }));
    inputs.push({ name: "Id", type: sql.Int, value: id });

    const result = await Car.executeQuery(query, inputs);
    return result.rowsAffected[0] > 0;
  },

  // Delete a car
  delete: async (id) => {
    const query = "DELETE FROM Cars WHERE Id = @Id";
    const inputs = [{ name: "Id", type: sql.Int, value: id }];

    const result = await Car.executeQuery(query, inputs);
    return result.rowsAffected[0] > 0;
  },

  // Filters
  getFilters: async () => {
    const query = `
      SELECT DISTINCT Brand FROM Cars;
      SELECT DISTINCT FuelType FROM Cars;
      SELECT DISTINCT Transmission FROM Cars;
      SELECT DISTINCT Color FROM Cars;`;

    const result = await Car.executeQuery(query);
    return {
      brands: result.recordsets[0],
      fuelTypes: result.recordsets[1],
      transmissions: result.recordsets[2],
      colors: result.recordsets[3],
    };
  },

  // get available cars
getAvailableCars: async () => {
  const query = "SELECT * FROM Cars WHERE Status = 'Available'";
  const result = await Car.executeQuery(query);
  return result.recordset;
},

};

export default Car;