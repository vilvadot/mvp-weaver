import React, { useState } from "react";

const EditableText = ({ name, children, onChange, onDelete }) => {
  const [isEditMode, setEditMode] = useState(false);
  const toggleEdit = () => {
    setEditMode(!isEditMode);
  };

  const handleBlur = e => {
    toggleEdit();
    if (!e.target.value) onDelete();
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      toggleEdit();
      if (!e.target.value) onDelete();
    }
  };

  const node = isEditMode ? (
    <input
      type="text"
      value={children}
      name={name}
      onChange={onChange}
      onBlur={handleBlur}
      onKeyDownCapture={handleKeyPress}
    />
  ) : (
    <span onClick={toggleEdit}>{children}</span>
  );

  return <div className="editable-item">{node}</div>;
};

export default EditableText;
