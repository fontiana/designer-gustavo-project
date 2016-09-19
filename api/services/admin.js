var bcrypt = require('bcrypt');
var jwt = require('./jwt.js');
var randomString = require("randomstring");

exports.login = function (req, res) {
    req.getConnection(function (err, connection) {
        var user = {
            email: req.body.email,
            senha: req.body.senha
        };

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

                    var secret = randomString.generate({ lengyth: 32});

                    retorno.token = jwt.encode(payload, secret);
                    retorno.status = true;

                    return res.status(200).json(retorno);
                };
            } else {
                return res.status(400).json(retorno);
            }
        });
    });
}