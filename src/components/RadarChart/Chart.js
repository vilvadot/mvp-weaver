import * as d3 from "d3";

const config = {
  margin: 30,
  labelOffset: 15,
  minRadius: 50
};

class RadarChart {
  constructor(height, width, axes) {
    this.height = height;
    this.width = width;
    this.polygon = [];
    this.origin = {
      x: this.width / 2,
      y: this.height / 2
    };
    this.axes = axes;
    this.svg = d3
      .select("#graph")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);
  }

  _calcLayers() {
    let layers = 6;
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
      .attr("r", radius);
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
      .attr("class", "axis")
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
      .attr("class", "label")
      .text(name)
      .attr(
        "transform",
        `rotate(${angle}, ${this.origin.x}, ${this.origin.y})`
      );
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
        .attr("class", () => {
          let className = "axis-item";
          if (index <= scope) {
            className += " axis-item--complete";
          }
          return className;
        })
        .text(item)
        .attr(
          "transform",
          `rotate(${angle}, ${this.origin.x}, ${this.origin.y})`
        );
    });
  }

  _drawPolygon() {
    let polygonPoints = "";

    const numberOfPoints = d3.selectAll(".scope-point")._groups[0].length

    // Edge case to draw triangle in case of two axis
    if(numberOfPoints === 2) {
      polygonPoints += ` ${this.origin.x},${this.origin.y} `
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
      .attr("class", "scope");
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
      .attr(
        "transform",
        `rotate(${angle}, ${this.origin.x}, ${this.origin.y})`
      );
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
      this._drawPoints(angle, axis.scope);
      this._drawItems(angle, axis.items, axis.scope);
    }

    this._drawPolygon();
  }
}

export default RadarChart;
