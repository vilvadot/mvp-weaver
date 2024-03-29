import React, { useState, useEffect } from "react";

const EditableText = ({
  name,
  children,
  isActive,
  isDeletable,
  placeholder,
  onEnter,
  onChange,
  onDelete
}) => {
  const initiallyEditable = !children;
  const [isEditMode, setEditMode] = useState(initiallyEditable);

  const inputRef = React.createRef();

  const toggleEdit = () => {
    setEditMode(!isEditMode);
  };

  const handleBlur = e => {
    const isNotEmpty = !isDeletable && children.length
    if (isDeletable || isNotEmpty) toggleEdit();
    if (!e.target.value && isDeletable) onDelete();
  };

  const handleKeyPress = e => {
    const pressedEnter = e.key === "Enter";
    if (pressedEnter) {
      if (onEnter) return onEnter();
      toggleEdit();
      if (!e.target.value && isDeletable) onDelete();
    }
  };

  useEffect(() => {
    if (isEditMode) {
      inputRef.current.focus();
    }
  }, [children, inputRef, isEditMode]);

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

  return (
    <div className={`editable-item ${isActive ? " active" : ""}`}>{node}</div>
  );
};

export default EditableText;
