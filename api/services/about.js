var jwt = require('./jwt.js');

exports.get = function (req, res) {
	req.getConnection(function (err, connection) {
		connection.query('call spFetchAbout();', [], function (err, result) {
			if (err) return res.status(400).json();
			return res.status(200).json(result[0][0]);
		});
	});
}

exports.update = function (req, res) {
	var data = {
		title: req.body.title,
		description: req.body.description,
		image: req.body.image,
	};

	var	id = req.params.id;

	req.getConnection(function (err, connection) {
		connection.query('call spUpdateAbout(?, ?, ?, ?)', [data.title, data.description, data.image, id], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result[0]);
		});
	});
}
