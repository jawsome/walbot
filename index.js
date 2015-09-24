var TelegramBot = require('node-telegram-bot-api');
var config = require('./config.json');
var commands = require('./commands');
var options = {
  polling: true
};

var bot = new TelegramBot(config.key, options);
bot.setWebHook('');

bot.on('text', function (msg) {
  commands.resolve(msg, function (err, message, opts) {
    if(err) {
      console.log(err);
      return;
    }
    else {
      bot.sendMessage(msg.chat.id, message, opts);
    }
  });
});

bot.on('left_chat_participant', function (msg) {
  bot.sendMessage(msg.chat.id, 'rip ' + msg.from.first_name);
});
