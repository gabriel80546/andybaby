
function onLoad() {
	getIp();
}
function onLoadAfterIp(ip) {
	console.log("ip: " + ip);
	getUsuario(ip);
}
function onLoadUsuario(id) {
	console.log("id: " + id);
	loadDoc("NOME", "USUARIO U", "U.ID=" + id);
	loadDoc("count(C.ID)", "CARRINHO C JOIN CARRINHO_ITEMS CI ON C.ID=CI.ID_CARRINHO", "C.ID_USUARIO=" + id);
	loadDocCarrinho("usuario", "getCarrinho", id);
}


function loadDocCarrinho(DAL, metodo, usuarioId) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			genCarrinho(this.responseText);
		}
	};
	xhttp.open("GET", "?DAL=" + DAL + "&metodo=" + metodo + "&usuarioId=" + usuarioId, true);
	xhttp.send();
}

function loadDoc(coluna, tabela, where) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(tabela == "CARRINHO C JOIN CARRINHO_ITEMS CI ON C.ID=CI.ID_CARRINHO") {
				genCountCarrinho(this.responseText, coluna, tabela, where);
			} else {
				console.log("NOME: " + this.responseText);
				genNome(this.responseText, coluna, tabela, where);
			}
		}
	};
	xhttp.open("GET", "?coluna=" + coluna + "&tabela=" + tabela + "&where=" + where , true);
	xhttp.send();
}

function getIp(coluna, tabela, where) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			onLoadAfterIp(this.responseText);
		}
	};
	xhttp.open("GET", "?ip=1");
	xhttp.send();
}
function getUsuario(ip) {
	coluna = "ID";
	tabela = "USUARIO U";
	where = "U.IP='" + ip + "' AND U.LOGADO='S'";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			onLoadUsuario(this.responseText);
		}
	};
	xhttp.open("GET", "?coluna=" + coluna + "&tabela=" + tabela + "&where=" + where , true);
	xhttp.send();
}
function getCarrinho(id) {
	coluna = "ID";
	tabela = "USUARIO U";
	where = "U.IP='" + ip + "' AND U.LOGADO='S'";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
		}
	};
	xhttp.open("GET", "?coluna=" + coluna + "&tabela=" + tabela + "&where=" + where , true);
	xhttp.send();
}

function genNome(dados, coluna, tabela, where) {
	var mepega = document.querySelector('mepegaNome');
	var parente = mepega.parentElement;
	var h1 = document.createElement('h6');
	h1.setAttribute("style", "padding: 8px");
	h1.innerHTML = dados;
	parente.insertAdjacentElement('afterbegin', h1);
}
function genCountCarrinho(dados, coluna, tabela, where) {


	var mepega = document.querySelector('mepegaCountCarrinho');
	var parente = mepega.parentElement;
	var span = document.createElement('span');
	span.setAttribute("class", "badge red z-depth-1 mr-1");
	span.innerHTML = " " + dados + " ";
	parente.insertAdjacentElement('afterbegin', span);

	mepega = document.querySelector('mepegaCountCarrinho2');
	parente = mepega;
	span = document.createElement('span');
	span.setAttribute("class", "badge badge-secondary badge-pill");
	span.innerHTML = " " + dados + " ";
	parente.insertAdjacentElement('afterend', span);
	return;
}
function genCarrinho(dados) {
	var carrinho = JSON.parse(dados);
	for(var i = 0; i < carrinho.length; i++) {
		console.log(carrinho[i]);
	}
}
