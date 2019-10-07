import * as d3 from "d3";
import canvg from "canvg";

const config = {
  initialLayers: 7,
  margin: 30,
  labelOffset: 15,
  minRadius: 50,
  font: "Arial",
  colors: {
    scope: "#54A55F",
    label: "#000",
    scale: "#E6E6E6"
  }
};

class RadarChart {
  constructor(height, width, axes, id = "radar-chart") {
    this.height = height;
    this.width = width;
    this.polygon = [];
    this.origin = {
      x: this.width / 2,
      y: this.height / 2
    };
    this.id = `#${id}`;
    this.axes = axes;
    this.svg = d3
      .select(this.id)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
  }

  _calcLayers() {
    let layers = config.initialLayers;
    for (let i = 0; i < this.axes.length; i++) {
      const currentAxis = this.axes[i].items.length;
      const isCurrentAxisBigger = currentAxis > layers;
      layers = isCurrentAxisBigger ? currentAxis : layers;
    }
    this.layers = layers;
  }

  _svgCircle(x, y, radius) {
    this.svg
      .append("circle")
      .attr("class", "circle-background")
      .attr("cx", x)
      .attr("cy", y)
      .attr("r", radius)
      .style("stroke", config.colors.scale)
      .style("fill", "transparent");
  }

  _drawCircles() {
    this._calcLayers();

    for (let i = 0; i <= this.layers + 1; i++) {
      this.circleStep = (this.height / 2 - config.margin) / this.layers;
      const radius = this.circleStep * i;
      this._svgCircle(this.origin.x, this.origin.y, radius - config.margin);
    }
  }

  _drawLines(angle) {
    this.svg
      .append("line")
      .attr("x1", this.origin.x)
      .attr("y1", this.origin.y)
      .attr("x2", this.origin.x)
      .attr("y2", 0 + this.circleStep / 2)
      .attr("transform", `rotate(${angle}, ${this.origin.x}, ${this.origin.y})`)
      .style("stroke", config.colors.scale);
  }

  _drawLabels(angle, name) {
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
      .text(name.toUpperCase())
      .attr("transform", `rotate(${angle}, ${this.origin.x}, ${this.origin.y})`)
      .style("fill", "black")
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-family", config.font)
      .style("font-weight", "bold");
  }

  _drawItems(angle, items, scope) {
    items.forEach((item, index) => {
      var labelX = this.origin.x + (this.height / 2) * Math.sin(0);
      const offset = 15;
      var labelY = this.origin.y - index * this.circleStep - offset;

      this.svg
        .append("text")
        .attr("x", labelX)
        .attr("y", labelY)
        .text(item)
        .attr(
          "transform",
          `rotate(${angle}, ${this.origin.x}, ${this.origin.y})`
        )
        .style("fill", config.colors.label)
        .style("text-anchor", "middle")
        .style("font-family", config.font)
        .style("font-size", "12px")
        .style("fill", () => {
          const isInScope = index <= scope;
          return isInScope ? config.colors.scope : "";
        });
    });
  }

  _drawPolygon() {
    let polygonPoints = "";

    const numberOfPoints = d3.selectAll(".scope-point")._groups[0].length;

    // Edge case to draw triangle in case of two axis
    if (numberOfPoints === 2) {
      polygonPoints += ` ${this.origin.x},${this.origin.y} `;
    }

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
      .style("fill", config.colors.scope)
      .style("opacity", 0.4);
  }

  _drawPoints(angle, scope) {
    var dotX = this.origin.x + (this.height / 2) * Math.sin(0);
    var dotY = this.origin.y - ((scope + 1) * this.circleStep - 30);
    const radius = 4;

    this.svg
      .append("circle")
      .attr("class", "scope-point")
      .attr("cx", dotX)
      .attr("cy", dotY)
      .attr("r", radius)
      .attr("transform", `rotate(${angle}, ${this.origin.x}, ${this.origin.y})`)
      .style("fill", config.colors.scope)
      .style("opacity", 0.4);
  }

  drawCanvas() {
    this.draw();
    const svgContainer = document.querySelector(this.id);
    var canvas = document.createElement("canvas");
    canvas.id = "#output-image";
    svgContainer.parentNode.prepend(canvas);

    svgContainer.style = "visibility: hidden; width: 0; overflow; hidden"; // hide real SVG

    const svg = svgContainer.innerHTML;

    canvg(canvas, svg);
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
      this._drawLabels(angle, axis.name);
      this._drawPoints(angle, axis.scope);
      this._drawItems(angle, axis.items, axis.scope);
    }

    this._drawPolygon();
  }
}

export default RadarChart;
