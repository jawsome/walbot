var phrases = {
  phrase: function(bot, msg, phrase, callback) {
    var from = msg.from.username ? '@' + msg.from.username : msg.from.first_name;
    bot.sendMessage(msg.chat.id, phrase + " " + from);
    callback(null, phrase + " " + from);
  },
  commands: {
    '/serious': function(bot, msg, args, callback) {
      phrases.phrase(bot, msg, 'o shit u srs', callback);
    }

  }
};

module.exports = phrases;
