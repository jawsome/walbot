var greetings = {
  greet: function(bot, msg, greet, callback) {
    var from = msg.from.username ? '@' + msg.from.username : msg.from.first_name;
    bot.sendMessage(msg.chat.id, greet + " " + from);
    callback(null, greet + " " + from);
  },
  commands: {
    '/hello': function(bot, msg, args, callback) {
      greetings.greet(bot, msg, 'Hello', callback);
    },
    '/hi': function(bot, msg, args, callback) {
      greetings.greet(bot, msg, 'Hi', callback);
    },
    '/hey': function(bot, msg, args, callback) {
      greetings.greet(bot, msg, 'Hey, ', callback);
    },
    '/sup': function(bot, msg, args, callback) {
      greetings.greet(bot, msg, 'sup', callback);
    },
    '/yo': function(bot, msg, args, callback) {
      greetings.greet(bot, msg, 'ayyyy', callback);
    }

  }
};

module.exports = greetings;
