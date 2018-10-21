function getQuery(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

window.usuario = new Object();
function onLoad() {
	const produto = getQuery("produto");
	produto == null ? window.location.href = "/static/" : API(genProduto, "produto", "getProduto", [{produto: getQuery("produto")}]);
	loginWithCallback(function(usuario) {
		if(typeof usuario.ID == "undefined") {
			window.usuario = null;
		}
		else {
			window.usuario = usuario;
		}
	});
}

function genProduto(dados) {
	dados = JSON.parse(dados)[0];
	// IMG
	var mepega = document.querySelector('mepegaimg');
	var parente = mepega.parentElement;
	const imagem = document.createElement('img');
	imagem.setAttribute("src", dados.CAMINHO.replace("/home/gabriel/desktop/Desenvolvimento/Web/andybaby/site/",""));
	imagem.setAttribute("class", "img-fluid");
	parente.insertAdjacentElement('beforeend', imagem);

	// REMOVE LOADER
	const spinA = document.querySelector('div.loader');
	spinA.parentElement.removeChild(spinA);

	// PRECO
	mepega = document.querySelector('mepegaPreco');
	parente = mepega.parentElement;
	const span = document.createElement('span');
	const n = new Number(dados.PRECO_ATACADO);
	span.innerHTML = "R$ " + n.toPrecision(Math.floor(Math.log10(n)) + 3).toString().replace("\.", ",");
	parente.insertAdjacentElement('beforeend', span);

	// NOME
	mepega = document.querySelector('mepegaNome2');
	parente = mepega.parentElement;
	const p = document.createElement('p');
	p.setAttribute("class", "lead font-weight-bold");
	p.innerHTML = dados.NOME;
	parente.insertAdjacentElement('afterend', p);
	const subParente = parente.parentElement;
	subParente.removeChild(parente);


	// GOOGLE MAPS
	mepega = document.querySelector('mepegaIframe');
	parente = mepega.parentElement;
	const div = document.createElement('div');
	div.setAttribute("id", "map-container");
	div.setAttribute("class", "z-depth-1-half");
	if($(window).width() < 680) {
		div.setAttribute("style", "height: " + ($(window).width() - 40) * 0.75 + "px; width: " + $(window).width() - 40 + "px;");
	} else {
		div.setAttribute("style", "height: 480px; width: 640px;");
	}
	parente.insertAdjacentElement('beforeend', div);
	parente = div;
	const iframe = document.createElement('iframe');
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
}
function addProduto() {
	if(window.usuario == null) {
		alert("Usuario não identificado");
	}
	else {
		API(function() { window.location.replace("/static/?pagina=1"); } ,
			"usuario",
			"insertProduto",
			[{usuario: window.usuario.ID}, {produto: getQuery("produto")}]
		);
	}
}
