exports.get = function (req, res) {
    req.getConnection(function (err, connection) {
        connection.query('call db_dionisio.spFetchDynamicConfiguration();', [], function (err, result) {
            if (err) return res.status(400).json();

            return res.status(200).json(result[0][0]);
        });
    });
}

exports.update = function (req, res) {
    var data = {
        email: req.body.email,
        logo: req.body.logo,
    };

    var id = req.params.id;

    req.getConnection(function (err, connection) {
        connection.query('call spUpdateConfig(?, ?, ?)', [data.email, data.logo, id], function (err, result) {
            if (err) return res.status(400).json(err);

            return res.status(200).json(result[0]);
        });
    });
}