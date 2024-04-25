import React, { useState } from "react";
// import Draggable from 'react-draggable'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './GrafanaChart.scss'
import { useEffect } from "react";

const GrafanaChart = ({ url, closeChart, counter, handleOnDragEnd,DragEnd_ }) => {

    const eventHandler = (event, data) => {
        console.log(event);
        console.log(data);
    }
    const handleCloseChart = (e) => {
        closeChart(counter);
    }
    // function handleOnDragEnd(result) {
    //     console.log(result);

    //     const items = Array.from(DragEnd_);
    //     console.log("items");
    //     console.log(items);
    //     const [reorderedItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderedItem);
    //     // updateCharacters(items);
    //     handleOnDragEnd_(items)
    // }
    // console.log("items");
    // console.log(DragEnd_);
   
    return (
        // <div style={{height: '1000px', width: '1000px', padding: '10px'}} >
        // <Draggable onDrag={eventHandler}  handle=".header_grafana_fram"   bounds="parent"  className='position-absolute' >
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId={`characters${counter}`}   index={counter} >
                {(provided) => (
                    <div className="m-3 "  {...provided.droppableProps} ref={provided.innerRef}>

                        <Draggable draggableId={`a${counter}`}  index={counter}>
                            {(provided) => (
                                <div className="wrap_grafana_fram" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <div className="header_grafana_fram">
                                        <i className="icon icon-18 icon-close cursor-pointer" onClick={handleCloseChart}></i>
                                    </div>
                                    <iframe src={url} className="grafana_fram"></iframe>
                                </div>
                            )}
                        </Draggable>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default GrafanaChart;