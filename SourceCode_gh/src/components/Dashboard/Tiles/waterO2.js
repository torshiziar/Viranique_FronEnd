import React from "react";
import GraphTemperature from "../Charts/GraphTemperature";
import GaugeWaterO2 from "../Charts/GaugeWaterO2"; ///mr kharazi
import { useTranslation } from "react-i18next";

const WaterO2 = ({data, isOnline, value, lastUpdated, interval, fakeValues, graphValue, isConnected}) => {
    const { t} = useTranslation();
    return (<div className={`d-flex flex-wrap position-relative h-full${data?.size === "small" ? "align-items-center flex-grow-1" : ""}`}>
        <div className="col-5 pl-0 d-flex align-items-center">
            <div className="d-flex align-items-center">
                <div className={`icon icon-24 ${isOnline ? "icon-do" : "icons-Do-disable"}`}/>
                <div className={`h3 mr-2 mb-0 bold ${!isOnline ? "font-24" : "font-30"}`}>
                    <span className="">
                        {
                            !isOnline || !isConnected ? `${t("text.Inactive")}` : value ? ((value[value.length - 1].value)) : "" //((value[value.length - 1].value)/1000).toFixed(1) mr kharazi
                        }
                    </span>
                    <span className="h6">
                        {
                            isOnline || !isConnected ? "mV" : ""
                        }
                    </span>
                </div>
            </div>
            {
                isOnline && data?.size === "medium" && <div className="tile-description">
                    <span className="circle humidity"/>
                    <span>رطوبت</span>
                </div>
            }

            {
                !isOnline && value && <div className="tile-description temperature">
                    <div className="d-flex align-items-center">
                            <span className="text-nowrap">
                                {lastUpdated} دقیقه قبل :
                            </span>
                        <span>%</span>
                        <span className="">
                                {value && value[value.length - 1].value}
                        </span>
                    </div>
                </div>
            }
        </div>
        {(data?.size === "medium" || data?.size === "large") ? value ? (
            <GaugeWaterO2 id={"gauge-" + data.id} value={((value[value.length - 1].value))}/>) : (<GaugeWaterO2 id={"gauge-" + data.id} value={0}/>) : null //(value[value.length - 1].value)/1000).toFixed(1 mr kharazi
        }

        {
            data?.size === "large" && interval ? (
                <GraphTemperature interval={interval} id={"graph-" + data.id} value={graphValue?.data || fakeValues} fakeData={!value}/>) : null
        }
    </div>)
}

export default WaterO2;