var fs = require("fs");

exports.saveLog = function (message) {
    var log = "Log: " + message + "\n";
    fs.appendFile('logs/log.txt', log, 'utf8');
}