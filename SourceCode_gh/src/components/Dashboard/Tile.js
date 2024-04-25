import React, {useEffect, useState, useRef} from "react";
import {deleteTile} from "../../services/api";
import Temperature from "./Tiles/Temperature";
import Humidity from "./Tiles/Humidity";
import NI from './Tiles/NI';
import EC from './Tiles/EC';
import PH from './Tiles/PH';
import PHOS from './Tiles/PHOS';
import POT from './Tiles/POT';
import Door from "./Tiles/Door";
import Light from "./Tiles/Light";
import LightIntensity from "./Tiles/LightIntensity";
import Moisture from "./Tiles/Moisture";
import LeafMoisture from "./Tiles/LeafMoisture";
import LeafTemperature from "./Tiles/LeafTemperature";
import SoilTemperature from "./Tiles/SoilTemperature";
import WaterO2 from './Tiles/waterO2';
import Do from "./Tiles/Do";
import CO2 from "./Tiles/CO2";
import ACPower from "./Tiles/ACPower";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {isMobile} from 'react-device-detect';
import {connect} from "react-redux";
import moment from "moment-jalaali";
import {Link} from "react-router-dom";
import {store} from "../../redux/store";
import WaterTemprature from "./Tiles/waterTemprature";
import WaterPH from "./Tiles/waterPH";
import WaterEC from "./Tiles/waterEC";
import { useTranslation } from "react-i18next";
import WeatherTile from "./Tiles/Weather";
import BOD from "./Tiles/BOD";
import Chlorophyll from "./Tiles/Chlorophyll";
import TSS from "./Tiles/TSS";

const PAGES = {
    Temperature: Temperature,
    Humidity: Humidity,
    NI: NI,
    EC: EC,
    PH: PH,
    PHOS: PHOS,
    POT: POT,
    Door: Door,
    CO2: CO2,
    Light: Light,
    LightIntensity: LightIntensity,
    Moisture: Moisture,
    LeafMoisture: LeafMoisture,
    LeafTemperature: LeafTemperature,
    SoilTemperature: SoilTemperature,
    DO: Do,
    ACPower: ACPower,
    ORP:WaterO2,
    WaterPH:WaterPH,
    WaterTemperature:WaterTemprature,
    WaterEC:WaterEC,
    Weather:WeatherTile,
    BOD:BOD,
    chlorophyll:Chlorophyll,
    TSS:TSS,


}
const fakeValues = [
    {value: 0, time: moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")},
    {value: 0, time: moment().format("YYYY-MM-DD HH:mm:ss")},
]

const Tile = ({data, onRemoveItem, onEdit, isDraggable, tilesData, selectedTab, tilesGraph, location ,setLocation}) => {
    const { t} = useTranslation();
    let socketData;
    let graphData;
    const [isOnline, setIsOnline] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    const [dropDownMenuOpen, setDropDownMenuOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [graphValue, setGraphValue] = useState(null);
    const [interval, setInterval] = useState("")
    const wrapperRef = useRef(null);
    const refMore = useRef(null);
    const [lastUpdated, setLastUpdated] = useState(0);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        socketData = tilesData.find(item => item.id === data?.id)
        setInterval(socketData?.interval ? socketData.interval : '1h');
        setValue(socketData?.data?.length > 0 ? socketData?.data : null)
        setIsOnline(socketData?.is_online)
        setIsConnected(socketData?.is_connected);
        if (isOnline && socketData?.data) {
            let now = moment(new Date());
            let lastUpdatedTile = moment(socketData?.data[socketData?.data.length - 1]?.time);
            let diff = now.diff(lastUpdatedTile, 'minutes');
            setLastUpdated(diff);
        }
    }, [tilesData])


    useEffect(() => {
        graphData = tilesGraph.find(item => item.id === data?.id);
        setGraphValue(graphData)
    }, [tilesGraph])

    store.subscribe(() => {
        graphData = tilesGraph.find(item => item.id === data?.id);
        setGraphValue(graphData)
    });

    const handleClickOutside = (event) => {
        if ((wrapperRef.current && !wrapperRef.current.contains(event.target)) && (refMore.current && !refMore.current.contains(event.target))) {
            setDropDownMenuOpen(false);
        }
    }

    const deleteItem = async () => {
        // onRemoveItem && onRemoveItem(data.id);
        setDropDownMenuOpen(false);
        await deleteTile(data?.id)
        .then((res)=>{
            console.log("res",res)
        onRemoveItem && onRemoveItem(data.id);

        })
        .catch((err)=>{
            console.log("err",err)
            if(err?.response?.data?.error?.code == "permission_denied" && err?.response?.data?.error?.details?.detail == "شما اجازه انجام این دستور را ندارید.")
            alert.show(t("text.Youarenotauthorizedexecutecommand"), { type: "error" });
        })
        /////////////////////////
    }

    const Handler = PAGES[data?.sensor_type?.name];

    const handleConfirmDelete = () => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className={`card card-box`}>
                        <p className={`text-dark text-center ${isMobile ? "mt-3" : ""}`}>{t("text.Areyousurewantdeletetile")}</p>
                        <div className="d-flex mt-4 justify-content-center">
                            <button
                                className="button btn-primary-fill-outline py-2 px-3 col-6 mx-2 btn-primary-border text-primary bold"
                                onClick={() => {
                                    deleteItem()
                                    onClose();
                                }}
                            >
                                <span className="py-1 px-3">{t("text.Iamsure")}</span>
                            </button>
                            <button className="button btn-primary-fill py-2 px-4 col-6 mr-2 bold" onClick={onClose}>
                                <span className="py-1 px-3">{t("text.cancel")}</span>
                            </button>
                        </div>
                    </div>
                );
            },
            overlayClassName: "overlay-custom-confirm-modal"
        });
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
        setDropDownMenuOpen(true)
    }

    // ${data.title?.indexOf("خاک") ? 'tile-header-bg-gray' : data.title?.indexOf("آب") ? 'tile-header-bg-blue' :data.title?.indexOf("هوا")? 'tile-header-bg-white' :'' }
    return (
        <section
            className={`tile-item ${data?.size === 'large' || data?.size === 'Xlarge' ? "tile-item-large" : "tile-item-medium"} ${!isOnline || !isConnected ? "tile-bg-grey" : "tile-bg-white"}`}
        >
            <div className={`tile-card position-relative ${data?.size === "small" ? "h-100 d-flex flex-column" : ""}`}>
                <div className={`tile-header d-flex justify-content-between py-2 px-12 align-items-center border-bottom`}>
                    <div className="title-text h5 mb-0" title={data?.title}>{data?.title}</div>
                    <div className={`icon icon-24 icon-more-vertical cursor-pointer ${isDraggable ? "disabled" : ""}`}
                         ref={refMore}
                         onMouseDown={e => stopPropagation(e)}
                         onTouchStart={e => stopPropagation(e)}
                    />
                </div>
                {
                    Handler &&
                    <Handler data={data} isOnline={isOnline} value={value} interval={interval} graphValue={graphValue}
                             fakeValues={fakeValues} lastUpdated={lastUpdated} isConnected={isConnected}  location={location} setLocation={setLocation} selectedTab={selectedTab}/>//3تا پراپ آخر برای تایل آبو هوا بعدا بردارم
                }
                <div
                    className={"tile-dropdown position-absolute px-2 bg-white " + (dropDownMenuOpen ? "selected" : "") }
                    ref={wrapperRef}>
                  {(data?.sensor_type?.name !== "Weather") && 
                (
                    isMobile ? (
                        <Link className="d-flex tile-dropdown-item border-bottom mx-1 py-2 align-items-center"
                              to={{
                                  pathname: `/Panel/Dashboard/AddNewTile/${data?.id}`,
                                  state: {selectedTab: selectedTab}
                              }}>
                            <div className="icon icon-16 icon-edit"/>
                            <div className="mr-2">{t("text.edit")}</div>
                        </Link>) : (
                        <div className="d-flex tile-dropdown-item border-bottom mx-1 py-2 align-items-center"
                             onClick={() => onEdit(data?.id)}>
                            <div className="icon icon-16 icon-edit"/>
                            <div className="mr-2">{t("text.edit")}</div>
                        </div>)
                  )
                }
                    <div className="d-flex tile-dropdown-item mx-1 py-2 align-items-center"
                         onClick={() => handleConfirmDelete()}>
                        <div className="icon icon-16 icon-delete"/>
                        <div className="mr-2">{t("text.delete")}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = state => ({
    tilesData: state.tilesData,
    tilesGraph: state.tilesGraph
});

export default connect(mapStateToProps, null)(Tile);