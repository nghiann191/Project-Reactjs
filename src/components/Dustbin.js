import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Item from './Items';

const Dustbin = () => {
  const [list, setList] = useState([])
  const [hasDropped, setHasDropped] = useState(false)
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item) {
      if (item.source === "list") {
        const newItem = { ...item }
        setList(list.concat(newItem))
        setHasDropped(true)
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

   return (
    <div ref={drop} className="dustbin">
      {list.length !== 0 && list.map((item, index) =>
        <Item key={index} item={item} />
      )}
      {hasDropped && setHasDropped(false)}
    </div>
  )
};

export default Dustbin;
