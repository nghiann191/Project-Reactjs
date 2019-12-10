import React, { useState, useCallback, useReducer } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Item from "./Items";
import update from "immutability-helper";
import { data } from "./data";
import _ from "lodash";

const Dustbin = ({ listItem, show }) => {
  const [list, setList] = useState([]);
  // const [boxes,setBoxes] = useState({})
  // const moveBox = useCallback(
  //   (id,left,top) => {
  //     setBoxes(
  //       update(boxes, {
  //         [id] : {
  //           $merge: {left,top},
  //         },
  //       }),
  //     )
  //   },
  //   [boxes],
  // )
  const [hasDropped, setHasDropped] = useState(false);
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {
      // const delta = monitor.getDifferenceFromInitialOffset();
      // let left = Math.round(item.left + delta.x);
      // let top = Math.round(item.top + delta.y);
      // moveBox(item.id,left,top)
      if (item.source === "list") {
        setList(list.concat({ ...item, source: "dustbin" }));
        setHasDropped(true);
      }

      return undefined;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });
  const CombinDrop = (item_first, item_second) => {
    // item_first = _.findIndex(list, i=>i.name===item_first.name)
    let a = item_first.name + " " + item_second.name;
    let b = _.find(data, item => a === item.condition);

    return b;
  };
  const combine = (item_first, item_second) => {
    const combineItem = CombinDrop(item_first, item_second);
    if (combineItem) {
      let indexList = _.lastIndexOf(list, item_first);
      setList([
        ..._.slice(list, 0, indexList),
        { ...combineItem },
        ..._.slice(list, indexList + 1, list.length + 1)
      ]);
      show(combineItem);
    }
  };
  // const Show = (item) =>{
  //   let indexList = _.indexOf(data,item);
  //   setList([
  //     ..._.slice(data,0,indexList),
  //     {...item,show:true},
  //     ..._.slice(data,indexList+1)
  //   ])
  // }
  return (
    <div ref={drop} className="dustbin">
      {listItem.length !== 0 &&
        list.map((item, index) => (
          <Item key={index} item={item} combine={combine} />
        ))}

      {hasDropped && setHasDropped(false)}
    </div>
  );
};

export default Dustbin;
