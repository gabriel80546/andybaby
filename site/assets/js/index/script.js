function getQuery(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}
function onLoad() {
	const pagina = getQuery("pagina");
	if(pagina == null) {
		API(gerarCard, "produto", "getCard", [{pagina: "1"}]);
	}
	else {
		API(gerarCard, "produto", "getCard", [{pagina: pagina}]);
		document.querySelector("#produtos").scrollIntoView();
	}
	login();
}
function gerarCard(card) {
	card = JSON.parse(card);
	if(card.length == 0) {
		const spinA = document.querySelector('div.loader');
		spinA.parentElement.removeChild(spinA);
		return;
	}
	const reRun = function (arg0, arg1) {
		for(var i = arg0; i < arg1; i++) {
			const cardHTML = document.querySelector('novocard');
			const cardWarper = cardHTML.parentElement;

			const div1 = document.createElement("div");
			div1.setAttribute("class", "col-lg-3 col-md-6 mb-4");
			cardWarper.insertAdjacentElement('beforeend', div1);

			const div2 = document.createElement("div");
			div2.setAttribute("class", "card");
			div1.insertAdjacentElement('beforeend', div2);

			const div3 = document.createElement("div");
			div3.setAttribute("class", "view overlay");
			div2.insertAdjacentElement('beforeend', div3);

			// IMAGEM
			const img = document.createElement("img");
			img.setAttribute("src", card[i].CAMINHO.replace("/home/gabriel/desktop/Desenvolvimento/Web/andybaby/site/",""));
			img.setAttribute("class", "card-img-top");
			div3.insertAdjacentElement('beforeend', img);

			const a1 = document.createElement("a");
			a1.setAttribute("href", "product-page.html?produto=" + card[i].ID);
			div3.insertAdjacentElement('beforeend', a1);

			const div4 = document.createElement("div");
			div4.setAttribute("class", "mask rgba-white-slight waves-effect waves-light");
			a1.insertAdjacentElement('beforeend', div4);

			const div5 = document.createElement("div");
			div5.setAttribute("class", "card-body text-center");
			div2.insertAdjacentElement('beforeend', div5);

			const a2 = document.createElement("a");
			a2.setAttribute("class", "grey-text");
			a2.setAttribute("href", "product-page.html?produto=" + card[i].ID);
			div5.insertAdjacentElement('beforeend', a2);

			// COR
			const h5 = document.createElement("h5");
			h5.innerHTML = card[i].COR;
			a2.insertAdjacentElement('beforeend', h5);

			const h5a = document.createElement("h5");
			div5.insertAdjacentElement('beforeend', h5a);

			const strong = document.createElement("strong");
			h5a.insertAdjacentElement('beforeend', strong);

			// NOME
			const a3 = document.createElement("a");
			a3.setAttribute("class", "dark-grey-text");
			a3.setAttribute("href", "product-page.html?produto=" + card[i].ID);
			a3.innerHTML = card[i].NOME;
			strong.insertAdjacentElement('beforeend', a3);

			const h4 = document.createElement("h4");
			h4.setAttribute("class", "font-weight-bold blue-text");
			div5.insertAdjacentElement('beforeend', h4);

			const h4a = document.createElement("h4");
			h4a.setAttribute("class", "font-weight-bold blue-text");
			div5.insertAdjacentElement('beforeend', h4a);

			// PRECO_ATACADO
			const strong1 = document.createElement("strong");
			strong1.setAttribute("data-toggle", "tooltip");
			strong1.setAttribute("data-placement", "left");
			strong1.setAttribute("title", "Atacado");
			const n = new Number(card[i].PRECO_ATACADO);
			strong1.innerHTML = "R$ " + n.toPrecision(Math.floor(Math.log10(n)) + 3).toString().replace("\.", ",");
			h4.insertAdjacentElement('beforeend', strong1);

			$(function () {
				$('[data-toggle="tooltip"]').tooltip()
			})
		}
	}
	reRun(0, 1);
	const spinA = document.querySelector('div.loader');
	spinA.parentElement.removeChild(spinA);
	reRun(1, card.length);
}
