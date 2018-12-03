// THIS SOURCE CODE IS FOR EDUCATIONAL PURPOSES ONLY
// DO NOT USE THIS ONLINE BEFORE READING TWITTER'S PRIVACY POLICY
var TwitterPackage = require('twitter');
const fs = require('fs')
const os = require('os');

var secret = {
  consumer_key: '<YOUR CONSUMER KEY>',
  consumer_secret: '<YOUR SECRET CONSUMER KEY>',
  access_token_key: '<ACCESS TOKEN KEY>',
  access_token_secret: '<ACCESS TOKEN KEY>'
}

var Twitter = new TwitterPackage(secret);
const bodyParser=require('body-parser');


Twitter.stream('statuses/filter', {track: '#<YOURHASHTAG>'}, function(stream) {

  stream.on('data', function(tweet) {

    console.log(tweet.user.name, "  ", tweet.user.screen_name);
    console.log(tweet.text);

    var str=tweet.text;
    var snd=-1;
    var answ="";
    var wesend=-1;
    var answers = ['The customer data is updated', 'The schedule is empty','the production data is ok','password'];
    var smalltalk=['things are ok on my side','I am always ready to work']

    if(wesend<0){snd= str.search("customer order 999 is late");
    if(snd>0){answ="Everybody is out so your assistant is here";wesend=1}}

    if(wesend<0){snd= str.search("customer data status");
    if(snd>0){answ=answers[0];wesend=1}}

    if(wesend<0){snd = str.search("workshop planning");
    if(snd>0){answ=answers[1];wesend=1;}}

    if(wesend<0){snd=str.search("wip in the factory");
    if(snd>0){answ=answers[2];wesend=1;}}

    if(wesend<0){snd = str.search("AI prog");
    if(snd>0){answ=answers[3];wesend=1;}}

    if(wesend<0){snd = str.search("Machine Learning");
    if(snd>0){
      console.log("ML is running the MDP...");
      const spawn = require("child_process").spawn;
      const pythonProcess = spawn('python',["ML/MDP4Chatbot4.py"]);

      fs.readFile('response.txt', 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data);
        answ=data;
      });

      wesend=1;
    }
    }
    if(wesend<0){snd = str.search("that is great thanks");
    if(snd>0){answ=smalltalk[1],wesend=1;}}

    console.log(answ, " ", wesend, " to ", tweet.user.screen_name);

    var dev=0;
    if(tweet.user.screen_name!="<YOUR_USERNAME_FILTER>"){
      wesend=0;
     }
    if(dev==1){
      wesend=0;
    }
    if(wesend>0){
    wesend=0;

    var statusObj = {status: "Hi @" + tweet.user.screen_name + " " + answ}
    console.log("response: ",statusObj)

    Twitter.post('statuses/update', statusObj,  function(error, tweetReply, response){

      if(error){
        console.log(error);
      }

      console.log(tweetReply.text);
    });
  }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});
