const DB = require('./baseDAL.js');

const usuario = {
	getUsuario: function (callback, ip) {
		DB.query("SELECT U.ID, U.NOME, count(CI.ID) AS CARRINHO FROM USUARIO U JOIN USUARIO_IPS UI ON U.ID=UI.ID_USUARIO JOIN CARRINHO C ON C.ID_USUARIO=U.ID JOIN CARRINHO_ITEMS CI ON C.ID=CI.ID_CARRINHO WHERE UI.IP='" + ip + "' AND UI.LOGADO='S' GROUP BY U.ID;", null, function (data, error) {
			if(data.length > 1) {
				for(var i = 1; i < data.length; i++) {
					DB.query("UPDATE USUARIO_IPS UI JOIN USUARIO U ON U.ID=UI.ID_USUARIO SET LOGADO='N' WHERE U.ID=" + data[i].ID + " AND UI.IP='" + ip + "';", null, function (data, error) { const nada = true; });
				}
			}
			DB.query("SELECT U.ID, U.NOME, count(CI.ID) AS CARRINHO FROM USUARIO U JOIN USUARIO_IPS UI ON U.ID=UI.ID_USUARIO JOIN CARRINHO C ON C.ID_USUARIO=U.ID JOIN CARRINHO_ITEMS CI ON C.ID=CI.ID_CARRINHO WHERE UI.IP='" + ip + "' AND UI.LOGADO='S' GROUP BY U.ID;", null, function (data, error) {
				callback(data);
			});
		});
	} ,
	getUsuarioValidate: function (data) {
		var saida;
		if(data.length == 0) {
			saida = "ANONIMO";
		}
		else if(data.length > 1) {
			saida = "MAIS DE 1 LOGADO NO MESMO IP";
		}
		else if(data.length == 1) {
			saida = data;
		}
		return saida;
	} ,
	getCarrinho: function (callback, id) {
		DB.query("SELECT P.ID, P.PRECO_ATACADO, P.PRECO_VAREJO, P.REFERENCIA, P.NOME, P.COR FROM USUARIO U JOIN CARRINHO C ON U.ID=C.ID_USUARIO JOIN CARRINHO_ITEMS CI ON C.ID=CI.ID_CARRINHO JOIN PRODUTO P ON CI.ID_PRODUTO=P.ID WHERE U.ID=" + id + ";", null, function (data, error) {
			callback(data);
		});
	}
};
module.exports = usuario;
