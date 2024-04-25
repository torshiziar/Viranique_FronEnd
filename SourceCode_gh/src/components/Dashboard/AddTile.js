import React, { useEffect, useState, useRef } from "react";
import ReactSelect from '../../components/Select/Select';
import {
    getDeviceType,
    getSensors,
} from "../../services/api";

import {
    sensorTypesToList,
    sensorToList,
    unitsToList
} from "../../utils/toList";
import Button from "../Button/Button";
import { isMobile } from 'react-device-detect';
import { useTranslation } from "react-i18next";

const AddTile = ({ onClose, onSave, isLoading, tile, errors }) => {
    const { t } = useTranslation();
    const [tileWeather, setTileWeather] = useState(false);

    let tileSizes;
    tileWeather ?
        tileSizes = [
            { value: "large", label: `${t("text.largesize")}` },
            { value: "Xlarge", label: `${t("text.xlargesize")}` },

        ]
        :
        tileSizes = [
            { value: "small", label: `${t("text.smallsize")}` },
            { value: "medium", label: `${t("text.mediumsize")}` },
            { value: "large", label: `${t("text.largesize")}` },
        ]

    const timePeriods = [
        { value: "5m", label: `${t("text.minutesago5")}` },
        { value: "30m", label: `${t("text.minutesago30")}` },
        { value: "1h", label: `${t("text.hourago1")}` },
        { value: "6h", label: `${t("text.hourago6")}` },
        { value: "1d", label: "1 روز قبل" },
    ]
    const decimalAccuracies = [
        { value: 1, label: `${t("text.Nodecimals")}` },
        { value: 0.1, label: `${t("text.Onedecimalplace")}` },
    ]
    const [title, setTitle] = useState("");
    const [sensorTypes, setSensorTypes] = useState([]);
    const [units, setUnites] = useState([]);
    const [sensors, setSensors] = useState([]);
    const [selectedTileSize, setSelectedTileSize] = useState(tileSizes[2]);
    const [selectedSensorType, setSelectedSensorType] = useState(null);
    const [selectedSensor, setSelectedSensor] = useState(null);
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(timePeriods[0]);
    const [selectedDecimalAccuracy, setSelectedDecimalAccuracy] = useState(decimalAccuracies[0]);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [collapse, setCollapse] = useState(false);
    const [height, setHeight] = useState("");
    const [validationForm, setValidationForm] = useState(false);

    useEffect(() => {
        if (selectedSensorType?.label == "Weather") {
            setTileWeather(true)
            setSelectedTileSize(tileSizes[2])
        }
        else
            setTileWeather(false)
    }, [selectedSensorType])


    useEffect(() => {
        console.log("selectedSensorType :", selectedSensorType?.label)
        if (selectedSensorType && selectedSensor && title !== "" && selectedTileSize) {
            setValidationForm(true)
        } else {
            setValidationForm(false)
        }
    }, [selectedSensorType, selectedSensor, title, selectedTileSize])

    const ref = useRef(null);

    useEffect(() => {
        loadSensorTypes();
    }, []);

    useEffect(() => {
        if (collapse) setHeight(ref.current?.getBoundingClientRect().height);
        else setHeight(0);
    }, [collapse]);

    useEffect(() => {
        if (selectedSensorType?.item?.units) {
            setUnites(unitsToList(selectedSensorType?.item?.units));
        }
        if (selectedSensorType?.item?.value === "BINARY") {
            setSelectedTileSize(tileSizes[0])
        }
    }, [selectedSensorType]);

    useEffect(() => setSelectedUnit(units[0]), [units])

    const loadSensorTypes = () => {
        getDeviceType().then(res => {
            setSensorTypes(sensorTypesToList(res));
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        setSelectedSensor(null)
        if (selectedSensorType?.value) {
            getSensors(selectedSensorType?.value).then(res => {
                setSensors(sensorToList(res))
            }).catch(err => console.log(err))
        }
    }, [selectedSensorType]);

    useEffect(() => {
        if (tile) {
            setTitle(tile.title);
            setSelectedTileSize(() => {
                return tileSizes.find(item => item.value === tile.size)
            })
            setSelectedUnit(() => {
                return units.find(item => item.value === tile.unit)
            })
            setSelectedDecimalAccuracy(() => {
                return decimalAccuracies.find(item => item.value === +tile.precision)
            })
            setSelectedTimePeriod(() => {
                return timePeriods.find(item => item.value === tile.timeRange)
            })
            setSelectedSensor(() => {
                return sensors.find(item => item.value === tile.sensor)
            })
            setSelectedSensorType(() => {
                return sensorTypes.find(item => item.value === tile.sensor_type);
            })
        }
    }, [tile, sensorTypes, sensors])

    useEffect(() => {
        if (!tile) {
            setTitle(selectedSensor?.label.split("-")[0].trim())
        }
    }, [selectedSensor])

    const save = (e) => {
        let status;
        let tileType;
        switch (selectedTileSize?.value) {
            case 'Xlarge':
                status = {
                    w: "4",
                    h: "2",
                    x: "0",
                    y: "0"
                };
                tileType = "Graph";
                break;
            case 'large':
                status = {
                    w: "2",
                    h: "2",
                    x: "0",
                    y: "0"
                };
                tileType = "Graph";
                break;
            case 'medium':
                status = {
                    w: "2",
                    h: "1",
                    x: "0",
                    y: "0"
                }
                tileType = "Gauge";
                break;
            case 'small':
                status = {
                    w: "1",
                    h: "1",
                    x: "0",
                    y: "0"
                }
                tileType = "Gauge";
                break;
            default:
                status = {
                    w: "1",
                    h: "1",
                    x: "0",
                    y: "0"
                }
                tileType = "Gauge";
                break;
        }

        const data = {
            title,
            size: selectedTileSize?.value,
            unit: selectedUnit?.value,
            precision: selectedDecimalAccuracy?.value,
            timeRange: selectedTimePeriod?.value,
            sensor: selectedSensor?.value,
            sensor_type: selectedSensorType?.value,
            status,
            type: tileType
        };

        onSave && onSave(data) && onClose && onClose();
    }

    return (
        <div className={`mx--15px px-15px mt--15px pt-15px ${isMobile ? "height-tile-form-custom overflow-y-auto overflow-x-clip" : ""}`}>
            <div className={`position-relative ${isMobile ? "card px-1 pt-3" : ""} `}  >
                <div className={`row row-gap-2 ${isMobile ? "px-2" : ""}`}>
                    <div className="col-md-4 col-sm-12">
                        <div className="form-group ">
                            <label htmlFor="selectedSensorType" className="required">{t("text.sensortype")}</label>
                            <ReactSelect
                                className={`autoCompeletSelect ${errors && errors?.sensor_type ? "border-error" : ""}`}
                                value={selectedSensorType}
                                onChange={setSelectedSensorType}
                                options={sensorTypes}
                                mobileMode={true}
                                placeholder={t("text.Select")} />
                            {
                                errors && errors?.sensor_type ? <p className="error-field">{errors?.sensor_type[0]}</p> : null
                            }
                        </div>
                    </div>
                    <div className={`col-md-8 col-sm-12 ${isMobile ? "mt-2" : ""} `}>
                        <div className="form-group ">
                            <label htmlFor="selectedSensor" className="required">{t("text.Sensorselection")}</label>
                            <ReactSelect
                                className={`autoCompeletSelect ${errors && errors?.sensor ? "border-error" : ""}`}
                                value={selectedSensor}
                                onChange={setSelectedSensor}
                                options={sensors}
                                mobileMode={true}
                                placeholder={t("text.Select")} />
                            {
                                errors && errors?.sensor ? <p className="error-field">{errors?.sensor[0]}</p> : null
                            }
                        </div>
                    </div>
                </div>
                <div className={`row ${isMobile ? "px-2" : "pt-3"}  `}>
                    <div className={`col-md-8 col-sm-12 ${isMobile ? "mt-2" : ""}`}>
                        <div className="form-group">
                            <label htmlFor="title" className="required">
                                {t("text.Tilename")}
                            </label>
                            <input
                                className={`form-control px-3 ${errors && errors?.title ? "border-error" : ""}`}
                                type="text"
                                id="title"
                                name="title"
                                placeholder={t("text.Choosedesirednameforsensor")}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                            {
                                errors && errors?.title ? <p className="error-field">{errors?.title[0]}</p> : null
                            }
                        </div>
                    </div>

                    <div className={`col-md-4 col-sm-12 ${isMobile ? "mt-2" : ""} `}>
                        <div className="form-group ">
                            <label htmlFor="provinceSelected" className="required">{t("text.Displaytype")}</label>
                            <ReactSelect
                                className={`autoCompeletSelect ${selectedSensorType?.item?.value === "BINARY" ? "disabled" : ""} ${errors && errors?.size ? "border-error" : ""}`}
                                value={selectedTileSize}
                                onChange={setSelectedTileSize}
                                options={tileSizes}
                                mobileMode={true}
                                placeholder={t("text.Select")} />
                            {
                                errors && errors?.size ? <p className="error-field">{errors?.size[0]}</p> : null
                            }
                        </div>
                    </div>
                </div>

                {
                    selectedSensorType?.item?.value !== "BINARY" &&
                    <>
                        <div
                            className={`border-bottom ${isMobile ? "mx-2 mt-2" : "mt-4"} ${(isMobile && !collapse) ? "" : "mb-3"}`} />

                        <div className={`custom-collapse`} style={{ height }}>

                            <div ref={ref}>
                                {
                                    collapse && (
                                        <>
                                            <div className={`row ${isMobile ? "px-2 pb-3" : ""} ${tileWeather ? 'disabled_' : ''} `}>
                                                <div className={`col-md-4 col-sm-12 ${isMobile ? "mt-2" : "mt-3"}`}>
                                                    <div className="form-group ">
                                                        <label htmlFor="provinceSelected">{t("text.period")}</label>
                                                        <ReactSelect
                                                            className={`autoCompeletSelect ${selectedTileSize?.value !== 'large' ? "disabled" : ""}`}
                                                            value={selectedTimePeriod}
                                                            onChange={setSelectedTimePeriod}
                                                            options={timePeriods}
                                                            mobileMode={true}
                                                            placeholder={t("text.Select")} />
                                                    </div>
                                                </div>
                                                <div className={`col-md-4 col-sm-12 ${isMobile ? "mt-2" : "mt-3"}`}>
                                                    <div className="form-group ">
                                                        <label htmlFor="selectedDiagramType">{t("text.Unitofmeasurement")}</label>
                                                        <ReactSelect
                                                            className="autoCompeletSelect "
                                                            value={selectedUnit}
                                                            onChange={setSelectedUnit}
                                                            options={units}
                                                            mobileMode={true}
                                                            placeholder={t("text.Select")} />
                                                    </div>
                                                </div>
                                                <div className={`col-md-4 col-sm-12 ${isMobile ? "mt-2" : "mt-3"}`}>
                                                    <div className="form-group ">
                                                        <label htmlFor="provinceSelected">{t("text.Decimalprecision")}</label>
                                                        <ReactSelect
                                                            className="autoCompeletSelect "
                                                            value={selectedDecimalAccuracy}
                                                            onChange={setSelectedDecimalAccuracy}
                                                            options={decimalAccuracies}
                                                            mobileMode={true}
                                                            placeholder={t("text.Select")} />
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                !isMobile && <div className="border-bottom mt-4 mb-3" />
                                            }
                                        </>
                                    )
                                }
                            </div>
                        </div>
                        <div
                            className={`btn-collapse icon-24 icon-arrow-${collapse ? "up" : "down"}-primary cursor-pointer`}
                            onClick={() => setCollapse(prevState => !prevState)} style={{ bottom: `-13px` }} />
                    </>
                }
            </div>
            <div className="row justify-content-end">
                <div className={`col-12 d-flex justify-content-end ${isMobile ? "mt-4" : "mt-3"}`}>
                    <Button
                        type="submit"
                        className={`d-flex button btn-primary-fill justify-content-center align-items-center px-5 ml-3 ${isMobile ? "width-65 mt-3" : ""} ${validationForm || tileWeather ? "" : "disabled"}`}
                        handler={(e) => {
                            save(e);
                        }}
                        isLoading={isLoading}
                    >
                        <p className='m-0'>{t('text.save')}</p>
                    </Button>
                    <Button
                        type="submit"
                        className={`d-flex button btn-primary-outline px-5 justify-content-center align-items-center ${isMobile ? "width-35 mt-3" : ""}`}
                        handler={(e) => {
                            onClose ? onClose() : history.back();
                        }}>
                        <p className='m-0'>{t("text.cancel")}</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddTile;