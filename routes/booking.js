const express = require('express');
const router = express.Router();
const db = require('../config/db');


// ✅ GET all bookings with resource info (JOIN)
router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT 
        b.id,
        b.resource_id,
        r.name AS resource_name,
        r.type AS resource_type,
        b.requested_by,
        b.booking_date,
        b.status
      FROM bookings b
      JOIN resources r ON b.resource_id = r.id
      ORDER BY b.booking_date DESC
    `;

    const [rows] = await db.query(sql);
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ✅ CREATE booking
router.post('/', async (req, res) => {
  try {
    const { resource_id, requested_by, booking_date, status } = req.body;

    const sql = `
      INSERT INTO bookings (resource_id, requested_by, booking_date, status)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      resource_id,
      requested_by,
      booking_date,
      status || 'Confirmed'
    ]);

    res.json({
      message: "Booking created",
      id: result.insertId
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ✅ GET bookings by resource
router.get('/resource/:id', async (req, res) => {
  try {
    const sql = `
      SELECT * FROM bookings 
      WHERE resource_id = ?
      ORDER BY booking_date ASC
    `;

    const [rows] = await db.query(sql, [req.params.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ✅ DELETE booking
router.delete('/:id', async (req, res) => {
  try {
    const sql = `DELETE FROM bookings WHERE id = ?`;

    const [result] = await db.query(sql, [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;