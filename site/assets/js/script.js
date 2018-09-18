function onLoad() {
	var mepega = document.querySelectorAll("mepegaImg");
	const lengueImg = mepega.length;
	for(var i = 0; i < lengueImg; i++) {
		loadDoc(i+1, 'CAMINHO', mepega[i]);
	}

	var mepega = document.querySelectorAll("mepegaNome");
	const lengueNome =  mepega.length;
	for(var i = 0; i < lengueNome; i++) {
		loadDoc(i+1, 'NOME', mepega[i]);
	}

	var mepega = document.querySelectorAll("mepegaCor");
	const lengueCor = mepega.length;
	for(var i = 0; i < lengueCor; i++) {
		loadDoc(i+1, 'COR', mepega[i]);
	}

	var mepega = document.querySelectorAll("mepegaPreco");
	const lenguePreco = mepega.length;
	for(var i = 0; i < lenguePreco; i++) {
		loadDoc(i+1, 'PRECO_ATACADO', mepega[i]);
	}
	//gerarCard(img, cor, nome, preco);
	gerarCard("assets/img/db/04.jpg", "AZUL", "IPANEMA", "12.5");
	gerarCard("assets/img/db/05.jpg", "ROSA", "IPANEMA", "12.5");
}
function loadDoc(id, coluna, cursor) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(cursor.tagName == "MEPEGAIMG") {
				genImg(this.responseText, cursor);
			} else if(cursor.tagName == "MEPEGANOME") {
				genNome(this.responseText, cursor);
			} else if(cursor.tagName == "MEPEGACOR") {
				genCor(this.responseText, cursor);
			} else if(cursor.tagName == "MEPEGAPRECO") {
				genPreco(this.responseText, cursor);
			}
		}
	};
	xhttp.open("GET", "?id=" + id + "&coluna=" + coluna, true);
	xhttp.send();
}
function genImg(arg0, element) {
	var imagem = document.createElement("img");
	var parente = element.parentElement;
	imagem.setAttribute("src", arg0.replace("/home/gabriel/desktop/Desenvolvimento/Web/andybaby/site",""));
	imagem.setAttribute("class", "card-img-top");
	parente.insertAdjacentElement('afterbegin', imagem);
	parente.removeChild(element);
}
function genNome(arg0, element) {
	var imagem = document.createElement("a");
	var parente = element.parentElement;
	imagem.setAttribute("class", "dark-grey-text");
	imagem.innerHTML = arg0;
	parente.insertAdjacentElement('afterbegin', imagem);
	parente.removeChild(element);
}
function genCor(arg0, element) {
	var imagem = document.createElement("h5");
	var parente = element.parentElement;
	imagem.innerHTML = arg0;
	parente.insertAdjacentElement('afterbegin', imagem);
	parente.removeChild(element);
}
function genPreco(arg0, element) {
	var imagem = document.createElement("strong");
	var parente = element.parentElement;
	imagem.innerHTML = "R$ " + arg0.replace("\.", ",");
	parente.insertAdjacentElement('afterbegin', imagem);
	parente.removeChild(element);
}




function level1 (next) {
	next();
}

function level2 (next) {
	next();

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
