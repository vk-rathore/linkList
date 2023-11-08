import React from "react";
import "./List.css";
import {FiArrowDown} from "react-icons/fi"

export default function LinkList({node,index,removeList}) {
    const removeNode=()=>{
      removeList(index,node?.self)
    }
  return (
    <div key={index}>
    <div className="add">
        <p>
            {node?.self}
        </p>
        <button onClick={removeNode}>Remove</button>
    </div>
     <div className="Node">
      <p className="value">value: &nbsp;{node?.value}</p>
      <p className="address">add: &nbsp;{node?.address}</p>
    </div>
    <div className="arrow">
         <FiArrowDown className="aro"/>
    </div>
   
    </div>
   
  );
}
