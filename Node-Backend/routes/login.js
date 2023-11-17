const express = require('express');
const router = express.Router();
const db = require('../db'); 
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if a patient with the same email and password exists
    const checkEmailQuery = 'SELECT password FROM users WHERE email = $1';
    const queryresult = await db.query(checkEmailQuery, [email]);

    if (queryresult.rows.length == 0) {
        const errorMessage = 'Incorrect Email or password';
        return res.status(400).res.json({ error: errorMessage });
    }
    else{
        if(bcrypt.compare(password, queryresult.rows[0].password)){
          console.log("correct pass");
          const jwtToken =  jwt.sign({
            id: queryresult.rows[0].user_id,
            email: queryresult.rows[0].email,
          }, process.env.JWTTOK);
          return res.json({id:queryresult.rows[0].user_id, email:queryresult.rows[0].email, token:jwtToken });
        }
    }
    
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: 'Server Error' });
  }
});

module.exports = router;