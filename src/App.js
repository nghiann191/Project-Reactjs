import React, { useState } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import SideBar from "./components/SideBar";
import Dustbin from "./components/Dustbin";
import _ from "lodash";
import { data } from "./components/data";
import Container from "./components/Container";

function App() {
  const [list, setList] = useState([
    {
      condition: "",
      name: "AIR",
      img: "air.png",
      show: true
    },

    {
      condition: "",
      name: "EARTH",
      img: "earth.png",
      show: true
    },
    {
      condition: "",
      name: "FIRE",
      img: "fire.png",
      show: true
    },
    {
      condition: "",
      name: "WATER",
      img: "water.png",
      show: true
    },
    {
      condition: "AIR AIR",
      name: "PRESSURE",
      img: "pressure.png",
      show: false
    },
    {
      condition: "FIRE FIRE",
      name: "ENERGY",
      img: "energy.png",
      show: false
    },
    {
      condition: "WATER WATER",
      name: "SEA",
      img: "sea.png",
      show: false
    }
  ]);
  const show = item => {
    let indexList = _.indexOf(list, o=>o.name === item.name);
    setList([
      ..._.slice(list, 0, indexList),
      {...item, show: true },
      ..._.slice(list, indexList + 1)
    ]);
  };
  return (
    <div className="App">
      
      <DndProvider backend={HTML5Backend}>
        <Dustbin listItem={list} show={show} />
        <SideBar listItems={list} />
      </DndProvider>
    </div>
  );
}

export default App;
