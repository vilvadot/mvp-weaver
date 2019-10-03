import * as d3 from "d3";

const mvpData = {
	axis: [
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
		}
	]
};

const layerWidth = 30;

class RadarChart {
	constructor(height, width, data) {
		this.height = height;
		this.width = width;
		this.data = data;
		this.svg = d3
			.select("body")
			.append("svg")
			.attr("width", this.width)
			.attr("height", this.height);
	}

	_getNumberOfCircles() {
		let layers = 0;
		for (let i = 0; i < this.data.axis.length; i++) {
			const currentAxis = this.data.axis[i].items.length;
			layers = currentAxis > layers ? currentAxis : layers;
		}
		return layers;
	}

	_drawCircles() {
		const layers = this._getNumberOfCircles();
		for (let i = 0; i <= layers; i++) {
			this.svg
				.append("circle")
				.attr("stroke", "black")
				.attr("fill", "transparent")
				.attr("cx", this.width / 2)
				.attr("cy", this.height / 2)
				.attr("r", (this.height / layers/2) * i);
		}
	}

	draw() {
		this._drawCircles();
	}
}

const mvpGraph = new RadarChart(500, 500, mvpData);
mvpGraph.draw();
