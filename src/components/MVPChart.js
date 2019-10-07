import RadarChart from "../lib/RadarChart";

const MVPChart = ({axes}) => {

  const draw = axes => {
    const existingGraph = document.querySelector("svg");
    if (existingGraph) existingGraph.remove();
    const mvpGraph = new RadarChart(600, 600, axes);
    mvpGraph.draw();
  };

  draw(axes);
  return null;
};

export default MVPChart;
