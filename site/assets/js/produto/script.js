
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
}

function loadDoc(id, coluna) {
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
	xhttp.open("GET", "?id=" + id + "&coluna=" + coluna, true);
	xhttp.send();
}
function genImg(arg0) {
	var mepega = document.querySelector('mepegaimg');
	var parente = mepega.parentElement;
	var imagem = document.createElement('img');
	imagem.setAttribute("src", arg0.replace("/home/gabriel/desktop/Desenvolvimento/Web/andybaby/site",""));
	imagem.setAttribute("class", "img-fluid");
	parente.insertAdjacentElement('beforeend', imagem);
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
