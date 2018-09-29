var express = require('express');
var mysql = require('mysql');
var app = express();


var DB = require('./DAL/baseDAL.js');

var usuarioDAL = require('./DAL/UsuarioDAL.js');
var produtoDAL = require('./DAL/ProdutoDAL.js');


app.use('/', function(req, res, next) {
	if(req.originalUrl == "/" || req.originalUrl == "/index.html") {
		console.log("[" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "]" + " ip: " + req.header('x-forwarded-for') + " METHOD: " + req.method + " " + req.originalUrl);
		res.writeHead(302, {
		  'Location': 'https://www.andybaby.com.br/static'
		});
		res.end();
	}
	if(req.method == "GET" && req.query.DAL != null) {
		if(req.query.DAL == "usuario") {
			if(false) {
				const nada = true;
			}
			else if (req.query.metodo == "getUsuario") {
				const ip = req.header('x-forwarded-for');
				usuarioDAL.getUsuario(function (data) {
					if(data.length == 0) {
						res.send("ANONIMO");
					} else if(data.length > 1) {
						res.send("MAIS DE 1 LOGADO NO MESMO IP");
					} else if(data.length == 1) {
						res.send(data);
					}
					res.end();
				}, ip);
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
		res.send(req.header('x-forwarded-for'));
		res.end();
	} else {
		next();
	}
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
