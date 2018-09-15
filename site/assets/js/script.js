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
	imagem.innerHTML = "R$ " + arg0;
	parente.insertAdjacentElement('afterbegin', imagem);
	parente.removeChild(element);
}
