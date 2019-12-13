import React, { useState } from "react";
import "./App.css";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import SideBar from "./components/SideBar";
import Container from "./components/Container";
import _ from "lodash";
import { data } from "./components/data";

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
    },
    {
      condition: "EARTH SEA",
      name: "PLANET",
      img: "planet.png",
      show: false
    },
    {
      condition: "FIRE WATER",
      name: "STEAM",
      img: "steam.png",
      show: false
    },
    {
      condition: "EARTH ENERGY",
      name: "IRON",
      img: "iron.png",
      show: false
    },
    {
      condition: "EARTH AIR",
      name: "BONE",
      img: "bone.png",
      show: false
    },
    {
      condition: "BONE WATER",
      name: "HUMAN",
      img: "human.png",
      show: false
    },
    {
      condition: "HUMAN IRON",
      name: "IRONMAN",
      img: "iron-man.png",
      show: false
    },
    {
      condition: "HUMAN WATER",
      name: "ICEMAN",
      img: "ice-man.png",
      show: false
    },
    {
      condition: "FIRE HUMAN",
      name: "FIREMAN",
      img: "fire-man.png",
      show: false
    }
  ]);
  const show = item => {
    let indexList = _.findIndex(list, o => o.name === item.name);
    setList([
      ..._.slice(list, 0, indexList),
      { ...item, show: true },
      ..._.slice(list, indexList + 1)
    ]);
    console.log(indexList, item.name);
  };
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container listItem={list} show={show} />
        <SideBar listItems={list} />
      </DndProvider>
    </div>
  );
}

export default App;
