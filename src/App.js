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
    name: "hey",
    items: ["pdf", "html", "online hosted"],
    scope: 1
  },
  {
    name: "hello",
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

  return (
    <GraphContext.Provider value={{ axes, updateAxisName, updateAxisItem }}>
      <RadarChart />
      <GraphEdit />
    </GraphContext.Provider>
  );
}

export default App;
