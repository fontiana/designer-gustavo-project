"use strict";
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

			var project = result[0][0];

			connection.query('call db_dionisio.spFetchProjectImagesById(?);', [id], function (err, result) {
				if (err) return res.status(400).json();

				project.imagens = result[0][0];
			});

			return res.status(200).json(project);
		});
	});
}

exports.delete = function (req, res) {
    req.getConnection(function (err, connection) {
        var projectId = req.params.id

        connection.query('call db_dionisio.spDeleteProject(?);', [projectId], function (err, result) {
			if (err) return res.status(400).json();
			return res.status(200).json(result[0]);
		});
    });
}

exports.insert = function (req, res) {
    req.getConnection(function (err, connection) {
		var work = {
			name: req.body.name,
			description: req.body.description,
			categoryId: req.body.categoryId,
			coverImage: req.body.coverImage,
			imagens: req.body.imagens
		};

		connection.beginTransaction(function (err) {
			if (err) { throw err; }

			connection.query('call db_dionisio.spInsertProject(?, ?, ?, ?);', [work.name, work.description, work.categoryId, work.coverImage], function (err, result) {
				if (err) {
					connection.rollback(function () {
						return res.status(500).json();
					});
				}
				var id = result[0][0].insertId;

				for (let i = 0; i < work.imagens.length; i++) {
					var workImage = {
						name: work.imagens[i]
					};

					connection.query('call db_dionisio.spInsertImages(?, ?);', [id, workImage.name], function (err, result) {
						if (err) {
							connection.rollback(function () {
								return res.status(500).json();
							});
						}
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
}

exports.update = function (req, res) {
    req.getConnection(function (err, connection) {
		var work = {
			name: req.body.name,
			description: req.body.description,
			categoryId: req.body.categoryId,
			coverImage: req.body.coverImage,
			imagens: req.body.imagens
		};
        var id = req.params.id;

		connection.beginTransaction(function (err) {
			if (err) { throw err; }

			connection.query('call db_dionisio.spUpdateProject(?, ? ,? ,?);', [work.name, work.description, work.categoryId, work.coverImage, id], function (err, result) {
				if (err) {
					connection.rollback(function () {
						return res.status(500).json();
					});
				}

				connection.query('call db_dionisio.spDeleteImagesById(?);', [id], function (err, result) {
					if (err) {
						connection.rollback(function () {
							return res.status(500).json();
						});
					}
				});

				for (let i = 0; i < work.imagens.length; i++) {
					var workImage = {
						name: work.imagens[i]
					};

					connection.query('call db_dionisio.spInsertImages(?, ?);', [id, workImage.name], function (err, result) {
						if (err) {
							connection.rollback(function () {
								return res.status(500).json();
							});
						}
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
}