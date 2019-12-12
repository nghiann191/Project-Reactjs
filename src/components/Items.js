import React, { useState, useReducer } from "react";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import "./style.css";

const Item = ({ item, source, combine, hideSourceOnDrag, left, top}) => {
  // const initialItem = {}
  const [{isDragging, canDrag}, drag] = useDrag({
    item: { type: ItemTypes.ITEM, name: item.name, img: item.img,source,left,top},
    collect: monitor => ({
      canDrag : monitor.canDrag(),
      isDragging : monitor.isDragging(),
    }),
  });
  
  const [, setHasDropped] = useState(false);
  const [{ dropItem }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop() {
      if (
        (source === "list" && item.source === "list")
        || (source === "list" && item.source === "dustbin")
      )
      return
      combineItem()
      
      console.log("item", left);
      setHasDropped(true);
      // combine(dispatch({type:'ADD'}))
    },
    collect: monitor => ({
      dropItem: monitor.getItem(),
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });
  const combineItem = () => {
    combine(item, dropItem);
  };

  // const reducer = (item,action) => {
  //   switch(action.type){
  //     case 'ADD':
  //       return <img src={require('../Images/water.png')} alt="anh" />;
  //     default:
  //       return initialItem;
  //   }
  // }
  // const [,dispatch] = useReducer(reducer,initialItem);
  

hideSourceOnDrag = source === "dustbin" ? true:false
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />
  }


  let refType = canDrag ? drag : drop

  return (
    <div>
      <div ref={refType} className="items" style={{left,top}}>
        <img src={require("../Images/" + item.img)} alt="anh" />
        <div className="text">{item.name}</div>
      </div>
    </div>
  );
};
export default Item;
