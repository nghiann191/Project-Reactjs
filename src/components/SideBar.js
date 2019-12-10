import React, { useState } from "react";
import Item from "./Items";
import "./style.css";

function SideBar({ listItems }) {
  return (
    <div className="listcss">
      {listItems.map(
        (item, index) =>
          item.show && <Item item={item} key={index} source="list" />
      )}
    </div>
  );
}

export default SideBar;
