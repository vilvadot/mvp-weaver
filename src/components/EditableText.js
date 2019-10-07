import React, { useState, useEffect } from "react";

const EditableText = ({ name, children, onChange, onDelete }) => {
  const [isEditMode, setEditMode] = useState(false);

  const inputRef = React.createRef();

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

  useEffect(() => {
    console.log("focus");
    if (isEditMode) {
      inputRef.current.focus();
    }
  });

  const node = isEditMode ? (
    <input
      ref={inputRef}
      type="text"
      value={children}
      name={name}
      onChange={onChange}
      onBlur={handleBlur}
      onKeyDownCapture={handleKeyPress}
    />
  ) : (
    <span ref={inputRef} onClick={toggleEdit}>
      {children}
    </span>
  );

  return <div className="editable-item">{node}</div>;
};

export default EditableText;
