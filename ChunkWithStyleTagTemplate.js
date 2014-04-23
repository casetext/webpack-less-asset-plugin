var ConcatSource = require("webpack/node_modules/webpack-core/lib/ConcatSource");

function ChunkWithStyleTagTemplate(chunkTemplate) {
	this.chunkTemplate = chunkTemplate;
}
module.exports = ChunkWithStyleTagTemplate;

ChunkWithStyleTagTemplate.prototype.updateHash = function(hash) {
	hash.update("ChunkWithStyleTagTemplate");
	hash.update("2");
};

ChunkWithStyleTagTemplate.prototype.render = function(chunk, moduleTemplate, dependencyTemplates) {
	var source = new ConcatSource();
	if (chunk._chunkStyles) {
		var fnText = insertCss.toString();
		source.add("(("+fnText+")("+JSON.stringify+"));");
	}
	source.add(this.chunkTemplate.render(chunk, moduleTemplate, dependencyTemplates));
	source.rendered = true;
	return source;
};

function insertCss(css) {
	var style = document.createElement("style");
	style.setAttribute("type", "text/css");
	style.appendChild(document.createTextNode(css));
	document.getElementsByTagName("head")[0].appendChild(style);
}
