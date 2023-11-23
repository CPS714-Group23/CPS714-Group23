
const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/:patientId', async (req, res) => {
  const { patientId } = req.params;

  try {
    const result = await db.query('SELECT * FROM patientmedication WHERE patient_id = $1', [patientId]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching medication data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;