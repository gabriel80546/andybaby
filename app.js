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




var DB = require('./DAL/baseDAL.js');

var usuarioDAL = require('./DAL/UsuarioDAL.js');
var produtoDAL = require('./DAL/ProdutoDAL.js');




app.use('/', function(req, res, next) {
	if(req.originalUrl == "/" || req.originalUrl == "/index.html") {
		console.log("[" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "]" + " ip: " + req.ip + " METHOD: " + req.method + " " + req.originalUrl);
	}
	if(req.method == "GET" && req.query.DAL != null) {
		if(req.query.DAL == "usuario") {
			if(req.query.metodo == "findAll") {
				usuarioDAL.findAll(function (data) {
					res.send(data);
					res.end();
				});
			}
			else if (req.query.metodo == "getCarrinho") {
				usuarioDAL.getCarrinho(function (data) {
					res.send(data);
					res.end();
				}, req.query.usuarioId);
			}
		} else if(req.query.DAL == "produto") {
			if(false) {
				console.log("WHAT?");
			}
			else if(req.query.metodo == "getCard") {
				produtoDAL.getCard(function (data) {
					res.send(data);
					res.end();
				}, req.query.pagina);
			}
		}
	}
	else if(req.method == "GET" && req.query.tabela != null) {

		DB.query("SELECT " + req.query.coluna + " FROM " + req.query.tabela + " WHERE " + req.query.where + ";", null, function (data, error) {
			meChama(data, error);
		});

		function meChama (dados, error) {
			if(dados != null && typeof dados[0] !== "undefined") {
				res.send(dados[0][req.query.coluna].toString());
			} else {
				res.send('');
			}
			res.end();
		}
	} else if(req.method == "GET" && req.query.ip != null) {
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
