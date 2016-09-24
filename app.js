require('getmodule');
var express = require("express");
var path = require('path');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var connection = require('express-myconnection');

var routes = require("./api/routes/routes");
var app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Authorization, Accept');
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(connection(mysql, {
    host: 'db-dionisio.mysql.uhserver.com',
    user: 'dionisio_user',
    password: 'b4c0nfrito@',
    database: 'db_dionisio'
}, 'request'));
app.use(express.static(path.join(__dirname, 'web')));

app.use('/', routes);

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});

module.exports = app;

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
