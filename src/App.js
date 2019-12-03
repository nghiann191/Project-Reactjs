import React from 'react'
import SideBar from './component/sidebar/sidebar'
import {DndProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Container from './component/container/Container'
class App extends React.Component{
  render(){
    return(
      <DndProvider backend={HTML5Backend}>
          <SideBar/>
          <Container/>
      </DndProvider>
     );
    
  }
}
export default App;