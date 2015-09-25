var TelegramBot = require('node-telegram-bot-api');
var moment = require('moment');
var config = require('./config.json');
var commands = require('./commands');
var options = {
  polling: true
};

var logger = function (message, msg) {
  if(msg) {
    console.log(moment().format(), msg.date, msg.chat.title + '(' + msg.chat.id + ')', msg.from.first_name  + '(' + msg.from.username  + '): ' + msg.text, '=>', message);
  }
  else {
     console.log(moment().format(), '[i]', message);
  }
}

commands.loadModules(function () {
  console.log(commands.commands)
});

var bot = new TelegramBot(config.key, options);

bot.getMe().then(function (me) {
  logger(me.username + ' has been initialized.', null);
});

bot.on('text', function (msg) {
  commands.resolve(bot, msg, function (err, message, opts) {
    if(err) {
      console.log(msg.date, msg.chat.id, msg.from.first_name, msg.text, err);
    }
    else {
      logger(message, msg);
    }
  });
});

bot.on('left_chat_participant', function (msg) {
  var joiner = msg.left_chat_participant.username ? msg.left_chat_participant.username : msg.left_chat_participant.first_name + " " +msg.left_chat_participant.last_name;
  bot.sendMessage(msg.chat.id, 'rip ' + joiner);
});

bot.on('new_chat_participant', function (msg) {
  var joiner = msg.new_chat_participant.username ? msg.new_chat_participant.username : msg.new_chat_participant.first_name + " " +msg.new_chat_participant.last_name;
  bot.sendMessage(msg.chat.id, 'ayyyyyyyyyyy grl ' + joiner);
});
