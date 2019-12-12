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
    {left:null,top:null,
      condition: "",
      name: "AIR",
      img: "air.png",
      show: true
    },

    {left:null,top:null,
      condition: "",
      name: "EARTH",
      img: "earth.png",
      show: true
    },
    {left:null,top:null,
      condition: "",
      name: "FIRE",
      img: "fire.png",
      show: true
    },
    {left:null,top:null,
      condition: "",
      name: "WATER",
      img: "water.png",
      show: true
    },
    {left:null,top:null,
      condition: "AIR AIR",
      name: "PRESSURE",
      img: "pressure.png",
      show: false
    },
    {left:null,top:null,
      condition: "FIRE FIRE",
      name: "ENERGY",
      img: "energy.png",
      show: false
    },
    {left:null,top:null,
      condition: "WATER WATER",
      name: "SEA",
      img: "sea.png",
      show: false
    },
    {left:null,top:null,
      condition: "EARTH SEA",
      name: "PLANET",
      img: "planet.png",
      show: false
    },
    {left:null,top:null,
      condition: "FIRE WATER",
      name: "STEAM",
      img: "steam.png",
      show: false
    }
  ]);
  const show = item => {
    let indexList = _.findIndex(list, o=>o.name === item.name );
    setList([
      ..._.slice(list, 0, indexList),
      {...item, show: true, },
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
