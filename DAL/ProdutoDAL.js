const DB = require('./baseDAL.js');

const produto = {
	getCard: function (callback, pagina) {
		DB.query("SELECT P.ID, P.NOME, P.PRECO_ATACADO, P.COR, I.CAMINHO FROM PRODUTO P JOIN IMAGEM I ON P.ID=I.ID_PRODUTO;",
		null, function (data, error) {
			const inicio = ((pagina-1) * 8);
			const fim = 8 + ((pagina-1) * 8);
			callback(data.slice(inicio, fim), error);
		});
	},
	getProduto: function (callback, produto) {
		DB.query("SELECT P.ID, P.NOME, P.PRECO_ATACADO, P.COR, I.CAMINHO FROM PRODUTO P JOIN IMAGEM I ON P.ID=I.ID_PRODUTO WHERE P.ID = ?;",
		[produto], function (data, error) {
			callback(data, error);
		});
	}
};
module.exports = produto;
