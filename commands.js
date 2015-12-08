var extend = require("xtend");
var walk = require("walk");
var config = require("./config.json");

var commands = {

  scanModules: function(callback) {
    var files   = [];
    var walker  = walk.walk('./modules', { followLinks: false });
    walker.on('file', function(root, stat, next) {
      if(/^([a-z0-9]+)\.js$/.test(stat.name)) {
        files.push( stat.name);
      }
      next();
    });
    walker.on('end', function() {
      callback(files);
    });
  },

  loadModules: function (callback) {
    var self = this;
    this.scanModules(function (files) {
      for(var i=0;i<files.length;i++) {
        var name = files[i].split('.js')[0];
        var commands = require('./modules/'+ name).commands;
        self.commands = extend(self.commands, commands);
        }
      callback();
    });
  },

  resolve: function (bot, msg, callback) {
    msg.text = msg.text.replace("@" + config.botname, "");
    var args = msg.text.split(' ');
    if(typeof this.commands[args[0]] == 'function') {
      this.commands[args[0]](bot, msg, args.slice(1), callback);
    }
    else {
      callback('Command [' + msg.text + '] not found.');
    }
  },

  commands: {

  }

};

module.exports = commands;
