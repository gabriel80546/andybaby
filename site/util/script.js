window.numeroVariavel = new Number(0);
window.output;
function asdf(bixo, saida) {
	const oloco = str2DOMElement(bixo);
	window.output = saida;
	walker(oloco);
}

function walker(node) {
	if(node.children.length > 0) {
		printarElemento(node);
		for(var i = 0; i < node.children.length; i++) {
			walker(node.children[i]);
		}
	}
	else {
		printarElemento(node);
	}
}

function printarElemento(arg0) {
	const currentVarName = arg0.tagName + "_" + window.numeroVariavel;
	window.output.innerHTML += new String("const " + currentVarName + " = document.createElement(\"" + arg0.tagName + "\");\n");
	for(var i = 0; i < arg0.attributes.length; i++) {
		window.output.innerHTML += new String(currentVarName + ".setAttribute(\"" + arg0.attributes[i].name + "\", \"" + arg0.attributes[i].value + "\");\n");
	}
	if(arg0.parentElement.getAttribute("mepegavarinjected") != null) {
		window.output.innerHTML += new String(arg0.parentElement.getAttribute("mepegavarinjected") + ".insertAdjacentElement(\"beforeend\", " + currentVarName + ");\n");
	}
	arg0.setAttribute("mepegavarinjected", currentVarName);
	window.numeroVariavel = new Number(window.numeroVariavel + 1);
}
