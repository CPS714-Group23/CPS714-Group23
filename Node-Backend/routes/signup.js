const express = require('express');
const router = express.Router();
const db = require('../db'); 
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, gender, homeAddress, dateOfBirth, phone, email, password } = req.body;

    // Check if a patient with the same email already exists
    const checkEmailQuery = 'SELECT email FROM patient WHERE email = $1 UNION SELECT email FROM pharmacist WHERE email = $1';
    const existingPatient = await db.query(checkEmailQuery, [email]);

    if (existingPatient.rows.length !== 0) {
      const errorMessage = 'Email already exist';
      return res.status(401).send({ error: errorMessage });
    }

    // Hash the patient's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new patient into the database
    const insertPatientQuery =
      'INSERT INTO patient (first_name, last_name, gender, home_address, date_of_birth, phone_number, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [firstName, lastName, gender, homeAddress, dateOfBirth, phone, email, hashedPassword];

    const newPatient = await db.query(insertPatientQuery, values);

    res.status(201).json(newPatient.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;