import React, { useState, useReducer } from "react";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import "./style.css";

const Item = ({ item,id, source, combine, hideSourceOnDrag, left, top}) => {
  // const initialItem = {}
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.ITEM,id, name: item.name, img: item.img,source},
    collect: monitor => ({
      isDragging : monitor.isDragging(),
    }),
  });
  
  const [, setHasDropped] = useState(false);
  const [{ dropItem }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop() {
      combineItem();
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
  let refType = source === "list"&&"dustbin" ? drag : drop;
  if(isDragging && hideSourceOnDrag){
    return <div ref={drag}></div>
  };
  return (
    <div>
      <div ref={refType} className="items" style={{left,top}}>
        <img src={require("../Images/" + item.img)} alt="anh" />
        <div>{item.name}</div>
      </div>
    </div>
  );
};
export default Item;
