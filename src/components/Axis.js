import React, { useContext } from "react";
import EditableText from "./EditableText";
import { GraphContext } from "../App";

const Axis = ({ name, items, scope, onNameEdit, index }) => {
  const context = useContext(GraphContext);
  return (
    <div className="axis-container">
      <h3 className="axis-title">
        <EditableText
          onChange={e => context.updateAxisName(index, e.target.value)}
        >
          {name}
        </EditableText>
      </h3>
      <div className="axis-items">
        {items.map((item, itemIndex) => (
          <EditableText
            key={item}
            onChange={e =>
              context.updateAxisItem(index, itemIndex, e.target.value)
            }
          >
            {item}
          </EditableText>
        ))}
      </div>
    </div>
  );
};

export default Axis;
