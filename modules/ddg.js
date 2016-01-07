var ddg = require('ddg');

var options = {
  "useragent": "Telegram/Bot",
  "no_redirects": "1",
  "no_html": "0"
}

var DDG = {
  commands: {
    '/s': function(bot, msg, args, callback) {
      ddg.query(args.join(" "), options, function(err, data) {
        if(err) {
          console.log(err);
          callback(err, null);
        }
        else {
          if(data.RelatedTopics.length > 0) {
            var results = [];
            for(var i=0; i<3; i++) {
              var item = data.RelatedTopics[i];
              results.push('- ' + item.Text + ' (' + item.FirstURL + ')');
            }
            bot.sendMessage(msg.chat.id, '🐥 Results from DuckDuckGo:\n' + results.join('\n'),
              { reply_to_message_id: msg.message_id, disable_web_page_preview: true }
            );
            callback(null, results.length + " results");
          }
          else {
            bot.sendMessage(msg.chat.id, 'Results from DuckDuckGo:\n' + results.join('\n'), 
              { reply_to_message_id: msg.message_id, disable_web_page_preview: true }
            );
            callback(null, "No results found for \'" + args.join(" ") + "\'");
          }
        }
      });
    }
  }
}


module.exports = DDG;
