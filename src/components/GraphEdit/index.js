import React, { useState, useContext } from "react";
import {GraphContext} from '../../App'

const EditableText = ({ name, value, children, onChange }) => {
  const [isEditMode, setEditMode] = useState(false);
  const toggleEdit = () => {
    setEditMode(!isEditMode);
  };
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') toggleEdit()
  }

  if (isEditMode) {
    return <input type="text" value={children} name={name} onChange={onChange} onKeyDownCapture={handleKeyPress} />;
  }
  return <p onClick={toggleEdit}>{children}</p>;
};

const Axis = ({ name, items, scope, onNameEdit }) => {
  return (
    <div className="axis-container">
      <h3 className="axis-title"><EditableText onChange={(e) => onNameEdit(e.target.value)}>{name}</EditableText></h3>
      {items.map((item, index) => (
        <EditableText onChange={(e) => console.log(e.target.value)}>{item}</EditableText>
      ))}
    </div>
  );
};

// {/* <input type="text" name={`${name}-item-${index}`} value={item} /> */}
const GraphEdit = () => {
  const context = useContext(GraphContext)
  return (
    <div className="graph-edit">
      {context.axes.map(({ name, items, scope }) => {
        return <Axis name={name} items={items} scope={scope} />;
      })}
    </div>
  );
};

export default GraphEdit;
