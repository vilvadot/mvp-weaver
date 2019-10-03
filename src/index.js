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

const layerWidth = 30;

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
			this.svg
				.append("circle")
				.attr("stroke", "black")
				.attr("fill", "transparent")
				.attr("cx", this.origin.x)
				.attr("cy", this.origin.y)
				.attr("r", (this.height / this.layers / 2) * i);
		}
	}

	_drawAxes() {
		for (let i = 0; i <= this.axes.length - 1; i++) {
			const degrees = (360 / this.axes.length) * (i+1)
			this.svg
				.append("line")
				.attr("x1", this.origin.x)
				.attr("y1", this.origin.y)
				.attr("x2", this.origin.x)
				.attr("y2", 0)
				.style("stroke", "grey")
				.style("stroke-width", "1px")
				.attr("transform", `rotate(${degrees}, ${this.origin.x}, ${this.origin.y})`)
		}
	}

	_drawBox() {
		var chairOriginX = this.origin.x + (this.height / 2) * Math.sin(0);
		var chairOriginY = this.origin.y - (this.height / 2) * Math.cos(0);
		this.svg
			.append("rect")
			.attr("x", chairOriginX - 20 / 2)
			.attr("y", chairOriginY - 20 / 2)
			.attr("width", 20)
			.attr("height", 20)
			.attr("stroke", "blue")
			.attr("transform", `rotate(45, ${this.origin.x}, ${this.origin.y})`);
	}

	draw() {
		this._calcLayers();
		this._drawCircles();
		this._drawAxes();
		this._drawBox();
	}
}

const mvpGraph = new RadarChart(500, 500, mvpData);
mvpGraph.draw();
