const express = require('express');
const router = express.Router();
const db = require('../db'); 
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, gender, homeAddress, dateOfBirth, phone, email, password } = req.body;

    // Check if a patient with the same email already exists
    const checkEmailQuery = 'SELECT * FROM patient WHERE email = $1';
    const existingUser = await db.query(checkEmailQuery, [email]);

    if (existingUser.rows.length !== 0) {
      const errorMessage = 'Email already exist';
      return res.json({ error: errorMessage });
    }

    // Hash the patient's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new patient into the database
    const insertUserQuery =
      'INSERT INTO patient (first_name, last_name, gender, home_address, date_of_birth, phone, email, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const values = [firstName, lastName, gender, homeAddress, dateOfBirth, phone, email, hashedPassword];

    const newUser = await db.query(insertUserQuery, values);

    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;