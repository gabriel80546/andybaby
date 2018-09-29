
function onLoad() {
//	loadDocDALCard("produto", "getCard", "1");
//	getLogin();
}

function loadDocDALCard(DAL, metodo, pagina) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			gerarCard(this.responseText);
		}
	};
	xhttp.open("GET", "?DAL=" + DAL + "&metodo=" + metodo + "&pagina=" + pagina, true);
	xhttp.send();
}
function gerarCard(card) {
	card = JSON.parse(card);
	var reRun = function (arg0, arg1) {
		for(var i = arg0; i < arg1; i++) {
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
			img.setAttribute("src", card[i].CAMINHO.replace("/home/gabriel/desktop/Desenvolvimento/Web/andybaby/site","/static"));
			img.setAttribute("class", "card-img-top");
			div3.insertAdjacentElement('beforeend', img);

			var a1 = document.createElement("a");
			a1.setAttribute("href", "product-page.html?produto=" + card[i].ID);
			div3.insertAdjacentElement('beforeend', a1);

			var div4 = document.createElement("div");
			div4.setAttribute("class", "mask rgba-white-slight waves-effect waves-light");
			a1.insertAdjacentElement('beforeend', div4);

			var div5 = document.createElement("div");
			div5.setAttribute("class", "card-body text-center");
			div2.insertAdjacentElement('beforeend', div5);

			var a2 = document.createElement("a");
			a2.setAttribute("class", "grey-text");
			a2.setAttribute("href", "product-page.html?produto=" + card[i].ID);
			div5.insertAdjacentElement('beforeend', a2);

			// COR
			var h5 = document.createElement("h5");
			h5.innerHTML = card[i].COR;
			a2.insertAdjacentElement('beforeend', h5);

			var h5a = document.createElement("h5");
			div5.insertAdjacentElement('beforeend', h5a);

			var strong = document.createElement("strong");
			h5a.insertAdjacentElement('beforeend', strong);

			// NOME
			var a3 = document.createElement("a");
			a3.setAttribute("class", "dark-grey-text");
			a3.setAttribute("href", "product-page.html?produto=" + card[i].ID);
			a3.innerHTML = card[i].NOME;
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
			var n = new Number(card[i].PRECO_ATACADO);
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
	}
	reRun(0, 1);
	const spinA = document.querySelector('div.cp-loading');
	spinA.parentElement.removeChild(spinA);
	reRun(1, card.length);
}
