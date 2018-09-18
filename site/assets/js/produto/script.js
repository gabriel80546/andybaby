
function getQuery(q) {
	return (window.location.search.match(new RegExp('[?&]' + q + '=([^&]+)')) || [, null])[1];
}

function onLoad() {
	console.log("produto = " + getQuery("produto"));
}
