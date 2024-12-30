import express from "express";
import cors from "cors";
import connectToDB from "./config/dbConnection.js"; 
import carRoutes from "./controllers/carController.js";
import salesRoutes from "./controllers/saleController.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from './config/swaggerConfig.js';


const app = express();
const PORT = 5001;


const corsOptions = {
  origin: "http://localhost:3000", 
  methods: "GET,POST,PUT,PATCH,DELETE", 
};

const swaggerDocs = swaggerJsdoc(swaggerConfig);

app.use('/api-swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors(corsOptions));
app.use(express.json());

app.use("/uploads/cars", express.static("uploads/cars"));

connectToDB()
  .then(() => console.log("Connected to SQL Server!"))
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

app.get("/", (req,res) => {
  res.send("Backend is running!");
});

app.use("/api/cars", carRoutes);
app.use("/api/sales", salesRoutes); 
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));