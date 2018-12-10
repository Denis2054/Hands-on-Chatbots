const processMessage = require("./helpers/processMessage");
module.exports = (req, res) => {
    if (req.body.object === "page") {
       console.log("page");
        req.body.entry.forEach(entry => {
           if(entry.messaging){
              entry.messaging.forEach(event => {
                if (event.message && event.message.text) {
                    processMessage(event);
                }
            });
          };
         });

         res.status(200).end();
    }
};
