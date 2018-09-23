
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

function onLoad() {
	for(var i = 1; i <= 8; i++) {
		window.card.id.push(i);
		for(var j = 0; j < window.card.fields.length; j++) {
			loadDoc(i, window.card[window.card.fields[j]]);
		}
	}
}

function loadDoc(id, field) {
	var tabela = (field.coluna=="CAMINHO") ? "IMAGEM T" : "PRODUTO T";
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			push(this.responseText, field, id);
		}
	};
	xhttp.open("GET", "?coluna=" + field.coluna + "&tabela=" + tabela + "&where=T.ID=" + id , true);
	xhttp.send();
}

function push(DataAPI, field, id) {
	field.corpo.push(DataAPI);
	field.id.push(id);
	checkAndRemoveCompletedCard();
}

function checkAndRemoveCompletedCard() {
	reOrder();
	while(checkCompletion() && isOrded() == true) {
		gerarCard(window.card);
		for(var j = 0; j < window.card.fields.length; j++) {
			window.card[window.card.fields[j]].corpo.splice(0, 1);
			window.card[window.card.fields[j]].id.splice(0, 1);
		}
		window.card.id.splice(0, 1);
		reOrder();
	}
	function checkCompletion() {
		var isCompleted = true;
		for(var j = 0; j < window.card.fields.length; j++) {
			if(window.card[window.card.fields[j]].corpo.length == 0) {
				isCompleted = false;
				break;
			}
		}
		return isCompleted;
	}
}
function isOrded() {
	var isOrded = true;
	for(var j = 0; j < window.card.fields.length; j++) {
		if(window.card[window.card.fields[j]].id[0] != window.card.id[0]) {
			isOrded = false;
			break;
		}
	}
	return isOrded;
}
function reOrder() {
	var currentId = window.card.id[0];
	for(var j = 0; j < window.card.fields.length; j++) {
		if(currentId != window.card[window.card.fields[j]].id[0]) {
			swap(currentId, window.card[window.card.fields[j]]);
		}
	}
	function swap(id, card) {
		for(var i = 0; i < card.id.length; i++) {
			if(id == card.id[i]) {
				var tmp = card.id[0];
				card.id[0] = card.id[i];
				card.id[i] = tmp;
				tmp = card.corpo[0];
				card.corpo[0] = card.corpo[i];
				card.corpo[i] = tmp;
				return;
			}
		}
	}
	return;
}

function gerarCard(card) {
	var cardHTML = document.querySelector('novocard');
	var cardWarper = cardHTML.parentElement;

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
	img.setAttribute("src", card.img.corpo[0].replace("/home/gabriel/desktop/Desenvolvimento/Web/andybaby/site",""));
	img.setAttribute("class", "card-img-top");
	div3.insertAdjacentElement('beforeend', img);

	var a1 = document.createElement("a");
	a1.setAttribute("href", "product-page.html?produto=" + card.id[0]);
	div3.insertAdjacentElement('beforeend', a1);

	var div4 = document.createElement("div");
	div4.setAttribute("class", "mask rgba-white-slight waves-effect waves-light");
	a1.insertAdjacentElement('beforeend', div4);

	var div5 = document.createElement("div");
	div5.setAttribute("class", "card-body text-center");
	div2.insertAdjacentElement('beforeend', div5);

	var a2 = document.createElement("a");
	a2.setAttribute("class", "grey-text");
	a2.setAttribute("href", "product-page.html?produto=" + card.id[0]);
	div5.insertAdjacentElement('beforeend', a2);

	// COR
	var h5 = document.createElement("h5");
	h5.innerHTML = card.cor.corpo[0];
	a2.insertAdjacentElement('beforeend', h5);

	var h5a = document.createElement("h5");
	div5.insertAdjacentElement('beforeend', h5a);

	var strong = document.createElement("strong");
	h5a.insertAdjacentElement('beforeend', strong);

	// NOME
	var a3 = document.createElement("a");
	a3.setAttribute("class", "dark-grey-text");
	a3.setAttribute("href", "product-page.html?produto=" + card.id[0]);
	a3.innerHTML = card.nome.corpo[0];
	strong.insertAdjacentElement('beforeend', a3);

	var h4 = document.createElement("h4");
	h4.setAttribute("class", "font-weight-bold blue-text");
	div5.insertAdjacentElement('beforeend', h4);

	var h4a = document.createElement("h4");
	h4a.setAttribute("class", "font-weight-bold blue-text");
	div5.insertAdjacentElement('beforeend', h4a);

	// PRECO_ATACADO
	var strong1 = document.createElement("strong");
	strong1.setAttribute("data-toggle", "tooltip");
	strong1.setAttribute("data-placement", "left");
	strong1.setAttribute("title", "Atacado");
	var n = new Number(card.precoAtacado.corpo[0]);
	strong1.innerHTML = "R$ " + n.toPrecision(Math.floor(Math.log10(n)) + 3).toString().replace("\.", ",");
	h4.insertAdjacentElement('beforeend', strong1);

/*
	// PRECO_VAREJO
	var strong2 = document.createElement("strong");
	strong2.setAttribute("data-toggle", "tooltip");
	strong2.setAttribute("data-placement", "left");
	strong2.setAttribute("title", "Varejo");
	var n1 = new Number(card.precoVarejo.corpo[0]);
	strong2.innerHTML += "R$ " + n1.toPrecision(Math.floor(Math.log10(n1)) + 3).toString().replace("\.", ",");
	h4a.insertAdjacentElement('beforeend', strong2);
*/

	$(function () {
		$('[data-toggle="tooltip"]').tooltip()
	})
}
