var DB = require('./baseDAL.js');

var produto = {
	getCard: function (callback, pagina) {
		DB.query("SELECT P.ID, P.NOME, P.PRECO_ATACADO, P.COR, I.CAMINHO FROM PRODUTO P JOIN IMAGEM I ON P.ID=I.ID_PRODUTO;",
		null, function (data, error) {
			var inicio = ((pagina-1) * 8);
			var fim = 8 + ((pagina-1) * 8);
			callback(data.slice(inicio, fim), error);
		});
	}
};
module.exports = produto;
