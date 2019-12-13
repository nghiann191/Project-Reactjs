import React, { useState } from "react";
import { useDrop } from "react-dnd";
import ItemTypes from "./ItemTypes";
import Item from "./Items";
import update from "immutability-helper";
import { data } from "./data";
import _ from "lodash";

const Container = ({ listItem, show, hideSourceOnDrag }) => {
  const [list, setList] = useState([]);

  const [hasDropped, setHasDropped] = useState(false);
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      // moveItem(addItem,left,top);
      // if (item.source === "list") {
      //   setList(list.concat({ ...item, source: "dustbin" }));
      // }
      const delta = monitor.getClientOffset();
      const left = Math.round(delta.x);
      const top = Math.round(delta.y);
      if (item.source === "dustbin") {
        moveItem(item, left, top);
        return;
      }
      if (item.source === "list") {
        addItem(item, left, top);
      }

      setHasDropped(true);
      return undefined;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  });
  const addItem = (item, left, top) => {
    setList(list.concat({ ...item, source: "dustbin", left, top }));
  };
  const moveItem = (item, left, top) => {
    let index = _.findIndex(list, { name: item.name });
    setList([
      ..._.slice(list, 0, index),
      { ...item, source: "dustbin", left, top },
      ..._.slice(list, index + 1)
    ]);
  };
  // const [boxes,setBoxes] = useState(list);
  // const moveItem = (item,left,top) => {
  //   setList(
  //     update(list,{
  //       [item]: {
  //         $merge: {...item,left,top}
  //       }
  //     })
  //   );
  // };
  const CombinDrop = (item_first, item_second) => {
    let b = _.find(data, item => {
      let a1 = item_first.name + " " + item_second.name;
      let a2 = item_second.name + " " +item_first.name;
      let list1 = _.words(a1);
      let list2 = _.words(a2);
      let list3 = _.words(item.condition);
      if(_.isEqual(list1, list3) || _.isEqual(list2,list3)){
        return true;
      } ;
    });
    console.log("test" ,item_first.name + " " + item_second.name,item_second.name + " " +item_first.name)

    // console.log("asdas",item_first.left);
    return b;
  };
  const combine = (item_first, item_second) => {
    const combineItem = CombinDrop(item_first, item_second);
    if (combineItem) {
      let indexList = _.lastIndexOf(list, item_first);
      let newItem = [
        ..._.slice(list, 0, indexList),
        {
          ...combineItem,
          source: "dustbin",
          left: item_first.left,
          top: item_first.top,
          type: ItemTypes.ITEM
        },
        ..._.slice(list, indexList + 1)
      ];

      console.log(newItem);
      setList([...newItem]);
      show(combineItem);
    }

    hasDropped && console.log(list);
  };

  return (
    <div ref={drop} className="dustbin">
      {listItem.length !== 0 &&
        list.map((item, index) => {
          const { left, top } = item;
          return (
            <Item
              key={index}
              item={item}
              source="dustbin"
              combine={combine}
              left={left}
              top={top}
              hideSourceOnDrag={hideSourceOnDrag}
            />
          );
        })}
      {hasDropped && setHasDropped(false)}
    </div>
  );
};

export default Container;
