const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:patient_id', async (req, res) => {
  const { patient_id } = req.params;

  try {
    const result = await db.query('SELECT * FROM patient WHERE patient_id = $1', [patient_id]);
    const userProfile = result.rows[0];
    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:patient_id', async (req, res) => {
  const { patient_id } = req.params;
  const updatedProfile = req.body;

  try {
    await db.query('UPDATE patient SET first_name=$1, last_name=$2, gender=$3, home_address=$4, date_of_birth=$5, phone_number=$6, email=$7 WHERE patient_id=$8',
      [updatedProfile.first_name, updatedProfile.last_name, updatedProfile.gender, updatedProfile.home_address, updatedProfile.date_of_birth, updatedProfile.phone_number, updatedProfile.email, patient_id]);

    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;