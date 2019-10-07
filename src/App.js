import React, { useState } from "react";
import MVPChart from "./components/MVPChart";
import ChartControls from "./components/ChartControls";
import mockData from './mockData'

const emptyAxis = {
  name: "NEW AXIS",
  items: ["first-item"],
  scope: 0
};

export const GraphContext = React.createContext();

function App() {
  const [axes, setAxes] = useState(mockData);
  const updateAxisName = (index, value) => {
    setAxes([
      ...axes.slice(0, index),
      {
        ...axes[index],
        name: value
      },
      ...axes.slice(index + 1)
    ]);
  };

  const updateAxisItem = (axisIndex, itemIndex, value) => {
    setAxes([
      ...axes.slice(0, axisIndex),
      {
        ...axes[axisIndex],
        items: [
          ...axes[axisIndex].items.slice(0, itemIndex),
          value,
          ...axes[axisIndex].items.slice(itemIndex + 1)
        ]
      },
      ...axes.slice(axisIndex + 1)
    ]);
  };

  const deleteAxis = index => {
    setAxes([...axes.slice(0, index), ...axes.slice(index + 1)]);
  };

  const deleteAxisItem = (axisIndex, itemIndex, value) => {
    setAxes([
      ...axes.slice(0, axisIndex),
      {
        ...axes[axisIndex],
        items: [
          ...axes[axisIndex].items.slice(0, itemIndex),
          ...axes[axisIndex].items.slice(itemIndex + 1)
        ]
      },
      ...axes.slice(axisIndex + 1)
    ]);
  };

  const addAxis = () => {
    setAxes([emptyAxis, ...axes]);
  };

  const addAxisItem = axisIndex => {
    setAxes([
      ...axes.slice(0, axisIndex),
      {
        ...axes[axisIndex],
        items: [...axes[axisIndex].items, ""]
      },
      ...axes.slice(axisIndex + 1)
    ]);
  };

  const updateAxisScope = (axisIndex, scope) => {
    setAxes([
      ...axes.slice(0, axisIndex),
      {
        ...axes[axisIndex],
        scope
      },
      ...axes.slice(axisIndex + 1)
    ]);
  };

  const downloadSVg = () => {
    const svg = document.querySelector('svg')
  //   function importSVG(sourceSVG, targetCanvas) {
  //     // https://developer.mozilla.org/en/XMLSerializer
  //     svg_xml = (new XMLSerializer()).serializeToString(sourceSVG);
  //     var ctx = targetCanvas.getContext('2d');
  
  //     // this is just a JavaScript (HTML) image
  //     var img = new Image();
  //     // http://en.wikipedia.org/wiki/SVG#Native_support
  //     // https://developer.mozilla.org/en/DOM/window.btoa
  //     img.src = "data:image/svg+xml;base64," + btoa(svg_xml);
  
  //     img.onload = function() {
  //         // after this, Canvas’ origin-clean is DIRTY
  //         ctx.drawImage(img, 0, 0);
  //     }
  // }

  // console.log(JSON.stringify(svg.html()))
  }

  return (
    <GraphContext.Provider
      value={{
        axes,
        addAxis,
        updateAxisScope,
        updateAxisName,
        deleteAxis,
        addAxisItem,
        updateAxisItem,
        deleteAxisItem
      }}
    >
      <MVPChart axes={axes} />
      <ChartControls />
    </GraphContext.Provider>
  );
}

export default App;
