var express = require('express');
var mysql = require('mysql');
var app = express();


var DB = require('./DAL/baseDAL.js');

var usuarioDAL = require('./DAL/UsuarioDAL.js');
var produtoDAL = require('./DAL/ProdutoDAL.js');


app.use('/', function(req, res, next) {
	if(req.originalUrl == "/" || req.originalUrl == "/index.html") {
		const ip = req.header('x-forwarded-for');
		console.log("[" + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + "]" + " ip: " + ip + " METHOD: " + req.method + " " + req.originalUrl);
		res.writeHead(302, {
		  'Location': 'https://www.andybaby.com.br/static'
		});
		res.end();
	}
	if(req.method == "GET" && req.query.DAL != null) {
		if(req.query.DAL == "usuario") {
			if (req.query.metodo == "getUsuario") {
				const ip = req.header('x-forwarded-for');
				usuarioDAL.getUsuario(function (data) {
					const validated = usuarioDAL.getUsuarioValidate(data);
					res.send(validated);
					res.end();
				}, ip);
			}
			else if (req.query.metodo == "getCarrinho") {
				usuarioDAL.getCarrinho(function (data) {
					res.send(data);
					res.end();
				}, req.query.usuario);
			}
		}
		else if(req.query.DAL == "produto") {
			if(req.query.metodo == "getCard") {
				produtoDAL.getCard(function (data) {
					res.send(data);
					res.end();
				}, req.query.pagina);
			}
			else if(req.query.metodo == "getProduto") {
				produtoDAL.getProduto(function (data) {
					res.send(data);
					res.end();
				}, req.query.produto);
			}
		}
	}
	else {
		next();
	}
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
