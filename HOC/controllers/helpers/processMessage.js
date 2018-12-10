const API_AI_TOKEN = "<YOUR API TOKEN>";
const apiAiClient = require("<API AI TOKEN>")(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = "<YOUR FACEBOOK_ACESS_TOKEN";
const request = require("request");
const sendTextMessage = (senderId, text) => {
 request({
 url: "https://graph.facebook.com/v2.6/me/messages",
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: "POST",
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 console.log("export");
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: "<YOUR VERIFICATION TOKEN>"});
apiaiSession.on("response", (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on("error", error => console.log(error));
 apiaiSession.end();
};
