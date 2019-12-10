import React, { useState, useReducer } from "react";
import { useDrag, useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import "./style.css";

const Item = ({ item, source, combine,show }) => {
  // const initialItem = {}
  const [, drag] = useDrag({
    item: { type: ItemTypes.ITEM, name: item.name, img: item.img,show:item.show ,source}
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
  let refType = source === "list" ? drag : drop;
  return (
    <div>
      <div ref={refType} className="items">
        <img src={require("../Images/" + item.img)} alt="anh" />
        <div>{item.name}</div>
      </div>
    </div>
  );
};
export default Item;
