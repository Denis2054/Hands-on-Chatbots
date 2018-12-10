//https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
//https://medium.com/crowdbotics/how-to-create-your-very-own-facebook-messenger-bot-with-dialogflow-and-node-js-in-just-one-day-f5f2f5792be5
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