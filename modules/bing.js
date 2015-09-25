var config = require('./bing.config.json');
var Bing = require('node-bing-api')({ accKey: config.key });
var request = require('request');

var bing = {
  commands: {
    '/img': function(bot, msg, args, callback) {
      Bing.images(args.join(" "), { top: 5}, function (err, res, body) {
        if(err) {
         console.log(err);
        }
        else if(body.d.results[0]) {
          var image = body.d.results[0];
          if(image.FileSize < 5000000) {
            var data = request(image.MediaUrl);
            bot.sendPhoto(msg.chat.id, data, { reply_to_message_id: msg.message_id });
            callback(null, image.MediaUrl);
          }
        }
        else {
          bot.sendMessage(msg.chat.id, "u dun fukt up\njk bing ain't say shit tho", { reply_to_message_id: msg.message_id });
        }
      });
    }
  }
}

module.exports = bing;
