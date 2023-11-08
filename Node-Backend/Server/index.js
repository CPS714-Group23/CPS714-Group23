// server/index.js

const express = require("express");
const bodyParser = require("body-parser");
const signupRoute = require("../routes/signup"); 
const schedulerRoute = require("../routes/scheduler");

const PORT = process.env.PORT || 3001;
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

//database config
const connectDb = async () => {
  try {
      const client = new Client({
          user: process.env.PGUSER,
          host: process.env.PGHOST,
          database: process.env.PGDATABASE,
          password: process.env.PGPASSWORD,
          port: process.env.PGPORT,
          ssl: {
              rejectUnauthorized: false
          }
      })

      await client.connect()
      // const res = await client.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog', 'information_schema') AND table_type = 'BASE TABLE'");
      const res = await client.query("SELECT table_schema, table_name FROM information_schema.tables WHERE table_schema NOT IN ('pg_catalog', 'information_schema') AND table_type = 'BASE TABLE'");
      console.log(res.rows);
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

app.use("/api/scheduler", schedulerRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});