var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('express');
var mysql = require('mysql');
var app = express();


var options = {
  key: fs.readFileSync(__dirname + '/ssl/domainKey.txt', 'utf8'),
  cert: fs.readFileSync(__dirname + '/ssl/domainCrt.txt', 'utf8'),
};



app.use('/', function(req, res, next) {
	if(req.originalUrl == "/" || req.originalUrl == "/index.html") {
		console.log("[" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "]" + " ip: " + req.ip + " METHOD: " + req.method + " " + req.originalUrl);
	}
	if(req.method == "GET" && req.query.tabela != null) {
		var con = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "123456",
			database: "andybaby"
		});

		con.connect(function(err) {
			if (err) throw err;
			con.query("SELECT " + req.query.coluna + " FROM " + req.query.tabela + " WHERE " + req.query.where + ";",
			function (err, result, fields) {
				//if (err) throw err;
				if (err) {
					con.destroy();
				} else {
					meChama(result);
				}
			});
		});

		function meChama (dados) {
			if(typeof dados[0] !== "undefined") {
				res.send(dados[0][req.query.coluna].toString());
			} else {
				res.send('');
			}
			con.destroy();
		}
	} else if(req.query.ip != null) {
		res.send(req.connection.remoteAddress);
		res.end();
	} else {
		next();
	}
}, express.static(__dirname + '/site/'));

var server = https.createServer(options, app).listen(443, function(){
  console.log("Express server listening on port " + "443");
});
var server = http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
