const express = require("express");
const bodyParser = require("body-parser");
const signupRoute = require("../routes/signup"); 
const loginRoute = require("../routes/login"); 
const schedulerRoute = require("../routes/scheduler");
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/api/scheduler", schedulerRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});