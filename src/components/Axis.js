import React, { useContext } from "react";
import EditableText from "./EditableText";
import { GraphContext } from "../App";
import ScopeSlider from "./ScopeSlider";

const Axis = ({ name, items, scope, index }) => {
  const context = useContext(GraphContext);
  return (
    <div className="axis-container">
      <button className="axis-delete" onClick={() => context.deleteAxis(index)}>
        ×
      </button>
      <h3 className="axis-title">
        <EditableText
          placeholder="axis name"
          onChange={e => context.updateAxisName(index, e.target.value)}
        >
          {name}
        </EditableText>
      </h3>
      <div className="axis-edit">
        <div className="axis-items">
          {items.map((item, itemIndex) => {
            const isLastItem = itemIndex === items.length - 1;
            let onEnter = null;
            if (isLastItem) onEnter = () => context.addAxisItem(index);

            return (
              <EditableText
                key={itemIndex}
                placeholder="item"
                isDeletable
                onEnter={onEnter}
                onDelete={e => context.deleteAxisItem(index, itemIndex)}
                onChange={e =>
                  context.updateAxisItem(index, itemIndex, e.target.value)
                }
              >
                {item}
              </EditableText>
            );
          })}
          <button
            className="item-add"
            onClick={() => context.addAxisItem(index)}
          >
            Add
          </button>
        </div>
          <ScopeSlider
            min={0}
            max={items.length - 1}
            value={scope}
            onChange={e =>
              context.updateAxisScope(index, Number(e.target.value))
            }
          />
      </div>
    </div>
  );
};

export default Axis;
