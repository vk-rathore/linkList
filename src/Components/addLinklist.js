import React, { useState } from "react";
import "./AddLinklist.css";

export default function AddLinklist({ addList }) {
  const [value, SetValue] = useState("");
  const [address, Setaddress] = useState("");
  const onSubmit =()=>{
    if(value===""){
        alert("value should not be empty")
    }else{
        addList(value,address);
        SetValue("");
        Setaddress("");
    }
  }
  return (
    <div className="AddLinkList">
      Add Linklist
      <div className="form">
        <input
          type="text"
          className="addListInput"
          value={value}
          onChange={(e) => SetValue(e.target.value)}
          placeholder="Enter value"
        />
        <label className="addlabel">address should be number or null</label>
        <input
          type="text"
          className="addListInput"
          value={address}
          onChange={(e) => Setaddress(e.target.value)}
          placeholder="Enter address"
        />
      </div>
      <button className="btn" onClick={onSubmit}>Add LinkList</button>
    </div>
  );
}
