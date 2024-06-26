import React from "react";
import GraphTemperature from "../Charts/GraphTemperature";
import { useTranslation } from "react-i18next";
import GuageWaterPH from "../Charts/GuageWaterPH";

const WaterPH = ({data, isOnline, value, lastUpdated, interval, fakeValues, graphValue, isConnected}) => {
    const { t} = useTranslation();
    return (<div className={`d-flex flex-wrap ${data?.size === "small" ? "align-items-center flex-grow-1" : ""}`}>
        <div className="col-5 pl-0 d-flex align-items-center position-relative">
            <div className="d-flex align-items-center">
                <div className={`icon icon-24 ${isOnline ? "icon-acidity" : "icon-acidity-disable"}`}/>
                <div className={`h3 mr-2 mb-0 bold ${!isOnline ? "font-24" : "font-30"}`}>
                    <span className="">
                        {
                            !isOnline || !isConnected ? `${t("text.Inactive")}` : value ? value[value.length - 1].value : ""
                        }
                    </span>
                </div>
            </div>
            {/* { //gh
                !isOnline && value && <div className="tile-description temperature">
                    <div className="d-flex align-items-center">
                            <span>
                                {lastUpdated} دقیقه قبل :
                            </span>
                        <span>
                                {value && value[value.length - 1].value}
                        </span>
                    </div>
                </div>
            } */}
        </div>
        {(data?.size === "medium" || data?.size === "large") &&
            <GuageWaterPH id={"gauge-" + data?.id} value={value ? value[value.length - 1].value : 0} />}

        {
            data?.size === "large" && interval ? (
                <GraphTemperature interval={interval} id={"graph-" + data.id} value={graphValue?.data || fakeValues} fakeData={!value}/>) : null
        }
    </div>)
}

export default WaterPH;