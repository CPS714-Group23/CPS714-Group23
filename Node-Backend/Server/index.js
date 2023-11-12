const express = require("express");
const bodyParser = require("body-parser");
const signupRoute = require("../routes/signup"); 
const loginRoute = require("../routes/login"); 
const schedulerRoute = require("../routes/scheduler");
const app = express();
const client = require('twilio')('AC28416c6be03f3b835b1f7eb6d6088865', '56cc34c4c88edf11b9c12f2f350c1b51'); //need account SID and token

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

function sendTextMessage(msg){
  client.messages.create({
      body: msg,
      to: '+16479396641',
      from: '+12015814244'
  }).then(message => console.log(message))
  // implement fallback code
  .catch(error => console.log(error))
}