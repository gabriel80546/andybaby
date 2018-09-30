function asdf(elementString, saida) {
	var element = str2DOMElement(elementString);

	debugger;
	(function tudo(arg0) {
		for(var i = 0; i < arg0.children.length; i++) {
			if(arg0.children[i].children.length > 1) {
				tudo(arg0.children[i]);
			}
		}
	})(element);
}
