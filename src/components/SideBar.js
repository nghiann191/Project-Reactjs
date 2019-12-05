import React from "react";
import Item from "./Items";
import './style.css';

function SideBar({ list }) {
  
  return (
    <div className="list">
      {
        list.map(
          (item, index) => (
            <Item item={item} key={index} source="list" id="drag"/>
          )
        )
      }
    </div>
  );
}

export default SideBar;