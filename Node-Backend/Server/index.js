
const express = require("express");
const bodyParser = require("body-parser");
const signupRoute = require("../routes/signup"); // Require the signup route module

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware to parse JSON data from the request body
app.use(bodyParser.json()); // This line is crucial to parse JSON data

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Use the signup route
app.use("/signup", signupRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
