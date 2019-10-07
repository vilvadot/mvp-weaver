import React from "react";

const ScopeSlider = ({ min, max, value, onChange }) => {
  return <input className="axis-card--scope-slider" type="range" min={min} max={max} value={value} onChange={onChange}></input>;
};

export default ScopeSlider;
