import React, { useState } from "react";
import RadarChart from "./components/RadarChart";
import GraphEdit from "./components/GraphEdit";

const initialData = [
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
    name: "test",
    items: ["pdf", "html", "online hosted"],
    scope: 1
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
];

export const GraphContext = React.createContext();

function App() {
  const [axes, setAxes] = useState(initialData);
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

  console.log(axes)
  return (
    <GraphContext.Provider value={{ axes, updateAxisName }}>
      <div className="graph-preview">
        <RadarChart />
      </div>
      <GraphEdit />
    </GraphContext.Provider>
  );
}

export default App;
