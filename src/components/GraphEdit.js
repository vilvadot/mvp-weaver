import React, { useContext } from "react";
import { GraphContext } from "../App";
import Axis from './Axis'

const AddAxis = ({addAxis}) => {
  return(
    <button className='axis-add' onClick={addAxis}>Add axis +</button>
  )
  }

const GraphEdit = () => {
  const context = useContext(GraphContext);
  return (
    <div className="graph-edit">
      {context.axes.map(({ name, items, scope }, index) => {
        return <Axis key={index} name={name} items={items} scope={scope} index={index} />;
      })}
      <AddAxis addAxis={context.addAxis}/>
    </div>
  );
};

export default GraphEdit;