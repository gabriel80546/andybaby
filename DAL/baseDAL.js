var mysql   = require("mysql");

var pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "123456",
	database: "andybaby",
	connectionLimit: 30
});


var DB = {
	query: function (query, params, callback) {
		pool.getConnection(function (err, connection) {
			if (err) {
				connection.release();
				callback(null, err);
				throw err;
			}

			connection.query(query, params, function (err, rows) {
				connection.release();
				if (!err) {
					callback(rows);
				}
				else {
					callback(null, err);
				}

			});

			connection.on('error', function (err) {
				connection.release();
				callback(null, err);
				throw err;
			});
		});
	}
};

module.exports = DB;
