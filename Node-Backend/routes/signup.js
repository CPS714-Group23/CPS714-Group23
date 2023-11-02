const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const formData = req.body; 

  console.log("Received form data:", formData);

  res.json({ message: "Signup successful" });
});

module.exports = router;
