const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/events', async (req, res) => {
  try {
    const queryResult = await db.query('SELECT * FROM patientmedication'); // Adjust the query based on user id
    res.json(queryResult.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
});

router.post('/add', async (req, res) => {
  try {
    const eventData = req.body;
    const insertQuery = `
      INSERT INTO patientmedication (title, drug_strength, dosage, start_recur, end_recur, receipt_number, date_issued, doctor_name, hospital_name, hospital_address)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [
      eventData.title,
      eventData.drugStrength,
      eventData.dosage,
      eventData.startRecur,
      eventData.endRecur,
      eventData.receiptNumber,
      eventData.dateIssued,
      eventData.doctorName,
      eventData.hospitalName,
      eventData.hospitalAddress
    ];

    const result = await db.query(insertQuery, values);
    res.status(201).json({ message: "Event added successfully", event: result.rows[0] });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ message: "Error adding event", error: error.message });
  }
});

module.exports = router;
