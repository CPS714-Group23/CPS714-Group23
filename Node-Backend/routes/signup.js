const express = require("express");
const router = express.Router();

// Handle a POST request for signup
router.post("/", (req, res) => {
  const formData = req.body; // The form data sent from the frontend

  // Handle the form data here (e.g., save it to a database, send a response, etc.)
  console.log("Received form data:", formData);

  // Send a response back to the frontend
  res.json({ message: "Signup successful" });
});

module.exports = router;
