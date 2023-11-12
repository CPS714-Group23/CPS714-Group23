const express = require('express');
const router = express.Router();
const db = require('../db'); 
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if a patient with the same email and password exists
    const checkEmailQuery = 'SELECT * FROM patient WHERE email = $1 AND password = $2';
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const existingUser = await db.query(checkEmailQuery, [email, hashedPassword]);

    if (existingUser.rows.length == 0) {
        const errorMessage = 'Email or password is incorrect';
        return res.json({ error: errorMessage });
    }
    else{
        console.log("correct pass");
        //redirect and keep token
    }
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;