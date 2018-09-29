var DB = require('./baseDAL.js');

var usuario = {
	getUsuario: function (callback, ip) {
		DB.query("SELECT U.ID, U.NOME, count(CI.ID) AS CARRINHO FROM USUARIO U JOIN USUARIO_IPS UI ON U.ID=UI.ID_USUARIO JOIN CARRINHO C ON C.ID_USUARIO=U.ID JOIN CARRINHO_ITEMS CI ON C.ID=CI.ID_CARRINHO WHERE UI.IP='" + ip + "' AND UI.LOGADO='S' GROUP BY U.ID;", null, function (data, error) {
			console.log(data);
			if(data.length > 1) {
				for(var i = 1; i < data.length; i++) {
					DB.query("UPDATE USUARIO_IPS UI JOIN USUARIO U ON U.ID=UI.ID_USUARIO SET LOGADO='N' WHERE U.ID=" + data[i].ID + " AND UI.IP='" + ip + "';", null, function (data, error) {
						if(false) {
							const nada = true;
						}
					});
				}
			}
			DB.query("SELECT U.ID, U.NOME, count(CI.ID) AS CARRINHO FROM USUARIO U JOIN USUARIO_IPS UI ON U.ID=UI.ID_USUARIO JOIN CARRINHO C ON C.ID_USUARIO=U.ID JOIN CARRINHO_ITEMS CI ON C.ID=CI.ID_CARRINHO WHERE UI.IP='" + ip + "' AND UI.LOGADO='S' GROUP BY U.ID;", null, function (data, error) {
				console.log(data);
				callback(data);
			});
		});
	}
};
module.exports = usuario;


