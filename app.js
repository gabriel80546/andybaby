var express = require('express');
var mysql = require('mysql');
var app = express();

app.use('/', function(req, res, next) {
	if(req.originalUrl == "/" || req.originalUrl == "/index.html") {
		console.log("[" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "]" + " ip: " + req.ip + " METHOD: " + req.method + " " + req.originalUrl);
	}
	if(req.method == "GET" && req.query.id != null) {
		var con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "123456",
			database: "andybaby"
		});

		con.connect(function(err) {
			if (err) throw err;
			con.query("SELECT * FROM PRODUTO P JOIN IMAGEM I ON P.ID=I.ID_PRODUTO WHERE P.ID=" + req.query.id + ";",
			function (err, result, fields) {
				//if (err) throw err;
				if (err) {
					con.destroy();
				} else {
					meChama(result);
				}
			});
		});

		function meChama (arg0) {
			if(typeof arg0[0] !== "undefined") {
				res.send(arg0[0][req.query.coluna].toString());
			} else {
				res.send('');
			}
			con.destroy();
		}
	} else {
		next();
	}
}, express.static(__dirname + '/site/'));


var server = app.listen(80, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("rodando em http://%s:%s", host, port)
});
