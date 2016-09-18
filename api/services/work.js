var jwt = require('./jwt.js');

exports.get = function (req, res) {
	req.getConnection(function (err, connection) {
		connection.query('call db_dionisio.spFetchProjects();', [], function (err, result) {
			if (err) return res.status(400).json();
			return res.status(200).json(result[0]);
		});
	});
}

exports.getFromId = function (req, res) {
	var id = req.params.id;
	req.getConnection(function (err, connection) {
		connection.query('call db_dionisio.spFetchProjectByID(?);', [id], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result[0]);
		});
	});
}

exports.delete = function (req, res) {
    req.getConnection(function (err, connection) {
        var projectId = req.params.projectId

        connection.query('call db_dionisio.spDeleteProject(?);', [projectId], function (err, result) {
			if (err) return res.status(400).json();
			return res.status(200).json(result[0]);
		});
    });
}

exports.insert = function (req, res) {
    req.getConnection(function (err, connection) {
        var projectId = req.body.projectId;
		var resultado = "";

        connection.query('call db_dionisio.spInsertProject(?);', [projectId], function (err, result) {
			if (err) return res.status(400).json();
			resultado = result[0];
		});

		connection.query('call db_dionisio.spInsertImages(?);', [projectId], function (err, result) {
			if (err) return res.status(400).json();
			return res.status(200).json(result[0] + resultado);
		});
    });
}

exports.update = function (req, res) {
    req.getConnection(function (err, connection) {
        var projectId = req.body.projectId;

        connection.query('call db_dionisio.spUpdateProject(?);', [projectId], function (err, result) {
			if (err) return res.status(400).json();
			return res.status(200).json(result[0]);
		});
    });
}