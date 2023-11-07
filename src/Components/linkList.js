import React from "react";
import "./List.css";
import {FiArrowDown} from "react-icons/fi"

export default function LinkList({node}) {
    
  return (
    <>
    <div className="add">
        <p>
            {node?.self}
        </p>
    </div>
     <div className="Node">
      <p className="value">value: &nbsp;{node?.value}</p>
      <p className="address">add: &nbsp;{node?.address}</p>
    </div>
    <div className="arrow">
         <FiArrowDown className="aro"/>
    </div>
   
    </>
   
  );
}
