
window.card = new Object();
window.card.id = new Array();
window.card.img           = { corpo: new Array() , id: new Array() , coluna: "CAMINHO" };
window.card.nome          = { corpo: new Array() , id: new Array() , coluna: "NOME" };
window.card.cor           = { corpo: new Array() , id: new Array() , coluna: "COR" };
window.card.precoAtacado  = { corpo: new Array() , id: new Array() , coluna: "PRECO_ATACADO" };
window.card.fields = [ "img" , "nome" , "cor" , "precoAtacado" ];

/*
window.card.precoVarejo   = { corpo: new Array() , id: new Array() , coluna: "PRECO_VAREJO" };
window.card.fields = [ "img" , "nome" , "cor" , "precoAtacado", "precoVarejo" ];
*/

function getQuery(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

function onLoad() {
	var produtoId = getQuery("produto");
	if(produtoId == null) {
		window.location.href = "/";

	} else {
		console.log("produtoId = " + produtoId);
		loadDoc(produtoId, "CAMINHO");
		loadDoc(produtoId, "PRECO_ATACADO");
		loadDoc(produtoId, "NOME");
	}
	//getLogin();
}

function loadDoc(id, coluna) {
	var tabela = (coluna=="CAMINHO") ? "IMAGEM T" : "PRODUTO T";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(coluna == "CAMINHO") {
				genImg(this.responseText);
			} else if(coluna == "PRECO_ATACADO") {
				genPreco(this.responseText);
			} else if(coluna == "NOME") {
				genNome(this.responseText);
			}
		}
	};
	xhttp.open("GET", "/?id=" + id + "&coluna=" + coluna, true);
	xhttp.open("GET", "/?coluna=" + coluna + "&tabela=" + tabela + "&where=T.ID=" + id , true);
	xhttp.send();
}
function genImg(arg0) {
	var mepega = document.querySelector('mepegaimg');
	var parente = mepega.parentElement;
	var imagem = document.createElement('img');
	imagem.setAttribute("src", arg0.replace("/home/gabriel/desktop/Desenvolvimento/Web/andybaby/site/",""));
	imagem.setAttribute("class", "img-fluid");
	parente.insertAdjacentElement('beforeend', imagem);


	mepega = document.querySelector('mepegaIframe');
	parente = mepega.parentElement;
	var div = document.createElement('div');
	div.setAttribute("id", "map-container");
	div.setAttribute("class", "z-depth-1-half");
	if($(window).width() < 680) {
		div.setAttribute("style", "height: " + ($(window).width() - 40) * 0.75 + "px; width: " + $(window).width() - 40 + "px;");
	} else {
		div.setAttribute("style", "height: 480px; width: 640px;");
	}
	parente.insertAdjacentElement('beforeend', div);

	parente = div;
	var iframe = document.createElement('iframe');
	iframe.setAttribute("src", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0513014899443!2d-46.61639468502278!3d-23.530657184698068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x52ec440d7d9a68eb!2sAndy+Baby!5e0!3m2!1spt-BR!2sbr!4v1538139780851");
	if($(window).width() < 680) {
		iframe.setAttribute("width", $(window).width() - 40);
		iframe.setAttribute("height", ($(window).width() - 40) * 0.75);
	} else {
		iframe.setAttribute("width", "640");
		iframe.setAttribute("height", "480");
	}
	iframe.setAttribute("frameborder", "0");
	parente.insertAdjacentElement('beforeend', iframe);
	const spinA = document.querySelector('div.loader');
	spinA.parentElement.removeChild(spinA);
}
function genPreco(arg0) {
	var mepega = document.querySelector('mepegaPreco');
	var parente = mepega.parentElement;
	var span = document.createElement('span');
	var n = new Number(arg0);
	span.innerHTML = "R$ " + n.toPrecision(Math.floor(Math.log10(n)) + 3).toString().replace("\.", ",");
	parente.insertAdjacentElement('beforeend', span);
}
function genNome(arg0) {
	var mepega = document.querySelector('mepegaNome');
	var parente = mepega.parentElement;
	var p = document.createElement('p');
	var n = new Number(arg0);
	p.setAttribute("class", "lead font-weight-bold");
	p.innerHTML = arg0;
	parente.insertAdjacentElement('afterend', p);
	var subParente = parente.parentElement;
	subParente.removeChild(parente);
}

function getLogin() {
	getIp();
}
function onLoadAfterIp(ip) {
	console.log("ip: " + ip);
	getUsuario(ip);
}
function onLoadUsuario(id) {
	console.log("id: " + id);
	loadDocLogin("NOME", "USUARIO U", "U.ID=" + id);
	loadDocLogin("count(C.ID)", "CARRINHO C JOIN CARRINHO_ITEMS CI ON C.ID=CI.ID_CARRINHO", "C.ID_USUARIO=" + id);
}


function loadDocLogin(coluna, tabela, where) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(tabela == "CARRINHO C JOIN CARRINHO_ITEMS CI ON C.ID=CI.ID_CARRINHO") {
				genCountCarrinho(this.responseText, coluna, tabela, where);
			} else {
				console.log("NOME: " + this.responseText);
				genNome2(this.responseText, coluna, tabela, where);
			}
		}
	};
	xhttp.open("GET", "/?coluna=" + coluna + "&tabela=" + tabela + "&where=" + where , true);
	xhttp.send();
}

function getIp(coluna, tabela, where) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			onLoadAfterIp(this.responseText);
		}
	};
	xhttp.open("GET", "/?ip=1");
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
	xhttp.open("GET", "/?coluna=" + coluna + "&tabela=" + tabela + "&where=" + where , true);
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
	xhttp.open("GET", "/?coluna=" + coluna + "&tabela=" + tabela + "&where=" + where , true);
	xhttp.send();
}

function genNome2(dados, coluna, tabela, where) {
	var mepega = document.querySelector('mepegaNome2');
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
	return;
}
