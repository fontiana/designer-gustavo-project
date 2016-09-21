var jwt = require('./jwt.js');

exports.get = function (req, res) {
	req.getConnection(function (err, connection) {
		connection.query('call spFetchCategories();', [], function (err, result) {
			if (err) return res.status(400).json();
			return res.status(200).json(result[0]);
		});
	});
}

exports.getFromId = function (req, res) {
	var id = req.params.id;
	req.getConnection(function (err, connection) {
		connection.query('call spFetchCategoryById(?);', [id], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result[0][0]);
		});
	});
}

exports.insert = function (req, res) {
	// var token = req.headers.authorization.split(' ')[1];
	// var payload = jwt.decode(token, 'secret');

	// if (!payload.sub) {
	// 	res.status(401).send({ message: 'Autenticação falhou' });
	// }

	// if (!req.headers.authorization) {
	// 	return res.status(401).send({
	// 		message: 'Você não está autorizado'
	// 	});
	// }
	
	var data = req.body.description;
	req.getConnection(function (err, connection) {
		connection.query('call spInsertCategory(?);', [data], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}

exports.update = function (req, res) {
	var description = req.body.description,
		id = req.params.id;

	req.getConnection(function (err, connection) {
		connection.query('call spUpdateCategory(?, ?);', [description, id], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}

exports.delete = function (req, res) {
	var id = req.params.id;

	req.getConnection(function (err, connection) {
		connection.query('call spDeleteCategory(?);', [id], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}
