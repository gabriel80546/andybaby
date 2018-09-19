
function getQuery(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

function onLoad() {
	console.log("produto = " + getQuery("produto"));
	loadDoc(getQuery("produto"), "CAMINHO");
}

function loadDoc(id, coluna) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if(coluna == "CAMINHO") {
				genImg(this.responseText);
			}
		}
	};
	xhttp.open("GET", "?id=" + id + "&coluna=" + coluna, true);
	xhttp.send();
}
function genImg(arg0) {
	console.log(arg0);
	var mepega = document.querySelector('mepegaimg');
	var parente = mepega.parentElement;
	console.log(parente);
	var imagem = document.createElement('img');
	imagem.setAttribute("src", arg0.replace("/home/gabriel/desktop/Desenvolvimento/Web/andybaby/site","") + "?random=" + Math.random());
	imagem.setAttribute("class", "img-fluid");
	parente.insertAdjacentElement('beforeend', imagem);
}
