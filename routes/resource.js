const express = require('express');
const router = express.Router();
const db = require('../config/db');


// ✅ GET all resources
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM resources");
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ✅ POST (create resource)
router.post('/', async (req, res) => {
  try {
    const { name, type, capacity } = req.body;

    const [result] = await db.query(
      "INSERT INTO resources (name, type, capacity) VALUES (?, ?, ?)",
      [name, type, capacity]
    );

    res.json({ message: "Resource added", id: result.insertId });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ✅ PUT (update resource)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, capacity } = req.body;

    await db.query(
      "UPDATE resources SET name=?, type=?, capacity=? WHERE id=?",
      [name, type, capacity, id]
    );

    res.json({ message: "Resource updated" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// ✅ DELETE resource
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM resources WHERE id=?", [id]);

    res.json({ message: "Resource deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;