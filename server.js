const express = require('express');
require('dotenv').config();

const app = express();
const db = require('./config/db');

app.use(express.json());

const resourceRoutes = require('./routes/resource');
const bookingRoutes = require('./routes/booking');

app.use('/booking', bookingRoutes);
app.use('/resource', resourceRoutes);

app.get('/', (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});