function goRodape() {
	var ponto = document.querySelector('pontoRodape');
	var rodape = ponto.parentElement;
	var rodapeTopo = rodape.offsetTop
	window.scrollTo(0,rodapeTopo);
}
