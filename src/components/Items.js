import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import './style.css';

const Item = ({ item, source, id }) => {
  const [, drag] = useDrag(
    { item: { type: ItemTypes.ITEM, name: item.name, img: item.img, source, id } }
  )

  const [, setHasDropped] = useState(false)
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop() {
      setHasDropped(true)
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  let refType = id === "drag" ? drag : drop
  return (
    <div ref={refType} className="items">
      <img src={require('../Images/' + item.img)} alt="anh" />
      <div>{item.name}</div>
      
    </div>
  )
};
export default Item;