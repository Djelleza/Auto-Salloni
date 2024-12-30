import express from "express";
import Sale from "../models/saleModel.js";

const router = express.Router();

// GET /api/sales
/**
 * @swagger
 * /api/sales:
 *   get:
 *     summary: Get all sales
 *     responses:
 *       200:
 *         description: A list of sales
 *       500:
 *         description: Failed to fetch sales
 */
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.getAll();
    res.status(200).json(sales);
  } catch (err) {
    console.error("Error fetching sales:", err);
    res.status(500).json({ error: "Failed to fetch sales" });
  }
});

// GET /api/sales/:id
/**
 * @swagger
 * /api/sales/{id}:
 *   get:
 *     summary: Get a sale by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sale to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A sale object
 *       404:
 *         description: Sale not found
 *       500:
 *         description: Failed to fetch sale
 */
router.get("/:id", async (req, res) => {
  const saleId = req.params.id;

  try {
    const sale = await Sale.getById(saleId);
    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ error: "Sale not found" });
    }
  } catch (err) {
    console.error("Error fetching sale by ID:", err);
    res.status(500).json({ error: "Failed to fetch sale" });
  }
});

// POST /api/sales
/**
 * @swagger
 * /api/sales:
 *   post:
 *     summary: Create a new sale
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carId:
 *                 type: integer
 *               salePrice:
 *                 type: number
 *                 format: float
 *               saleDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Sale created successfully
 *       400:
 *         description: Failed to create sale
 *       500:
 *         description: Failed to create sale
 */
router.post("/", async (req, res) => {
    try {
      console.log('Received sale data:', req.body); 
      const saleData = req.body;
      const success = await Sale.create(saleData);
      if (success) {
        res.status(201).json({ message: "Sale created successfully" });
      } else {
        res.status(400).json({ error: "Failed to create sale" });
      }
    } catch (err) {
      console.error("Error creating sale:", err);
      res.status(500).json({ error: "Failed to create sale" });
    }
  });
  
  
  

// PATCH /api/sales/:id
/**
 * @swagger
 * /api/sales/{id}:
 *   patch:
 *     summary: Update a sale by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sale to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               salePrice:
 *                 type: number
 *                 format: float
 *               saleDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Sale details updated successfully
 *       400:
 *         description: Invalid sale ID
 *       404:
 *         description: Sale not found or no changes made
 *       500:
 *         description: Failed to update sale details
 */
router.patch("/:id", async (req, res) => {
  const saleId = parseInt(req.params.id, 10);
  const saleData = req.body;

  if (!saleId || isNaN(saleId)) {
    return res.status(400).json({ error: "Invalid sale ID" });
  }

  try {
    const success = await Sale.updateSale(saleId, saleData);
    if (success) {
      res.status(200).json({ message: "Sale details updated successfully" });
    } else {
      res.status(404).json({ error: "Sale not found or no changes made" });
    }
  } catch (err) {
    console.error("Error updating sale details:", err);
    res.status(500).json({ error: "Failed to update sale details" });
  }
});

// DELETE /api/sales/:id
/**
 * @swagger
 * /api/sales/{id}:
 *   delete:
 *     summary: Delete a sale by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the sale to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale deleted successfully
 *       404:
 *         description: Sale not found or failed to delete
 *       500:
 *         description: Failed to delete sale
 */
router.delete("/:id", async (req, res) => {
  const saleId = req.params.id;

  try {
    const success = await Sale.delete(saleId);
    if (success) {
      res.status(200).json({ message: "Sale deleted successfully" });
    } else {
      res.status(404).json({ error: "Sale not found or failed to delete" });
    }
  } catch (err) {
    console.error("Error deleting sale:", err);
    res.status(500).json({ error: "Failed to delete sale" });
  }
});

export default router;
