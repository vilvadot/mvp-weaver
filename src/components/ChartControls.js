import React, { useContext } from "react";
import { GraphContext } from "../App";
import AxisCard from "./AxisCard";

const ChartControls = () => {
  const context = useContext(GraphContext);
  return (
    <div className="chart-controls">
      {context.axes.map(({ name, items, scope }, index) => {
        return (
          <AxisCard
            key={index}
            name={name}
            items={items}
            scope={scope}
            index={index}
          />
        );
      })}
      <button className="axis-add" onClick={context.addAxis}>
        🕷 Add axis
      </button>
    </div>
  );
};

export default ChartControls;
