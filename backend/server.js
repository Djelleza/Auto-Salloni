const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
const PORT = 5000;

// JSON me të dhëna shembull
const cars = [
  { id: 1, brand: 'Toyota', model: 'Corolla', year: 2020, price: 20000 },
  { id: 2, brand: 'Honda', model: 'Civic', year: 2021, price: 22000 },
  { id: 3, brand: 'Ford', model: 'Focus', year: 2019, price: 18000 },
];

// Endpoint për të marrë të dhënat
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
