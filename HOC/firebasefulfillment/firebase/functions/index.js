// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my Coffee Shop agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
}

  function gotoblog(agent) {
     agent.add(`This message is from Coffee Shop fans!`);
     agent.add(new Card({
     title: `A blog for Coffee Shops`,
     imageUrl: 'https://www.eco-ai-horizons.com/coffeeshop.jpg',
     text: `The button takes you to the blog\n  Great to have you here! 💁`,
     buttonText: 'Click here',
     buttonUrl: 'https://www.allrecipes.com/recipes/134/drinks/coffee/'
      })
     );
   }

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
 // intentMap.set('Default Welcome Intent', yourFunctionHandler);
  intentMap.set('blog', gotoblog);
 
  //intentMap.set('webhook', yourFunctionHandler);

  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
