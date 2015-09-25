var Giphy = require('giphy-api')();
var request = require('request');

var giphy = {
  sendGif: function(url, bot, msg, callback) {
    var image = request(url);
    bot.sendDocument(msg.chat.id, image, { reply_to_message_id: msg.message_id });
    callback(null, url);
  },
  commands: {
    '/gif': function(bot, msg, args, callback) {
      if(args.length > 0) {
        Giphy.search(args.join(" "), function(err, res) {
          if(err) {
            callback(err, null);
            bot.sendMessage(msg.chat.id, 'aww.. fuckin damint\nshit broke', { reply_to_message_id: msg.message_id });
          }
          else {
            giphy.sendGif(res.data[Math.floor(Math.random() * (res.data.length - 0 + 1))].images.original.url, bot, msg, callback);
          }
        });
      }
      else {
        Giphy.random('random-gif', function(err, res) {
          if(err) {
            callback(err, null);
            bot.sendMessage(msg.chat.id, 'aww.. fackin damint\nshit broke', { reply_to_message_id: msg.message_id });
          }
          else {
            giphy.sendGif(res.data.image_url, bot, msg, callback);
          }
        });
       }
    }
  }
};

module.exports = giphy;
