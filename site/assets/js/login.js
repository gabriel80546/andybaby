
/*
function onLoad() {
	loadDocDALUsuario("usuario", "getUsuario");
}
*/
function login() {
	loadDocDALUsuario("usuario", "getUsuario");
}

function loadDocDALUsuario(DAL, metodo, pagina) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			gerarUsuario(this.responseText);
		}
	};
	xhttp.open("GET", "/?DAL=" + DAL + "&metodo=" + metodo, true);
	xhttp.send();
}
function gerarUsuario(dados) {
	var nome = new String();
	dados == "ANONIMO" ? nome = "ANONIMO" : nome = JSON.parse(dados)[0].NOME;
	const mepega = document.querySelector('mepegaNome');
	const parente = mepega.parentElement;
	const p = document.createElement('p');
	p.setAttribute("class", "lead");
	p.setAttribute("style", "margin: 3px;");
	p.innerHTML = nome;
	parente.insertAdjacentElement('afterend', p);
	const subParente = parente.parentElement;
	subParente.removeChild(parente);

	if(dados=="ANONIMO") { return; }


	dados = JSON.parse(dados)[0];
	dados.CARRINHO = new Number(dados.CARRINHO);
	if(dados.CARRINHO == 0) { return; }

	const mepegaCarrinho = document.querySelector('mepegaCountCarrinho');
	const count = document.createElement('span');
	count.setAttribute("class", "badge red z-depth-1 mr-1");
	count.innerHTML = " " + dados.CARRINHO + " ";
	mepegaCarrinho.parentElement.insertAdjacentElement('afterbegin', count);
}
