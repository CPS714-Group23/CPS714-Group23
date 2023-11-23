const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const patientResult = await db.query('SELECT patient_id FROM patient WHERE user_id = $1', [userId]);

    if (patientResult.rows.length === 0) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patientId = patientResult.rows[0].patient_id;

    const medicationResult = await db.query('SELECT * FROM patientmedication WHERE patient_id = $1', [patientId]);
    
    res.json(medicationResult.rows);
  } catch (error) {
    console.error('Error fetching medication data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;