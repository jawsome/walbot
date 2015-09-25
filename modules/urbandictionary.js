var urban = require('urban');

var ud = {
  commands: {
    '/ud': function(bot, msg, args, callback) {
      var search = urban(args.join(' '));
      search.first(function(json) {
        if(json !== undefined) {
          console.log(json);
          var message = [
            'Word: ' + json.word,
            'Def.: ' + json.definition,
            'Ex.: ' + json.example,
            json.permalink
          ];
          bot.sendMessage(msg.chat.id,
            message.join('\n'),
            {
              reply_to_message_id: msg.message_id,
              disable_web_page_preview: true
            });
          callback(null, json.permalink);
        }
        else {
          bot.sendMessage(msg.chat.id, 'fuk u urbna dictionary\nsry ' + msg.from.first_name + ' he no know',
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


module.exports = ud;
