function onLoad() {
	login(function(usuario) { 
		console.log(usuario.ID);
		if(typeof usuario.ID === undefined) {
			const nada = true;
		} else {
			loadDocDALCard("usuario", "getCarrinho", usuario.ID);
		}
	});
}
function loadDocDALCard(DAL, metodo, usuarioId) {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			gerarCarrinho(this.responseText);
		}
	};
	xhttp.open("GET", "/?DAL=" + DAL + "&metodo=" + metodo + "&usuario=" + usuarioId, true);
	xhttp.send();
}
function gerarCarrinho(dados) {

	dados = JSON.parse(dados);
/*	var saida = "";
	for(var i = 0; i < dados.length; i++) {
		saida = saida + "item" + i + ": " + dados[i].NOME + ";\n";
	}
	console.log(saida);
*/
	console.log('<li class="list-group-item d-flex justify-content-between lh-condensed"> <div> <h6 class="my-0">Product name</h6> <small class="text-muted">Brief description</small> </div> <span class="text-muted">$12</span> </li> ');
}
