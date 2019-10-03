import * as d3 from "d3";

const mvpData = {
	axes: [
		{
			name: "apis",
			items: [
				"manual",
				"github",
				"linkedin",
				"gitlab",
				"slideshare",
				"xing",
				"import"
			],
			scope: 1
		},
		{
			name: "export",
			items: ["pdf", "html", "online hosted"],
			scope: 0
		},
		{
			name: "security",
			items: ["user", "3rd party", "magic link"],
			scope: 0
		}
	]
};

const config = {
	height: 500,
	width: 500,
	margin: 30,
	labelOffset: 5,
}

class RadarChart {
	constructor(height, width, data) {
		this.height = height;
		this.width = width;
		this.origin = {
			x: this.width / 2,
			y: this.height / 2
		};
		this.axes = data.axes;
		this.svg = d3
			.select("body")
			.append("svg")
			.attr("width", this.width)
			.attr("height", this.height);
	}

	_calcLayers() {
		let layers = 0;
		for (let i = 0; i < this.axes.length; i++) {
			const currentAxis = this.axes[i].items.length;
			layers = currentAxis > layers ? currentAxis : layers;
		}
		this.layers = layers;
	}

	_drawCircles() {
		for (let i = 0; i <= this.layers; i++) {
			const radius = (((this.height / this.layers) / 2) * i) - config.margin
			this.svg
				.append("circle")
				.attr("stroke", "black")
				.attr("fill", "transparent")
				.attr("cx", this.origin.x)
				.attr("cy", this.origin.y)
				.attr("r", radius);
		}
	}

	_drawAxes() {
		for (let i = 0; i <= this.axes.length - 1; i++) {
			const angle = (360 / this.axes.length) * (i + 1);
			const axis = this.axes[i]
			this._drawLines(angle);
			this._drawLabel(angle, axis.name);
			this._drawItems(angle, axis.items);
		}
	}

	_drawItems(angle, items){
		// this.svg
		// 	.
		var labelX = this.origin.x + (this.height / 2) * Math.sin(0);
		var labelY = (this.origin.y - (this.height / 2) * Math.cos(0)) + config.margin - config.labelOffset;
		
		this.svg
			.data(items)
			.enter()
			.append("text")
			.attr("x", labelX)
			.attr("y", labelY )
			.attr('fill', 'red')
			.attr('text-anchor', 'middle')
			.style("font-family", "sans-serif")
			.text('Labeled')
			.attr(
				"transform",
				`rotate(${angle}, ${this.origin.x}, ${this.origin.y})`
			);
	}

	_drawLines(angle) {
		this.svg
			.append("line")
			.attr("x1", this.origin.x)
			.attr("y1", this.origin.y)
			.attr("x2", this.origin.x)
			.attr("y2", 0 + config.margin)
			.style("stroke", "grey")
			.style("stroke-width", "1px")
			.attr(
				"transform",
				`rotate(${angle}, ${this.origin.x}, ${this.origin.y})`
			);
	}

	_drawLabel(angle, name) {
		var labelX = this.origin.x + (this.height / 2) * Math.sin(0);
		var labelY = (this.origin.y - (this.height / 2) * Math.cos(0)) + config.margin - config.labelOffset;
		
		this.svg
			.append("text")
			.attr("x", labelX)
			.attr("y", labelY )
			.attr('fill', 'black')
			.attr('text-anchor', 'middle')
			.style("font-family", "sans-serif")
			.style("text-transform", "capitalize")
			.text(name)
			.attr(
				"transform",
				`rotate(${angle}, ${this.origin.x}, ${this.origin.y})`
			);
	}

	draw() {
		this._calcLayers();
		this._drawCircles();
		this._drawAxes();
	}
}

const mvpGraph = new RadarChart(config.height, config.width, mvpData);
mvpGraph.draw();
