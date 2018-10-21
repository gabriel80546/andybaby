function API(callback, DAL, metodo, args) {
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			callback(this.responseText);
		}
	};
	xhttp.open("GET", "/?DAL=" + DAL + "&metodo=" + metodo + generateArgs(args), true);
	xhttp.send();
	function generateArgs(args) {
		var saida = new String();
		for(var i = 0; i < args.length; i++) {
			saida += "&";
			saida += Object.keys(args[i])[0];
			saida += "=";
			saida += args[i][Object.keys(args[i])[0]];
		}
		return saida;
	}
}
