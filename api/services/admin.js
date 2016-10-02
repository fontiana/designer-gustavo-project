//LOADING INTERNAL DEPENDENCIES
var bcrypt = require('bcryptjs');
var jwt = require('./jwt.js');

//LOADING DEPENDENCIES
var randomString = require("randomstring");
var redis = require('redis');
var client = redis.createClient();

exports.login = function (req, res) {
    req.getConnection(function (err, connection) {
        var user = {
            email: req.body.email,
            senha: req.body.senha
        };

        var sessionId = req.headers["amc-sessionid"];
        if (sessionId === undefined || sessionId === "") {
            return res.status(500).json();
        }

        connection.query('call db_dionisio.spFetchUserByEmail(?);', [user.email], function (err, result) {
            if (err) {
                return res.status(400).json(err);
            }

            var retorno = {
                status: false,
                token: ""
            };

            if (result[0] !== undefined) {
                var passwordConvertido = bcrypt.hashSync(user.senha, result[0][0].PASSWORD_SALT);
                if (passwordConvertido == result[0][0].PASSWORD) {
                    var payload = {
                        iss: req.hostname,
                        sub: user.email
                    };

                    var secret = randomString.generate({ lengyth: 32 });
                    retorno.token = jwt.encode(payload, secret);
                    retorno.status = true;

                    var session = JSON.stringify({
                        sessionId: sessionId,
                        secret: secret
                    });
                    client.set('session', session);

                    return res.status(200).json(retorno);
                };
            } else {
                return res.status(400).json(retorno);
            }
        });
    });
}

exports.checkUserRole = function (req, res, next) {
    var token = req.headers.authorization.split(' ')[1];
    
    client.get('session', function (err, value) {
        if (err) { return false } else {
            var clientSession = JSON.parse(value);

            if (clientSession.sessionId === req.headers["amc-sessionid"]) {
                var payload = jwt.decode(token, clientSession.secret);

                if (!payload.sub) {
                    res.status(400).json({message: "Autenticacao falhou."});
                }

                if (!req.headers.authorization) {
                    res.status(400).json({message: "Você não está autorizado."});
                }
                
                next();
            } else {
                res.status(400).json({message: "ID de sessão inválido."});
            }
        }
    });
}