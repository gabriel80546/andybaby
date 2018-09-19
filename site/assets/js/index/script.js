
window.card = new Object();
window.card.orded = false;
window.card.id    = new Array();
window.card.img   = { corpo: new Array() , id: new Array() };
window.card.nome  = { corpo: new Array() , id: new Array() };
window.card.cor   = { corpo: new Array() , id: new Array() };
window.card.preco = { corpo: new Array() , id: new Array() };

function onLoad() {
	for(var i = 1; i <= 9; i++) {
		window.card.id.push(i);
		loadDoc(i, 'CAMINHO');
		loadDoc(i, 'COR');
		loadDoc(i, 'NOME');
		loadDoc(i, 'PRECO_ATACADO');
	}
}

function loadDoc(id, coluna) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("COLUNA: " + coluna + " CONTEUDO: " + this.responseText);
			if(coluna == "CAMINHO") {
				pushImg(this.responseText, id);
			} else if(coluna == "COR") {
				pushCor(this.responseText, id);
			} else if(coluna == "NOME") {
				pushNome(this.responseText, id);
			} else if(coluna == "PRECO_ATACADO") {
				pushPreco(this.responseText, id);
			}
		}
	};
	xhttp.open("GET", "?id=" + id + "&coluna=" + coluna, true);
	xhttp.send();
}

function pushImg(arg0, arg1) {
	window.card.img.corpo.push(arg0);
	window.card.img.id.push(arg1);
	checkAndRemoveCompletedCard();
}
function pushCor(arg0, arg1) {
	window.card.cor.corpo.push(arg0);
	window.card.cor.id.push(arg1);
	checkAndRemoveCompletedCard();
}
function pushNome(arg0, arg1) {
	window.card.nome.corpo.push(arg0);
	window.card.nome.id.push(arg1);
	checkAndRemoveCompletedCard();
}
function pushPreco(arg0, arg1) {
	window.card.preco.corpo.push(arg0);
	window.card.preco.id.push(arg1);
	checkAndRemoveCompletedCard();
}

function checkAndRemoveCompletedCard() {

	if(window.card.img.corpo.length  > 0 &&
	   window.card.cor.corpo.length  > 0 &&
	   window.card.nome.corpo.length > 0 &&
	   window.card.preco.corpo.length > 0 &&
	   window.card.id.length > 0) {

		console.log("CARD COMPLETED");
		console.log("orded? " + isOreded() + ".");
		if(isOreded() == false) {
			reOrder();
		}
		if(isOreded()) {
			console.log("id " + window.card.id[0]);
			console.log(window.card.img.corpo[0], window.card.img.id[0]);
			console.log(window.card.cor.corpo[0], window.card.cor.id[0]);
			console.log(window.card.nome.corpo[0], window.card.nome.id[0]);
			console.log(window.card.preco.corpo[0], window.card.preco.id[0]);

			gerarCard(window.card.img.corpo[0],
				  window.card.cor.corpo[0],
				  window.card.nome.corpo[0],
				  window.card.preco.corpo[0],
				  window.card.id[0]);
			window.card.img.corpo.splice(0, 1);
			window.card.img.id.splice(0, 1);
			window.card.cor.corpo.splice(0, 1);
			window.card.cor.id.splice(0, 1);
			window.card.nome.corpo.splice(0, 1);
			window.card.nome.id.splice(0, 1);
			window.card.preco.corpo.splice(0, 1);
			window.card.preco.id.splice(0, 1);
			window.card.id.splice(0, 1);
		}
	}
}
function isOreded() {
	return window.card.id[0] == window.card.img.id[0] &&
	       window.card.id[0] == window.card.cor.id[0] &&
	       window.card.id[0] == window.card.nome.id[0] &&
	       window.card.id[0] == window.card.preco.id[0];
}
function reOrder() {

	var possible = false;
	debugger;
	var currentId = window.card.id[0];
	if(currentId != window.card.img.id[0]) {
		if(swap(currentId, window.card.img) == false) {
			return;
		}
	}
	if(currentId != window.card.cor.id[0]) {
		if(swap(currentId, window.card.cor) == false) {
			return;
		}
	}
	if(currentId != window.card.nome.id[0]) {
		if(swap(currentId, window.card.nome) == false) {
			return;
		}
	}
	if(currentId != window.card.preco.id[0]) {
		if(swap(currentId, window.card.preco) == false) {
			return;
		}
	}
	function swap(id, card) {
		for(var i = 0; i < card.id.length; i++) {
			if(id == card.id[i]) {
				var tmp = card.id[0];
				card.id[0] = card.id[i];
				card.id[1] = tmp;
				tmp = card.corpo[0];
				card.corpo[0] = card.corpo[i];
				card.corpo[1] = tmp;
				possible = true;
				break;
			}
		}
		if(possible == false) {
			return false;
		}
	}
	return true;
}

function gerarCard(imgCaminho, cor, nome, preco, id) {
	var card = document.querySelector('novocard');
	var cardWarper = card.parentElement;

	var div1 = document.createElement("div");
	div1.setAttribute("class", "col-lg-3 col-md-6 mb-4");
	cardWarper.insertAdjacentElement('beforeend', div1);

	var div2 = document.createElement("div");
	div2.setAttribute("class", "card");
	div1.insertAdjacentElement('beforeend', div2);

	var div3 = document.createElement("div");
	div3.setAttribute("class", "view overlay");
	div2.insertAdjacentElement('beforeend', div3);

	// IMAGEM
	var img = document.createElement("img");
	img.setAttribute("src", imgCaminho.replace("/home/gabriel/desktop/Desenvolvimento/Web/andybaby/site","") + "?random=" + Math.random());
	img.setAttribute("class", "card-img-top");
	div3.insertAdjacentElement('beforeend', img);

	var a1 = document.createElement("a");
	a1.setAttribute("href", "product-page.html?produto=" + id);
	div3.insertAdjacentElement('beforeend', a1);

	var div4 = document.createElement("div");
	div4.setAttribute("class", "mask rgba-white-slight waves-effect waves-light");
	a1.insertAdjacentElement('beforeend', div4);

	var div5 = document.createElement("div");
	div5.setAttribute("class", "card-body text-center");
	div2.insertAdjacentElement('beforeend', div5);

	var a2 = document.createElement("a");
	a2.setAttribute("class", "grey-text");
	a2.setAttribute("href", "product-page.html?produto=" + id);
	div5.insertAdjacentElement('beforeend', a2);

	// COR
	var h5 = document.createElement("h5");
	h5.innerHTML = cor;
	a2.insertAdjacentElement('beforeend', h5);

	var h5a = document.createElement("h5");
	div5.insertAdjacentElement('beforeend', h5a);

	var strong = document.createElement("strong");
	h5a.insertAdjacentElement('beforeend', strong);

	// NOME
	var a3 = document.createElement("a");
	a3.setAttribute("class", "dark-grey-text");
	a3.setAttribute("href", "product-page.html?produto=" + id);
	a3.innerHTML = nome;
	strong.insertAdjacentElement('beforeend', a3);

	var h4 = document.createElement("h4");
	h4.setAttribute("class", "font-weight-bold blue-text");
	div5.insertAdjacentElement('beforeend', h4);

	var strong1 = document.createElement("strong");
	strong1.setAttribute("data-toggle", "tooltip");
	strong1.setAttribute("data-placement", "left");
	strong1.setAttribute("title", "Atacado");
	var n = new Number(preco);
	strong1.innerHTML = "R$ " + n.toPrecision(Math.floor(Math.log10(n)) + 3).toString().replace("\.", ",");
	h4.insertAdjacentElement('beforeend', strong1);

	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	})
}
