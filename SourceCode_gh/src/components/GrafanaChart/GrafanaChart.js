import React, { useEffect, useRef, useState } from "react";
import Draggable from 'react-draggable'
import './GrafanaChart.scss'
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";

const GrafanaChart = ({ start_time_, stop_time_, panelId,uid, closeChart, counter, editChart  ,sensor_type_ ,selectedDevice_,Name ,_measurement , gateway ,url,disableEditButton}) => {

    const eventHandler = (event, data) => {
        console.log(data.y, data.x);
    }
    const handlerOnDrop = (event, data) => {
        console.log(data.y, data.x);
    }
    const handleCloseChart = (e) => {
        closeChart(counter);
    }
    const handleEditChart =(e)=>{
        if(!e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains("editable")){
        console.log("e");
        e.target.parentElement.parentElement.classList.add("bg-warning");
        e.target.parentElement.parentElement.classList.add('disable');
       

        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.add("editable")
        editChart(panelId,sensor_type_,selectedDevice_,Name,counter , gateway , _measurement,uid);
        }
        else{
            alert.show(`${t("text.Completependingapplicationsfirst")}`, {type: "error"});
        }
    }
    const { t } = useTranslation();

    return (
        !isMobile ?(
        <Draggable onDrag={eventHandler} handle=".header_grafana_fram" bounds="parent" onStop={handlerOnDrop} >

            <div id={`item${counter}`} key={`item${counter}`} className="m-2 border" style={{resize:'both',overflow:"hidden" ,width:'-webkit-fill-available',height:'500px',borderRadius: '12px 12px 0px 0px'}}>
                <div className="wrap_grafana_fram ">
                    <div className="header_grafana_fram">
                        <div data-toggle="tooltip" data-placement="top" title={t("text.chartdelete")} className=""><i className="icon icon-28 icon-close-2 cursor-pointer" onClick={handleCloseChart}></i></div>
                        <div data-toggle="tooltip" data-placement="top" title={t("text.Addchart")}><i className="icon icon-28 icon-plus-primary-2 cursor-pointer" onClick={(e) =>handleEditChart(e,panelId,sensor_type_,selectedDevice_,Name,counter , gateway , _measurement,uid)}></i></div>
                    </div>
                    {/* <iframe src={url} className="grafana_fram"></iframe> */}
                    <iframe src={`https://grafana.iotstream.ir/d-solo/${uid}/${selectedDevice_}?orgId=1&from=${start_time_}&to=${stop_time_}&panelId=${panelId}&kiosk=1&theme=light`} className="grafana_fram"></iframe>
                    {/* mqtt.angizehco.com:3000 */}

                    
                </div>
            </div>

        </Draggable>
        ):
        (
            <div id={`item${counter}`} key={`item${counter}`} className="m-2 border" style={{resize:'both',overflow:"hidden" ,width:'-webkit-fill-available',height:'500px',borderRadius: '12px 12px 0px 0px'}}>
                <div className="wrap_grafana_fram ">
                    <div className="header_grafana_fram">
                        <div data-toggle="tooltip" data-placement="top" title={t("text.chartdelete")} className=""><i className="icon icon-28 icon-close-2 cursor-pointer" onClick={handleCloseChart}></i></div>
                        <div data-toggle="tooltip" data-placement="top" title={t("text.Addchart")}><i className="icon icon-28 icon-plus-primary-2 cursor-pointer" onClick={(e) =>handleEditChart(e,panelId,sensor_type_,selectedDevice_,Name,counter , gateway , _measurement,uid)}></i></div>
                    </div>
                    {/* <iframe src={url} className="grafana_fram"></iframe> */}
                    <iframe src={`https://grafana.iotstream.ir/d-solo/${uid}/${selectedDevice_}?orgId=1&from=${start_time_}&to=${stop_time_}&panelId=${panelId}&kiosk=1&theme=light`} className="grafana_fram"></iframe>
                    {/* mqtt.angizehco.com:3000 */}

                    
                </div>
            </div>
        )
    )
}

export default GrafanaChart;