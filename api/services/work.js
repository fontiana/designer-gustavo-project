exports.get = function (req, res) {
	req.getConnection(function (err, connection) {
		connection.query('call db_dionisio.spFetchProjects();', [], function (err, result) {
			if (err) return res.status(400).json();
			return res.status(200).json(result);
		});
	});
}

exports.getFromId = function (req, res) {
	var id = req.params.id;
	req.getConnection(function (err, connection) {
		connection.query('call db_dionisio.spFetchProjectByID(?)', [id], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result[0]);
		});
	});
}

exports.insert = function (req, res) {
	var data = req.body;

	req.getConnection(function (err, connection) {
		connection.query('INSERT INTO WORK SET ?', [data], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}

exports.update = function (req, res) {
	var data = req.body,
		id = req.params.id;

	req.getConnection(function (err, connection) {
		connection.query('UPDATE WORK SET ? WHERE WORK_ID = ? ', [data, id], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}

exports.delete = function (req, res) {
	var id = req.params.id;

	req.getConnection(function (err, connection) {
		connection.query('DELETE FROM WORK WHERE WORK_ID = ? ', [id], function (err, result) {
			if (err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
}
