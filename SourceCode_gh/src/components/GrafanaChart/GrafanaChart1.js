import React, { useState } from "react";

import './GrafanaChart.scss'

const GrafanaChart = ({ start_time_,stop_time_,panelId, closeChart, counter }) => {

    const eventHandler = (event, data) => {
        console.log(event);
        console.log(data);
    }
    const handleCloseChart = (e) => {
        closeChart(counter);
    }
    return (
            <div className="m-3 " draggable={true} onDragStart={drag} id={`drag${counter}`}>
                <div className="wrap_grafana_fram">
                    <div className="header_grafana_fram">
                        <i className="icon icon-18 icon-close cursor-pointer" onClick={handleCloseChart}></i>
                    </div>
                    <iframe src={`http://185.252.28.42:3000/d-solo/pWV4-Y7Ik/vnm-a01-01-003?orgId=1&from=${start_time_}&to=${stop_time_}&panelId=${panelId}&kiosk=1&theme=light`} className="grafana_fram"></iframe>
                </div>
            </div>
    )
}
/////////////////////////////
// function allowDrop(ev) {
//     ev.preventDefault();
//   }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log(ev.dataTransfer)
  }
  
//   function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
//   }
 
//   <body>
  
//   <h2>Drag and Drop</h2>
//   <p>Drag the image back and forth between the two div elements.</p>
  
//   <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
//     <img src="img_w3slogo.gif" draggable="true" ondragstart="drag(event)" id="drag1" width="88" height="31">
//   </div>
  
//   <div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
  
//   </body>
/////////////////////////////////

export default GrafanaChart;