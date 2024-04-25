import React from "react";
import { useTranslation } from "react-i18next";


const DeviceDetailItem = ({type, item, color, label}) => {
  const { t} = useTranslation();
  const {value, is_online} = item;
  return(
    <div 
      className={"col-md-3 col-6 mt-3 device-item item-" + type + " " + (is_online ? "item-is-online " : "item-is-offline ") + (value ? "item-value-true" : "")} 
      title={label}>
      <div className="card p-3 justify-content-around align-items-center device-item-content " >
        <div className="">{item?.title ? item?.title : ""}</div>
        { 
          type === "Temperature" ?
          <>
            <div className="px-3 " style={{direction: "ltr"}}>{is_online ? (value + " °C ") : `${t("text.Inactive")}`}</div>
            <div className="icon icon-48 icon-temp"></div>
          </>
          : type === "Humidity" ?
          <>
            <div className="px-3 " style={{direction: "ltr"}}>{is_online ? (value + " % ") : `${t("text.Inactive")}`}</div>
            <div className="icon icon-48 icon-humidity"></div>
          </>
          : type === "Power" ?
          <>
            <div className="px-3 " style={{direction: "ltr"}}>{is_online ? (value ? `${t("text.Normalpower")}` : `${t("text.emergencypower")}`) : `${t("text.Inactive")}`}</div>
            <div className="icon icon-48 icon-power-light"></div>
          </> 
          : type === "Door" ?
          <>
            <div className="px-3 " style={{direction: "ltr"}}>{is_online ? (value ? `${t("text.open")}` : `${t("text.closed")}`) : `${t("text.Inactive")}`}</div>
            <div className="icon icon-48 icon-door"></div>
          </>
          : type === "HVAC" ?
          <>
            <div className="px-3 " style={{direction: "ltr"}}>{is_online ? ("" + (value ? `${t("text.on")}` :`${t("text.off")}` )) : `${t("text.Inactive")}`}</div>
            <div className="icon icon-48 icon-air-cool"></div>
          </> 
          : type === "HVAC2" ?
          <>
            <div className="px-3 " style={{direction: "ltr"}}>{is_online ? ("کولر گازی ۲" + (value ? `${t("text.on")}` : `${t("text.off")}`)) : `${t("text.Inactive")}`}</div>
            <div className="icon icon-48 icon-air-cool"></div>
          </> 
          : type === "Motion" ?
          <>
            <div className="px-3 " style={{direction: "ltr"}}>{is_online ? ("" + (value ? `${t("text.on")}` : `${t("text.off")}`)) : `${t("text.Inactive")}`}</div>
            <div className="icon icon-48 icon-motion-detection"></div>
          </>
          : type === "GSM" ?
          <>
            <div className="px-3 " style={{direction: "ltr"}}>{is_online ? ("" + (value ? "عدم اتصال" :  `${t("text.Connected")}`)) : `${t("text.Inactive")}`}</div>
            <div className="icon icon-48 icon-electricity"></div>
          </> 
          : null
        }
        <div title={label} className="circle-point rounded-circle position-absolute " style={{backgroundColor: color}}></div>
      </div>
    </div>
  )
}

export default DeviceDetailItem;