var config = require('./bing.config.json');
var Bing = require('node-bing-api')({ accKey: config.key });
var request = require('request');
var fs = require('fs');
var uuid = require('node-uuid');

var bing = {
  commands: {
    '/img': function(bot, msg, args, callback) {
      Bing.images(args.join(" "), { top: 1}, function (err, res, body) {
        if(err) {
         console.log(err);
        }
        else if(body.d.results[0]) {
        var image = body.d.results[0];
        if(image.FileSize < 5000000) {
          var name = image.MediaUrl.split("/");
          var name = uuid.v4() + name[name.length -1];
          request(image.MediaUrl).pipe(fs.createWriteStream("../tmp/" + name)).on('close', function () {
            bot.sendPhoto(msg.chat.id, "../tmp/" + name, { caption: args.join(" ") } );
            callback(null, image.MediaUrl);
          });
        }
        }
        else {
          bot.sendMessage(msg.chat.id, "u dun fukt up");
        }
      });
    }
  }
}

module.exports = bing;
