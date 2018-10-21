function onLoad() {
	loginWithCallback(function(usuario) {
		if(typeof usuario.ID == "undefined") {
			return;
		}
		else {
			API(gerarCarrinho, "usuario", "getCarrinho", [{usuario: usuario.ID}]);
		}
	});
}
function gerarCarrinho(dados) {

	dados = JSON.parse(dados);
	console.log(dados, dados.length);
	const carrinhoCount2 = document.querySelector('mepegaCountCarrinho2');
	const span = document.createElement("span");
	span.setAttribute("class", "badge badge-secondary badge-pill");
	span.innerHTML = dados.length;
	carrinhoCount2.insertAdjacentElement('afterend', span);

	const carrinho = document.querySelector('mepegaCarrinhoItems');

	const catchBeforeLoad = function(start, end) {
		for(var i = start; i < end; i++) {
			const dado = dados[i];
			const LI_0 = document.createElement("LI");
			LI_0.setAttribute("class", "list-group-item d-flex justify-content-between lh-condensed");
			const DIV_1 = document.createElement("DIV");
			LI_0.insertAdjacentElement("beforeend", DIV_1);
			const H6_2 = document.createElement("H6");
			H6_2.setAttribute("class", "my-0");
			H6_2.innerHTML = dado.NOME; // NOME
			DIV_1.insertAdjacentElement("beforeend", H6_2);
			const SMALL_3 = document.createElement("SMALL");
			SMALL_3.setAttribute("class", "text-muted");
			SMALL_3.innerHTML = dado.COR; // COR
			DIV_1.insertAdjacentElement("beforeend", SMALL_3);
			const SPAN_4 = document.createElement("SPAN");
			SPAN_4.setAttribute("class", "text-muted");
			SPAN_4.innerHTML = dado.PRECO_ATACADO; // PRECO
			LI_0.insertAdjacentElement("beforeend", SPAN_4);

			carrinho.insertAdjacentElement('beforebegin', LI_0);
		}
	}
	catchBeforeLoad(0, 1);
	const googleLoad = document.querySelector('div.loader');
	googleLoad.parentElement.removeChild(googleLoad);
	catchBeforeLoad(1, dados.length);
}
