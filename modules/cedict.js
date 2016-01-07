var cedict = require('node-cc-cedict');

var cd = {
  commands: {
    '/cd': function(bot, msg, args, callback) {
      cedict.searchByChinese(args.join(' '), function(words) {
        if(words.length > 0) {
          var message = [];
          for(var i=0;i<words.length;i++) {
            var word = words[i];
            message.push(word.traditional + "  ➖  " + word.pronunciation + "  ➖  " + word.simplified + "\n" + word.definitions);
          }
          bot.sendMessage(msg.chat.id,
            "   中文   →   EN (Trad. - Pinyin - Simpl.)\n" + message.join('\n'),
            {
              reply_to_message_id: msg.message_id,
              disable_web_page_preview: true
            }
          );
          callback(null, words);
        }
        else {
          bot.sendMessage(msg.chat.id, 'wadafak @ china!!!!!!!!!!!\n ' + msg.from.first_name + ' 他们不知道～',
          {
            reply_to_message_id: msg.message_id,
            disable_web_page_preview: true
          });
          callback(json, null);
        }
      });
    }
  }
}


module.exports = cd;
