import React, {useState} from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Dustbin from './Dustbin';

const Container =() => {
    const [combine,setCombine] = useState([])
    const [,drop] = useDrop({
        accept:ItemTypes.ITEM,
        drop(item){
            combine = item.name
            setCombine(combine.concat(...item))
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOverCurrent({ shallow : true})
        })
        })
    
    
    return(
        <div ref={drop} className="dustbin">
            <Dustbin/>
        </div>
    )
}
export default Container;