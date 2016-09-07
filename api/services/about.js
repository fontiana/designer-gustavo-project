exports.get = function (req, res) {
	req.getConnection(function (err, connection) {
		connection.query('SELECT TOP 1 FROM ABOUT', [], function (err, result) {
			if (err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}

exports.insert = function (req, res) {
	var data = req.body;

	req.getConnection(function (err, connection) {
		connection.query('INSERT INTO ABOUT SET ?', [data], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}

exports.update = function (req, res) {
	var data = req.body,
		id = req.params.id;

	req.getConnection(function (err, connection) {
		connection.query('UPDATE WORK ABOUT ? WHERE ABOUT_ID = ? ', [data, id], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}
