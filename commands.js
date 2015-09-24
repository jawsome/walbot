var commands = {

  //TODO: loadModule command to load commands in from external modules.

  // Utilities

  resolve: function (msg, callback) {
    var args = msg.text.split(' ');
    if(typeof this.commands[args[0]] == 'function') {
      this.commands[args[0]](msg, args.slice(1), callback);
    }
    else {
      callback('Command [' + msg.text + '] not found.');
    }
  },


  /*
 *  Command format:
 *
 *    '/command': function(msg, args, callback) {
 *      // Do something
 *      callback( // Error message, // Outbound message, // Object of message options );
 *    }
 */

  commands: {

    // 	Misc.

    '/wot': function(msg, args, callback) {
      callback(null, 'wut');
    },

    // Greetings
    '/hi': function(msg, args, callback) {
      var from = msg.from.username ? '@' + msg.from.username : msg.from.first_name;
      callback(null, 'Hello, ' + from + '!');
    },

    // Actions
    '/me': function (msg, args, callback) {
      var from = msg.from.username ? '@' + msg.from.username : msg.from.first_name;
      callback(null, '_' + from + ' ' + args.join(' ') + '_', { parse_mode: 'Markdown' });
    }

  }

};


module.exports = commands;
