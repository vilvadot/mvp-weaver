import RadarChart from "../lib/RadarChart";

const MVPChart = ({ axes }) => {
  let mvpGraph;

  const draw = axes => {
    // I feel dirty just by looking 👀
    const existingSVG = document.querySelector("svg");
    if (existingSVG) existingSVG.remove();
    const existingCanvas = document.querySelector("canvas");
    if (existingCanvas) existingCanvas.remove();


    mvpGraph = new RadarChart(600, 600, axes, "mvp-graph");
    mvpGraph.drawCanvas();
  };

  draw(axes);
  return null;
};

export default MVPChart;
