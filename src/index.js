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
			scope: 3
		},
		{
			name: "export",
			items: ["pdf", "html", "online hosted"],
			scope: 1
		},
		{
			name: "security",
			items: ["user", "3rd party", "magic link"],
			scope: 2
		}
	]
};

const config = {
	height: 600,
	width: 600,
	margin: 30,
	labelOffset: 15,
	minRadius: 50,
	color: "#E6E6E6",
	scopeColor: "#54A55F"
};

class RadarChart {
	constructor(height, width, data) {
		this.height = height;
		this.width = width;
		this.polygon = [];
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
			const isCurrentAxisBigger = currentAxis > layers
			layers = isCurrentAxisBigger ? currentAxis : layers;
		}
		this.layers = layers;
	}

	_drawCircles() {
		this._calcLayers()

		for (let i = 0; i <= this.layers + 1; i++) {
			this.circleStep = (this.height / 2 - config.margin) / this.layers;
			const radius = this.circleStep * i;

			this.svg
				.append("circle")
				.attr("class", 'circle-background')
				.attr("cx", this.origin.x)
				.attr("cy", this.origin.y)
				.attr("r", radius - config.margin);
		}
	}

	_drawLines(angle) {
		this.svg
			.append("line")
			.attr("x1", this.origin.x)
			.attr("y1", this.origin.y)
			.attr("x2", this.origin.x)
			.attr("y2", 0 + this.circleStep / 2)
			.attr('class', 'axis')
			.attr(
				"transform",
				`rotate(${angle}, ${this.origin.x}, ${this.origin.y})`
			);
	}

	_drawLabel(angle, name) {
		var labelX = this.origin.x + (this.height / 2) * Math.sin(0);
		var labelY =
			this.origin.y -
			(this.height / 2) * Math.cos(0) +
			config.margin -
			config.labelOffset;

		this.svg
			.append("text")
			.attr("x", labelX)
			.attr("y", labelY)
			.attr('class', 'label')
			.text(name)
			.attr(
				"transform",
				`rotate(${angle}, ${this.origin.x}, ${this.origin.y})`
			);
	}

	_drawItems(angle, items) {
		items.forEach((item, index) => {
			var labelX = this.origin.x + (this.height / 2) * Math.sin(0);
			const offset = 15;
			var labelY = this.origin.y - index * this.circleStep - offset;

			this.svg
				.append("text")
				.attr("x", labelX)
				.attr("y", labelY)
				.attr('class', 'axis-item')
				.text(item)
				.attr(
					"transform",
					`rotate(${angle}, ${this.origin.x}, ${this.origin.y})`
				);
		});
	}

	_drawShape() {
		const radius = 4;
		this.polygon.forEach(({ x, y, angle }) => {
			this.svg
				.append("circle")
				.attr("class", "scope-point")
				.attr("cx", x)
				.attr("cy", y)
				.attr("r", radius)
				.attr(
					"transform",
					`rotate(${angle}, ${this.origin.x}, ${this.origin.y})`
				);
		});

		let polygonPoints = "";

		d3.selectAll(".scope-point").each(function(d) {
			var point = document.querySelector("svg").createSVGPoint(); //here roor is the svg's id
			point.x = d3.select(this).attr("cx"); //get the circle cx
			point.y = d3.select(this).attr("cy"); //get the circle cy
			var newPoint = point.matrixTransform(this.getCTM()); //new point after the transform
			polygonPoints += `${newPoint.x},${newPoint.y} `;
		});

		this.svg
			.append("polygon")
			.attr("points", polygonPoints)
			.attr('class', 'scope')
	}

	_calcPolygon(angle, scope) {
		var dotX = this.origin.x + (this.height / 2) * Math.sin(0);
		var dotY = this.origin.y - ((scope + 1) * this.circleStep - 30);

		this.polygon.push({
			x: dotX,
			y: dotY,
			angle: angle
		});
	}

	draw() {
		this._drawCircles();
		for (let i = 0; i <= this.axes.length - 1; i++) {
			let angle = (360 / this.axes.length) * (i + 1);
			const axis = this.axes[i];
			// Manage edge case of two axis
			if (this.axes.length === 2) {
				if (angle === 360) angle = -45;
				if (angle === 180) angle = 45;
			}
			this._drawLines(angle);
			this._drawLabel(angle, axis.name);
			this._calcPolygon(angle, axis.scope);
			this._drawItems(angle, axis.items);
		}
		this._drawShape();
	}
}

const mvpGraph = new RadarChart(config.height, config.width, mvpData);
mvpGraph.draw();
