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

			return res.status(200).json(result[0][0]);
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

		connection.beginTransaction(function (err) {
			if (err) { throw err; }

			connection.query('call db_dionisio.spInsertProject(?);', [projectId], function (err, result) {
				if (err) {
					connection.rollback(function () {
						return res.status(400).json();
					});
				}
				var projectId = result[0][0].WORD_ID;

				connection.query('call db_dionisio.spInsertImages(?);', [projectId], function (err, result) {
					if (err) {
						connection.rollback(function () {
							return res.status(400).json();
						});
					}

					connection.commit(function (err) {
						if (err) {
							connection.rollback(function () {
								throw err;
							});
						}
						return res.status(200).json(result[0]);
					});
				});
			});
		});
    });
}

exports.update = function (req, res) {
    req.getConnection(function (err, connection) {
		var work = {
			name: req.body.name,
			description: req.body.description,
			categoryId: req.body.categoryId

		};
        var id = req.params.id;

        connection.query('call db_dionisio.spUpdateProject(?, ? ,? ,?);', [work.name, work.description, work.categoryId, id], function (err, result) {
			if (err) return res.status(400).json();
			return res.status(200).json(result[0]);
		});
    });
}