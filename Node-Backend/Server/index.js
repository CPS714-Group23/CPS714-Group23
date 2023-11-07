// server/index.js

const express = require("express");
const bodyParser = require("body-parser");
const signupRoute = require("../routes/signup"); 

const PORT = process.env.PORT || 3001;
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

//database config
const connectDb = async () => {
  try {
      const client = new Client({
          connectionString: process.env.CONNECTIONSTRING,
          ssl: { rejectUnauthorized: false }
      })

      await client.connect()
      const res = await client.query('SELECT * FROM some_table')
      console.log(res)
      await client.end()
  } catch (error) {
      console.log(error)
  }
}

//connecting
connectDb()

app.use(bodyParser.json());

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.use("/signup", signupRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});