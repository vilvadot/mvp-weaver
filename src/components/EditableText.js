import React, { useState, useEffect } from "react";

const EditableText = ({ name, children, onChange, onDelete, isDeletable, placeholder }) => {
  const [isEditMode, setEditMode] = useState(!children);

  const inputRef = React.createRef();

  const toggleEdit = () => {
    setEditMode(!isEditMode);
  };

  const handleBlur = e => {
    if(isDeletable) toggleEdit();
    if (!e.target.value && isDeletable) onDelete();
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      toggleEdit();
      if (!e.target.value && isDeletable) onDelete();
    }
  };

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.focus();
    }
  });

  const node = isEditMode ? (
    <input
     placeholder={placeholder}
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
