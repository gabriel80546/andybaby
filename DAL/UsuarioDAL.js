var DB = require('./baseDAL.js');

var usuario = {
	findAll: function (callback) {
		DB.query("SELECT * FROM USUARIO;", null, function (data, error) {
			callback(data, error);
		});
	} ,
	getCarrinho: function (callback, usuarioId) {
		DB.query("SELECT P.NOME, P.PRECO_ATACADO FROM USUARIO U JOIN CARRINHO C ON U.ID=C.ID_USUARIO JOIN CARRINHO_ITEMS CI ON C.ID=CI.ID_CARRINHO JOIN PRODUTO P ON P.ID=CI.ID_PRODUTO WHERE U.ID=" + usuarioId + ";", null, function (data, error) {
			callback(data, error);
		});
	}
};
module.exports = usuario;
