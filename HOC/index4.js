// MIT LICENSE
// THIS CODE IS FOR EDUCATIONAL PURPOSES
// CONSULT FACEBOOK'S PRIVACY POLICY BEFORE USING IT ONLINE

const express = require('express')
const app = express()
const bodyParser=require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(9000, function (req,res) {
  console.log('Listening on port 9000!');
})

const verificationController = require("./controllers/verification");
const messageWebhookController = require("./controllers/messageWebhook");

app.get("/", verificationController);
app.post("/", messageWebhookController);