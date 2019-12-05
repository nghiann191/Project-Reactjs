import React from 'react';
import './App.css';
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import SideBar from "./components/SideBar";
import Dustbin from "./components/Dustbin";
import { data } from "./components/data";
import Container from './components/Container';

function App() {

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Dustbin/>
        <SideBar list={data} />
      </DndProvider>
    </div>
  );
}

export default App;