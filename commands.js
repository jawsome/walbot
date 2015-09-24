


var commands = {

  resolve: function (msg, callback) {
    var args = msg.text.split(' ');
    if(typeof this[args[0]] == 'function') {
      this[args[0]](msg, args.slice(1), callback);
    }
    else {
      callback('Command [' + msg.text + '] not found.');
    }
  },

  '/wot': function(msg, args, callback) {
    callback(null, 'wut');
  },
  '/hi': function(msg, args, callback) {
    var from = msg.from.username ? '@' + msg.from.username : msg.from.first_name;
    callback(null, 'Hello, ' + from + '!');
  },
  '/me': function (msg, args, callback) {
    var from = msg.from.username ? '@' + msg.from.username : msg.from.first_name;
    callback(null, '_' + from + ' ' + args.join(' ') + '_', { parse_mode: 'Markdown' });
  }


};


module.exports = commands;
