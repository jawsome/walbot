var Me = {
  commands: {
    '/me': function(bot, msg, args, callback) {
      bot.sendMessage(msg.chat.id, "@telegram, please add /me support. fucksake.");
      callback(null);
    }

  }
};

module.exports = Me;
