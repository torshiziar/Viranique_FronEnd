import React from "react";
import { useTranslation } from "react-i18next";
import Weather from "../../Weather";

const WeatherTile = ({ location, setLocation, selectedTab }) => { 
    const { t } = useTranslation();
    return (
        <div>
            <Weather selectedTab={selectedTab} location={location} setLocation={setLocation} />
        </div>

    )
}


export default WeatherTile;