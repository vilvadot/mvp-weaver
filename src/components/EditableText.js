import React, { useState } from "react";

const EditableText = ({ name, children, onChange }) => {
  const [isEditMode, setEditMode] = useState(false);
  const toggleEdit = () => {
    setEditMode(!isEditMode);
  };
  const handleKeyPress = e => {
    if (e.key === "Enter") toggleEdit();
  };

  const node = isEditMode ? (
    <input
      type="text"
      value={children}
      name={name}
      onChange={onChange}
      onBlur={() => toggleEdit()}
      onKeyDownCapture={handleKeyPress}
    />
  ) : (
    <span onClick={toggleEdit}>{children}</span>
  );

  return <div className="editable-item">{node}</div>;
};

export default EditableText;
