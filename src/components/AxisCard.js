import React, { useContext } from "react";
import EditableText from "./EditableText";
import { GraphContext } from "../App";
import ScopeSlider from "./ScopeSlider";

const AxisCard = ({ name, items, scope, index }) => {
  const context = useContext(GraphContext);
  return (
    <div className="axis-card">
      <button
        className="axis-card--delete"
        onClick={() => context.deleteAxis(index)}
      >
        ×
      </button>
      <h3 className="axis-card--title">
        <EditableText
          placeholder="axis name"
          onChange={e => context.updateAxisName(index, e.target.value)}
        >
          {name}
        </EditableText>
      </h3>
      <div className="axis-card--edit">
        <div className="axis-card--items">
          {items.map((item, itemIndex) => {
            const lastItemIndex = items.length - 1;
            const isLastItem = itemIndex === lastItemIndex
            let onEnter = null;
            if (isLastItem) onEnter = () => context.addAxisItem(index);

            return (
              <EditableText
                isActive={itemIndex < scope + 1}
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
            className="axis-card--item-add"
            onClick={() => context.addAxisItem(index)}
          >
            Add
          </button>
        </div>
        <ScopeSlider
          min={0}
          max={items.length - 1}
          value={scope}
          onChange={e => context.updateAxisScope(index, Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default AxisCard;
