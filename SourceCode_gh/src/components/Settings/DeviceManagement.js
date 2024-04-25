import React, {useEffect, useRef, useState} from "react";
import {
    addDevice,
    deleteDevice,
    getActuatorDevice,
    getDevicesList,
    getSensorDevice, updateActuatorDevice,
    updateSensorDevice
} from "../../services/api";
import DeviceManagementForm from "../Forms/DeviceManagementForm";
import Button from "../Button/Button";
import editIcon from "../../assets/img/icons/edit.png";
import RemoveIcon from "../../assets/img/icons/Delete.png";
import {confirmAlert} from "react-confirm-alert";
import {isMobile} from "react-device-detect";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'unset',
        bottom: 'unset',
    },
};

Modal.setAppElement('#root');


const DeviceManagement = ({collapse}) => {
    const { t } = useTranslation();
    const [deviceManagement, setDeviceManagement] = useState(null);
    const [managementDevicesList, setManagementDevicesList] = useState([])

    const [sensorsList, setSensorsList] = useState([])
    const [actuatorsList, setActuatorsList] = useState([])
    const [selectedDeviceType, setSelectedDeviceType] = useState("")

    const [height, setHeight] = useState("")
    const refDevice = useRef(null)
    const [isOpenDevice, setIsOpenDevice] = useState(false);
    const [errors, setErrors] = useState(null);

    const [errorDevice, setErrorDevice] = useState("")

    useEffect(() => {
        if (collapse && !isMobile) setHeight(refDevice.current?.getBoundingClientRect().height + 16);
        else setHeight(0);
    }, [collapse]);

    const edit = (id, type) => {
        if (type === "sensor") {
            loadSensorDevice(id)
        } else {
            loadActuatorDevice(id)
        }
    };

    const deleteRecord = (row) => {
        const values = {
            "part_number": row.part_number
        }

        deleteDevice(values).then(res => {
            loadDevicesList()
        }).catch(err => console.log(err))
    };

    const confirmDelete = (param) => {
        console.log(param)
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className={`card card-box w-75`}>
                        <p className={`text-dark text-center ${isMobile ? "mt-3" : ""}`}>{t("text.areyousuredeletedevice")}({param?.title})</p>
                        <div className="d-flex mt-4 justify-content-center">
                            <button
                                className="button btn-primary-fill-outline py-2 px-3 col-6 mx-2 btn-primary-border text-primary bold"
                                onClick={() => {
                                    deleteRecord(param)
                                    onClose();
                                }}
                            >
                                <span className="py-1 px-3">{t("text.Iamsure")}</span>
                            </button>
                            <button className="button btn-primary-fill py-2 px-4 col-6 mr-2 bold" onClick={onClose}>
                                <span className="py-1 px-3">{t('text.cancel')}</span>
                            </button>
                        </div>
                    </div>
                );
            },
            overlayClassName: "overlay-custom-confirm-modal"
        });
    }

    const loadDevicesList = () => {
        getDevicesList().then(res => {
            setSensorsList(res?.sensors);
            setActuatorsList(res?.actuators)
        }).catch(err => console.log(err))
    }

    const loadSensorDevice = (id) => {
        getSensorDevice(id).then(res => {
            setDeviceManagement(res)
            setSelectedDeviceType("sensor")
            setIsOpenDevice(true);
        }).catch(err => console.log(err))
    }

    const loadActuatorDevice = id => {
        getActuatorDevice(id).then(res => {
            setDeviceManagement(res)
            setSelectedDeviceType("actuator")
            setIsOpenDevice(true);
        }).catch(err => console.log(err))
    }

    const checkSensorExist = value => {
        setErrorDevice(managementDevicesList.some(item => item.part_number === value) ? "exist" : "")
    }

    const handleDeviceManagement = (values) => {
        if (deviceManagement) {
            if (selectedDeviceType === "sensor") {
                updateSensorDevice(deviceManagement?.id, values).then(res => {
                    loadDevicesList()
                    handleCloseModal()
                }).catch(err => setErrors(err?.response?.data?.error?.details))
            } else {
                updateActuatorDevice(deviceManagement?.id, values).then(res => {
                    loadDevicesList()
                    handleCloseModal()
                }).catch(err => setErrors(err?.response?.data?.error?.details))
            }
        } else {
            if (values) {
                addDevice(values).then(res => {
                    loadDevicesList()
                    handleCloseModal()
                }).catch(err => {
                    console.log(err?.response?.data?.error?.details)
                    setErrors(err?.response?.data?.error?.details)
                    if (err?.response?.data?.error?.details?.detail === 'یافت نشد.') {
                        setErrorDevice("notFound")
                    //     setErrors(err?.response?.data?.error?.details)
                    }
                })
            }
        }
    }

    useEffect(() => {
        loadDevicesList()
    }, [])

    const handleCloseModal = () => {
        setDeviceManagement(null)
        setIsOpenDevice(false)
        setErrors(null)
    }

    return (
        <>
            <div className={`mx--15px px-30px mt--15px pt-15px ${isMobile ? "height-user-custom overflow-auto" : "custom-collapse overflow-hidden"}`}
                 style={isMobile ? {height: "calc(100vh - 129px)"} : {height}}>
                <section className={`${isMobile ? "row" : "px-2"}`} ref={refDevice}>
                    <div className={`device-management-table ${isMobile ? "col-12" : ""}`}>
                        {
                            !isMobile && (<div className="row mx-0">
                                <div className="col-4 px-2 device-management-table-header">
                                {t("text.devicename")}
                                </div>
                                <div className="col px-2 device-management-table-header">
                                {t("text.parameter")}
                                </div>
                                <div className="col px-2 device-management-table-header">
                                {t("text.Serialnumberdevice")}
                                </div>
                                <div className="col px-2 device-management-table-header">

                                </div>
                            </div>)
                        }
                        {
                            !isMobile && sensorsList?.map(item => {
                                return (<div key={item?.id + 204} className="row font-500 font-size-14 mx-0 device-management-table-body align-items-center">
                                        <div className="col-4 px-2 text-dark">
                                            {item?.title}
                                        </div>
                                        <div className="col px-2">
                                            {item?.type?.title}
                                        </div>
                                        <div className="col px-2">
                                            {item?.part_number}
                                        </div>
                                        <div className="col px-2 d-flex align-items-center justify-content-center">
                                            <i className="icon icon-24 icon-delete mx-2 cursor-pointer" onClick={() => confirmDelete(item)}/>
                                            <i className="icon icon-24 icon-edit mr-2 cursor-pointer"  onClick={() => edit(item.id, "sensor")}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            !isMobile && actuatorsList?.map(item => {
                                return (<div key={item?.id + 105} className="row font-500 font-size-14 mx-0 device-management-table-body align-items-center">
                                        <div className="col-4 px-2 text-dark">
                                            {item?.title}
                                        </div>
                                        <div className="col px-2">
                                            {item?.type?.title}
                                        </div>
                                        <div className="col px-2">
                                            {item?.part_number}
                                        </div>
                                        <div className="col px-2 d-flex align-items-center justify-content-center">
                                            <i className="icon icon-24 icon-delete mx-2 cursor-pointer" onClick={() => confirmDelete(item)}/>
                                            <i className="icon icon-24 icon-edit mr-2 cursor-pointer"  onClick={() => edit(item.id, "actuator")}/>
                                        </div>
                                    </div>
                                )
                            })
                        }

                        {
                            isMobile && sensorsList?.map(item => {
                                return (
                                    <div className="row card mb-12px py-3" key={item?.id + 305}>
                                        <div className="col-12 d-flex flex-column">
                                            <div className="d-flex justify-content-between">
                                                <div className="bold"> {t("text.devicename")} : <span
                                                className="text-dark">{item.title}</span></div>
                                                <div className="bold">{t("text.parameter")}: <span
                                                className="text-dark">{item?.type?.title}</span></div>
                                            </div>
                                            <div className="d-flex justify-content-between mt-3">
                                                <div className="bold">{t("text.Serialnumberdevice")} : <span
                                                    className="text-dark">{item.part_number}</span></div>
                                                <div className="d-flex">
                                                    <div
                                                        className="ml-3 cursor-pointer"
                                                        key={item.id + 101}
                                                        onClick={() => edit(item.id, "sensor")}
                                                        target="_new"
                                                    >
                                                        <div className="d-flex justify-content-center">
                                                            <img src={editIcon} width={20} title={t("text.edit")}/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="cursor-pointer"
                                                        key={item.id + 102}
                                                        onClick={() => confirmDelete(item)}
                                                        target="_new"
                                                    >
                                                        <div className="d-flex justify-content-center">
                                                            <img src={RemoveIcon} width={20} title={`${t("text.delete")}`}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            isMobile && actuatorsList?.map(item => {
                                return (
                                    <div className="row card mb-12px py-3" key={item?.id + 405}>
                                        <div className="col-12 d-flex flex-column">
                                            <div className="d-flex justify-content-between">
                                                <div className="bold"> {t("text.devicename")} : <span
                                                className="text-dark">{item.title}</span></div>
                                                <div className="bold">{t("text.parameter")}: <span
                                                className="text-dark">{item?.type?.title}</span></div>
                                            </div>
                                            <div className="d-flex justify-content-between mt-3">
                                                <div className="bold">{t("text.Serialnumberdevice")} : <span
                                                    className="text-dark">{item.part_number}</span></div>
                                                <div className="d-flex">
                                                    <div
                                                        className="ml-3 cursor-pointer"
                                                        key={item.id + 101}
                                                        onClick={() => edit(item.id, "actuator")}
                                                        target="_new"
                                                    >
                                                        <div className="d-flex justify-content-center">
                                                            <img src={editIcon} width={20} title={t("text.edit")}/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="cursor-pointer"
                                                        key={item.id + 102}
                                                        onClick={() => confirmDelete(item)}
                                                        target="_new"
                                                    >
                                                        <div className="d-flex justify-content-center">
                                                            <img src={RemoveIcon} width={20} title={`${t("text.delete")}`}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {
                        <div className={`${isMobile ? "" : "mt-3"}`}>
                            <Button className="button btn-primary-fill p-2 height-auto"
                                    handler={() => setIsOpenDevice(prevState => !prevState)}>
                                <i className="icon icon-24 icon-plus"/>
                            </Button>
                        </div>
                    }
                </section>
            </div>

            <Modal
                isOpen={isOpenDevice}
                onRequestClose={handleCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
                className="p-3 bg-white"
            >
                <DeviceManagementForm data={deviceManagement} onChange={checkSensorExist} errorDevice={errorDevice}
                                    handler={handleDeviceManagement} isOpenDevice={isOpenDevice}
                                    onClose={handleCloseModal}
                                    errors={errors}
                />
            </Modal>
        </>
    )
}


export default DeviceManagement;