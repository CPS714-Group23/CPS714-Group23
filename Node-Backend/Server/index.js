// server/index.js

const express = require("express");
const bodyParser = require("body-parser");
const signupRoute = require("../routes/signup"); 

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use("/signup", signupRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});