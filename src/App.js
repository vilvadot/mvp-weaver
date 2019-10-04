import React from "react";
import RadarChart from "./components/RadarChart";
import GraphEdit from "./components/GraphEdit";

const initialData = {
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
  ],
  updateName: function(index, value) {
    this.axes[0].name = "hey";
  }
};

export const GraphContext = React.createContext();

function App() {
  return (
    <GraphContext.Provider value={initialData}>
      <div className="graph-preview">
        <RadarChart />
      </div>
      <GraphEdit />
    </GraphContext.Provider>
  );
}

export default App;
