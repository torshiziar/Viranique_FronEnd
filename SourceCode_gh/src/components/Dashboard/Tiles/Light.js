import React from "react";
import GaugeHumidity from "../Charts/GaugeHumidity";
import GraphTemperature from "../Charts/GraphTemperature";
import LightTemperature from "../Charts/LightTemperature";
import { useTranslation } from "react-i18next";

const Light = ({data,isOnline, value,lastUpdated, interval, fakeValues, graphValue, isConnected}) => {
    const { t} = useTranslation();
    return (<div className={`d-flex flex-wrap position-relative h-full${data?.size === "small" ? "align-items-center flex-grow-1" : ""}`}>
        <div className="col-5 pl-0 d-flex align-items-center">
            <div className="d-flex align-items-center">
                <div className={`icon icon-24 ${isOnline ? "icon-sun" : "icon-sun-off"}`}/>
                <div className={`h3 mr-2 mb-0 bold ${!isOnline ? "font-24" : "font-30"}`}>
                    <span className="">
                        {
                            !isOnline || !isConnected ? `${t("text.Inactive")}` : value ? (value[value.length - 1].value / 1000).toFixed(1) : ""
                        }
                    </span>
                    <span className="font-9 mx-2">
                        {
                            isOnline || !isConnected ? "KLUX" : ""
                        }
                    </span>
                </div>
            </div>
            {
                isOnline && data?.size === "medium" && <div className="tile-description">
                    <span className="circle humidity"/>
                    <span>Light</span>
                </div>
            }

            {
                !isOnline && value && <div className="tile-description temperature">
                    <div className="d-flex align-items-center">
                            <span className="text-nowrap">
                                {lastUpdated} دقیقه قبل :
                            </span>
                        <span>%</span>
                        <span>
                                {value && value[value.length - 1].value}
                        </span>
                    </div>
                </div>
            }
        </div>
        {(data?.size === "medium" || data?.size === "large") ? value ? (
            <LightTemperature id={"gauge-" + data.id} value={value[value.length - 1].value}/>) : (<LightTemperature id={"gauge-" + data.id} value={0}/>) : null
        }

        {
            data?.size === "large" && interval ? (
                <GraphTemperature interval={interval} id={"graph-" + data.id} value={graphValue?.data || fakeValues} fakeData={!value}/>) : null
        }
    </div>)
}

export default Light;