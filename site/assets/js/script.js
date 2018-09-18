
window.card = new Object();
window.card.img   = new Array();
window.card.nome  = new Array();
window.card.cor   = new Array();
window.card.preco = new Array();

function onLoad() {
	for(var i = 1; i <= 5; i++) {
		loadDoc(i, 'CAMINHO');
		loadDoc(i, 'COR');
		loadDoc(i, 'NOME');
		loadDoc(i, 'PRECO_ATACADO');
	}
	//gerarCard(img, cor, nome, preco);
	gerarCard("assets/img/db/04.jpg", "AZUL", "IPANEMA", "12.5");
	gerarCard("assets/img/db/05.jpg", "ROSA", "IPANEMA", "12.5");
}

function loadDoc(id, coluna) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("COLUNA: " + coluna + " CONTEUDO: " + this.responseText);
			if(coluna == "CAMINHO") {
				pushImg(this.responseText);
			} else if(coluna == "COR") {
				pushCor(this.responseText);
			} else if(coluna == "NOME") {
				pushNome(this.responseText);
			} else if(coluna == "PRECO_ATACADO") {
				pushPreco(this.responseText);
			}
		}
	};
	xhttp.open("GET", "?id=" + id + "&coluna=" + coluna, true);
	xhttp.send();
}

function pushImg(arg0) {
	window.card.img.push(arg0);
	checkAndRemoveCompletedCard();
}
function pushCor(arg0) {
	window.card.cor.push(arg0);
	checkAndRemoveCompletedCard();
}
function pushNome(arg0) {
	window.card.nome.push(arg0);
	checkAndRemoveCompletedCard();
}
function pushPreco(arg0) {
	window.card.preco.push(arg0);
	checkAndRemoveCompletedCard();
}

function checkAndRemoveCompletedCard() {
	if(window.card.img.length  > 0 &&
	   window.card.cor.length  > 0 &&
	   window.card.nome.length > 0 &&
	   window.card.preco.length > 0) {
		console.log("CARD COMPLETED");
		gerarCard(window.card.img[0].replace("/home/gabriel/desktop/Desenvolvimento/Web/andybaby/site",""),
		          window.card.cor[0],
		          window.card.nome[0],
		          window.card.preco[0]);
		window.card.img.splice(window.card.img[0], 1);
		window.card.cor.splice(window.card.cor[0], 1);
		window.card.nome.splice(window.card.nome[0], 1);
		window.card.preco.splice(window.card.preco.indexOf(window.card.preco[0]), 1);
	}
}





function gerarCard(imgCaminho, cor, nome, preco) {
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
	img.setAttribute("src", imgCaminho);
	img.setAttribute("class", "card-img-top");
	div3.insertAdjacentElement('beforeend', img);

	var a1 = document.createElement("a");
	div3.insertAdjacentElement('beforeend', a1);

	var div4 = document.createElement("div");
	div4.setAttribute("class", "mask rgba-white-slight waves-effect waves-light");
	a1.insertAdjacentElement('beforeend', div4);

	var div5 = document.createElement("div");
	div5.setAttribute("class", "card-body text-center");
	div2.insertAdjacentElement('beforeend', div5);

	var a2 = document.createElement("a");
	a2.setAttribute("class", "grey-text");
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
	//cardWarper.removeChild(card);
}
