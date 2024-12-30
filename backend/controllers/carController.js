import express from "express";
import multer from "multer";
import path from "path";
import Car from "../models/carModel.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("uploads", "cars")); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
    }
  },
});

// ROUTES

// GET /api/cars 
/**
 * @swagger
 * tags:
 *   - Cars
 * /api/cars:
 *   get:
 *     summary: Retrieve all cars
 *     responses:
 *       200:
 *         description: List of cars
 *       500:
 *         description: Failed to retrieve cars
 */
router.get("/", async (req, res) => {
  try {
    const cars = await Car.getAll();
    res.status(200).json(cars);
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});


// GET /api/cars/:id 
/**
 * @swagger
 * tags:
 *   - Cars
 * /api/cars/{id}:
 *   get:
 *     summary: Retrieve a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Car retrieved successfully
 *       404:
 *         description: Car not found
 */
router.get("/:id", async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await Car.getById(carId);
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(404).json({ error: "Car not found" });
    }
  } catch (err) {
    console.error("Error fetching car by ID:", err);
    res.status(500).json({ error: "Failed to fetch car" });
  }
});

// POST /api/cars 
/**
 * @swagger
 * tags:
 *   - Cars
 * /api/cars:
 *   post:
 *     summary: Create a new car
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Brand:
 *                 type: string
 *                 example: "Toyota"
 *               Model:
 *                 type: string
 *                 example: "Corolla"
 *               Type:
 *                 type: string
 *                 example: "Sedan"
 *               Year:
 *                 type: integer
 *                 example: 2020
 *               Mileage:
 *                 type: integer
 *                 example: 15000
 *               EngineSize:
 *                 type: number
 *                 format: float
 *                 example: 1.8
 *               FuelType:
 *                 type: string
 *                 example: "Petrol"
 *               Color:
 *                 type: string
 *                 example: "Red"
 *               Stock:
 *                 type: string
 *                 example: "In Stock"
 *               Transmission:
 *                 type: string
 *                 example: "Automatic"
 *               Doors:
 *                 type: integer
 *                 example: 4
 *               Status:
 *                 type: string
 *                 example: "Available"
 *               Price:
 *                 type: number
 *                 format: float
 *                 example: 20000.00
 *               Photo:
 *                 type: string
 *                 example: "url_to_photo.jpg"
 *     responses:
 *       201:
 *         description: Car created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const carData = req.body;
    if (req.file) {
      carData.photo = `/uploads/cars/${req.file.filename}`;
    }

    const success = await Car.create(carData);
    if (success) {
      res.status(201).json({ message: "Car created successfully" });
    } else {
      res.status(400).json({ error: "Failed to create car" });
    }
  } catch (err) {
    console.error("Error creating car:", err);
    res.status(500).json({ error: "Failed to create car" });
  }
});

// PATCH /api/cars/:id/status 
/**
 * @swagger
 * tags:
 *   - Cars
 * /api/cars/{id}/status:
 *   patch:
 *     summary: Update the status of a car
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Car status updated successfully
 *       404:
 *         description: Car not found or status update failed
 */
router.patch("/:id/status", async (req, res) => {
  const carId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    const success = await Car.updateStatus(carId, status);
    if (success) {
      res.status(200).json({ message: "Car status updated successfully" });
    } else {
      res.status(404).json({ error: "Car not found or status update failed" });
    }
  } catch (err) {
    console.error("Error updating car status:", err);
    res.status(500).json({ error: "Failed to update car status" });
  }
});

// PATCH /api/cars/:id 
/**
 * @swagger
 * tags:
 *   - Cars
 * /api/cars/{id}:
 *   patch:
 *     summary: Partially update a car
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Car attributes updated successfully
 *       404:
 *         description: Car not found or no changes made
 */
router.patch("/:id", async (req, res) => {
  const carId = parseInt(req.params.id, 10);
  const carData = req.body;

  if (!carId || isNaN(carId)) {
    return res.status(400).json({ error: "Invalid car ID" });
  }

  try {
    const success = await Car.updateCar(carId, carData);
    if (success) {
      res.status(200).json({ message: "Car attributes updated successfully" });
    } else {
      res.status(404).json({ error: "Car not found or no changes made" });
    }
  } catch (err) {
    console.error("Error updating car attributes:", err);
    res.status(500).json({ error: "Failed to update car attributes" });
  }
});

// DELETE /api/cars/:id 
/**
 * @swagger
 * tags:
 *   - Cars
 * /api/cars/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found or failed to delete
 */
router.delete("/:id", async (req, res) => {
  const carId = req.params.id;

  try {
    const success = await Car.delete(carId);
    if (success) {
      res.status(200).json({ message: "Car deleted successfully" });
    } else {
      res.status(404).json({ error: "Car not found or failed to delete" });
    }
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ error: "Failed to delete car" });
  }
});


// GET /api/cars/filters 
router.get("/filters", async (req, res) => {
  try {
    const filters = await Car.getFilters();
    res.status(200).json(filters);
  } catch (err) {
    console.error("Error fetching filters:", err);
    res.status(500).json({ error: "Failed to fetch filters" });
  }
});

// GET /api/cars/available
/**
 * @swagger
 * tags:
 *   - Cars
 * /api/cars/available:
 *   get:
 *     summary: Retrieve all available cars
 *     responses:
 *       200:
 *         description: List of available cars
 *       500:
 *         description: Failed to retrieve available cars
 */
router.get("/available", async (req, res) => {
  try {
    const availableCars = await Car.getAvailableCars();
    res.status(200).json(availableCars);
  } catch (err) {
    console.error("Error fetching available cars:", err);
    res.status(500).json({ error: "Failed to fetch available cars" });
  }
});



export default router;