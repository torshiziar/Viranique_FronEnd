import React, {useEffect, useState} from "react";
import {isMobile} from "react-device-detect";
import Button from "../Button/Button";
import {Link, useHistory} from "react-router-dom";
import LockIcon from "../../assets/img/icons/lock.png";
import UnLockIcon from "../../assets/img/icons/unlock.png";
import editIcon from "../../assets/img/icons/edit.png";
import RemoveIcon from "../../assets/img/icons/Delete.png";
import {
    createActuatorManual,
    deleteActuatorManual,
    getActuatorsListManual,
    retrieveActuatorManual,
    updateActuatorManual,
} from "../../services/api";
import ActuatorManualForm from "../Forms/ActuatorManualForm";
import Modal from "react-modal";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import LoaderAutomation from "../Loader/LoaderAutomation";
import Loader from "../Loader/Loader";
import { useTranslation } from "react-i18next";

Modal.setAppElement('#root')

const customStyles = {
    content: {
        height: 'max-content',
        overflowY: 'auto'
    }
}
const Manual = ({automationType, handleShowAutomation}) => {

    const history = useHistory();

    const [actuatorsManual, setActuatorsManual] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenActionModal, setIsOpenActionModal] = useState(false);
    const [selectedActuator, setSelectedActuator] = useState(null);
    const [actuator, setActuator] = useState(null);
    
    const [isLoading, setIsLoading] = useState(false)
    const [plans, setPlans] = useState([]);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        loadActuatorsList()
    }, []);

    useEffect(() => {
        const ws = new WebSocket(`wss://viranique.com/ws/automation/${localStorage.getItem('token')}/`)
        ws.onopen = () => {
            ws.addEventListener('message', function (event) {
                const data = JSON.parse(event.data);
                if (data.status === 'STARTED') {
                    setPlans(prevState => [...prevState, data])
                }
                if (data.status === 'FAILED' || data.status === 'SUCCEED') {
                    const filteredAutomations = plans.filter(item => item.id !== data.id);
                    setPlans(filteredAutomations);
                    loadActuatorsList()
                    if (data.status === 'SUCCEED') {
                        alert.show(`${t("text.automationwassuccessfullyexecuted")}`, {type: "success"});
                    } else if (data.status === 'FAILED') {
                        alert.show(`${t("text.Automationexecutionfailed")}`, {type: "error"});
                    }
                }
            })
        }

        return () => {
            ws.close()
        }
    }, [])

    const loadActuatorsList = () => {
        setIsLoading(true)
        getActuatorsListManual().then(res => {
            setActuatorsManual(res);
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    }

    const edit = (id) => {
        if (automationType === 'manual') {
            retrieveActuatorManual(id)
                .then(res => {
                    setActuator(res);
                    setIsOpen(true)
                }).catch(err => console.log(err))
        } else {
            handleShowAutomation({isOpen: true, type: `${t("text.Manual")}`})
        }
    };

    const confirmDelete = (id) => {
        deleteActuatorManual(id)
            .then(res => {
                loadActuatorsList()
            }).catch(err => console.log(err))
    }

    const handleLock = (param) => {
        if (automationType === 'manual') {
            if (param.lock) {
                const data = {
                    "lock": false
                }
                updateActuatorManual(data, param.id)
                    .then(() => {
                        loadActuatorsList()
                    }).catch(err => console.log(err))
            } else {
                const data = {
                    "lock": true
                }
                updateActuatorManual(data, param.id)
                    .then(() => {
                        loadActuatorsList()
                    }).catch(err => console.log(err))
            }
        } else {
            handleShowAutomation({isOpen: true, type: `${t("text.Manual")}`})
        }
    }

    const handleChangeState = (e, param) => {
        if (automationType === 'manual') {
            if (param.active) {
                const data = {
                    "active": false
                }
                updateActuatorManual(data, param.id)
                    .catch(err => console.log(err))
            } else {
                const data = {
                    "active": true
                }
                updateActuatorManual(data, param.id)
                    .catch(err => console.log(err))
            }
        } else {
            handleShowAutomation({isOpen: true, type: `${t("text.Manual")}`})
        }
    }

    const handleAutomationManual = (data) => {
        if (automationType === 'manual') {
            setErrors(null)
            if (actuator) {
                updateActuatorManual(data, actuator.id).then(() => {
                    loadActuatorsList()
                    setIsOpen(false)
                    setActuator(null)
                }).catch(err => setErrors(err?.response?.data?.error?.details))
            } else {
                createActuatorManual(data).then(() => {
                    loadActuatorsList()
                    setIsOpen(false)
                }).catch(err => setErrors(err?.response?.data?.error?.details))
            }
        } else {
            handleShowAutomation({isOpen: true, type: `${t("text.Manual")}`})
        }
    }

    const handleCancel = () => {
        setIsOpen(false);
        setActuator(null)
        setErrors(null)
    }

    const handleConfirmDelete = (id, title) => {
        if (automationType === 'manual') {
            confirmAlert({
                customUI: ({onClose}) => {
                    return (
                        <div className={`card card-box`}>
                            <p className={`text-dark text-center ${isMobile ? "mt-3" : ""}`}>{t("text.Areyousuretodeleteautomation")}({title})</p>
                            <div className="d-flex mt-4 justify-content-center">
                                <button
                                    className="button btn-primary-fill-outline py-2 px-3 col-6 mx-2 btn-primary-border text-primary bold"
                                    onClick={() => {
                                        confirmDelete(id)
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
        } else {
            handleShowAutomation({isOpen: true, type: `${t("text.Manual")}`})
        }
    }


    const handleModalOpen = () => {
        if (automationType === 'manual' && !isMobile) {
            setIsOpen(prevState => !prevState)
        } else if (automationType === 'manual' && isMobile) {
            history.push("/Panel/Dashboard/Control/AddActuatorManual")
        } else {
            handleShowAutomation({isOpen: true, type: `${t("text.Manual")}`})
        }
    }

    const handleModalOptionOpen = (data) => {
        if (automationType === 'manual') {
            setSelectedActuator(data);
            setIsOpenActionModal(true)
        } else {
            handleShowAutomation({isOpen: true, type: `${t("text.Manual")}`})
        }
    }
    const { t } = useTranslation();
    return (
        <>
            <div
                className={`row overflow-auto mx--30px px-15px pt-15px mt--30px ${isMobile ? "height-automation-custom-mobile" : "height-automation-custom"}`}>
                <div className="col-lg-6 col-md-12 col-sm-12 px-0">
                    <div className={`${isMobile ? "" : "card p-2"}`}>
                        {
                            isLoading && <Loader/>
                        }
                        {
                            !isMobile && (<div className="table-custom">
                                <div className="table-custom-header">
                                    <span className="table-custom-header-title">{t("text.Statusname")}</span>
                                    <span className="table-custom-header-action">{t("text.activity")}</span>
                                    <span className="table-custom-header-action">{t("text.operations")}</span>
                                </div>
                                <div className="table-custom-body">
                                    {
                                        actuatorsManual.length > 0 && actuatorsManual.map(item => {
                                                return (<div className="table-custom-body-row" key={item?.id}>
                                                    <span className="table-custom-body-title overflow-hidden text-nowrap text-truncate">
                                                        <i className={`icon icon-24-38 ml-2 icon-${item?.actuator?.is_online ? "connected" : "disconnected"}`}/>
                                                        {item.title}
                                                    </span>
                                                    <div className="table-custom-body-action">
                                                        <LoaderAutomation
                                                            display={`${plans?.some(el => el.id === item.id) ? "visibility" : "invisible "}`}/>
                                                        <label
                                                            className={`switch mx-3 ${item.lock ? "disabled" : ""} ${plans?.some(el => el.id === item.id) ? "disabled" : ""}`}>
                                                            <input type="checkbox" checked={item.active}
                                                                   onChange={e => handleChangeState(e, item)}/>
                                                            <span className="slider round"/>
                                                        </label>
                                                        <div
                                                            className="mx-3 cursor-pointer"
                                                            key={item.id + 101}
                                                            onClick={() => handleLock(item)}
                                                            target="_new"
                                                        >
                                                            <div className="d-flex justify-content-center">
                                                                <img src={item.lock ? LockIcon : UnLockIcon} width={24}
                                                                     title={item.lock ? `${t("text.Lock")}` :  `${t("text.open")}`}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="table-custom-body-action">
                                                        <div
                                                            className="mx-3 cursor-pointer"
                                                            key={item.id + 102}
                                                            onClick={() => edit(item.id)}
                                                            target="_new"
                                                        >
                                                            <div className="d-flex justify-content-center">
                                                                <img src={editIcon} width={24} title={`${t("text.edit")}`}/>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="mx-3 cursor-pointer"
                                                            key={item.id + 103}
                                                            onClick={() => handleConfirmDelete(item.id, item.title)}
                                                            target="_new"
                                                        >
                                                            <div className="d-flex justify-content-center">
                                                                <img src={RemoveIcon} width={24} title={`${t("text.delete")}`}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>)
                                            }
                                        )
                                    }
                                </div>
                            </div>)
                        }

                        {
                            isMobile && actuatorsManual.length > 0 && actuatorsManual.map((item, index) => {
                                    return (
                                        <div key={item.id} className={`card py-2 pr-12px pl-2 ${index !== 0 ? "mt-12px" : ""}`}>
                                            <div className="d-flex justify-content-between align-items-center py-1">
                                                <div className={`text-dark overflow-hidden text-nowrap text-truncate basis-40`}>
                                                    <i className={`icon icon-24-38 icon-${item?.actuator?.is_online ? "connected" : "disconnected"} ml-2`}/>
                                                    {item.title}
                                                </div>
                                                <div className="mr-auto ml-3">
                                                    <LoaderAutomation
                                                        display={`${plans?.some(el => el.id === item.id) ? "visibility" : "invisible "}`}/>
                                                </div>
                                                <label className={`switch ml-12px ${item.lock ? "disabled" : ""} ${plans?.some(el => el.id === item.id) ? "disabled" : ""}`}>
                                                    <input type="checkbox" checked={item.active}
                                                           onChange={e => handleChangeState(e, item)}/>
                                                    <span className="slider round"/>
                                                </label>
                                                <div className="">
                                                    <i className="icon icon-24 icon-more-vertical"
                                                       onClick={() => handleModalOptionOpen(item)}/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            )
                        }
                        {
                            (actuatorsManual.length === 0 && !isLoading) ?
                                <p className="text-center mt-4 mb-0"> {t("text.Thereisnoinformationdisplay")}</p> : null
                        }
                        {
                            !isMobile && <div className="mt-3 mb-2">
                                <Button className="button btn-primary-fill p-2 height-auto"
                                        handler={handleModalOpen}>
                                    <i className="icon icon-24 icon-plus"/>
                                </Button>
                            </div>
                        }
                    </div>
                </div>

                {
                    isMobile && <div className="mt-3 align-self-end">
                        <Button className="button btn-primary-fill p-2 height-auto"
                                handler={handleModalOpen}>
                            <i className="icon icon-24 icon-plus"/>
                        </Button>
                    </div>
                }
            </div>

            <Modal
                isOpen={isOpen}
                className={"modal-user"}
                onRequestClose={handleCancel}
                shouldCloseOnOverlayClick={true}
                style={customStyles}
            >
                <div className="row justify-content-center">
                    <div className="py-2 border-bottom px-5">
                        <p className="text-center text-dark bold font-size-18">{t("text.Manualautomation")}</p>
                    </div>
                </div>
                <ActuatorManualForm
                    handler={handleAutomationManual}
                    data={actuator}
                    onCancel={handleCancel}
                    errors={errors}
                />
            </Modal>

            {
                isMobile && (
                    <Modal

                        isOpen={isOpenActionModal}
                        onRequestClose={() => setIsOpenActionModal(false)}
                        className="action-modal"
                    >
                        <div className="row justify-content-end position-relative">
                            <div className="position-absolute btn-close">
                                <i className="icon icon-24 icon-close" onClick={() => setIsOpenActionModal(false)}/>
                            </div>
                        </div>
                        <div className="row px-2">
                            <div className="col-12 mt-2 px-2 py-2 border-bottom">
                                <Link
                                    to={`/Panel/Dashboard/Control/AddActuatorManual/${selectedActuator?.id}`}
                                    className="ml-3 cursor-pointer d-flex align-items-center"
                                >
                                        <span className="d-flex justify-content-center py-1">
                                            <img src={editIcon} width={20} title={`${t("text.edit")}`}/>
                                        </span>
                                    <span className="mr-2 text-dark">{t("text.edit")}</span>
                                </Link>
                            </div>
                            <div className="col-12 px-2 py-2 border-bottom">
                                <div
                                    className="ml-3 cursor-pointer d-flex align-items-center"
                                    onClick={() => {
                                        handleLock(selectedActuator)
                                        setIsOpenActionModal(false)
                                    }}
                                >
                                        <span className="d-flex justify-content-center py-1">
                                            <img src={selectedActuator?.lock ? LockIcon : UnLockIcon} width={20}
                                                 title={`${selectedActuator?.lock ? `${t("text.Lock")}` :  `${t("text.open")}`}`}/>
                                        </span>
                                    <span
                                        className="mr-2 text-dark">{!selectedActuator?.lock ? `${t("text.Lock")}` : `${t("text.open")}`}</span>
                                </div>
                            </div>
                            <div className="col-12 px-2 py-2">
                                <div
                                    className="ml-3 cursor-pointer d-flex align-items-center"
                                    onClick={() => {
                                        handleConfirmDelete(selectedActuator?.id, selectedActuator.title)
                                        setIsOpenActionModal(false)
                                    }}
                                >
                                        <span className="d-flex justify-content-center py-1">
                                            <img src={RemoveIcon} width={20} title={`${t("text.delete")}`}/>
                                        </span>
                                    <span className="mr-2 text-dark">{t("text.delete")} </span>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )
            }
        </>
    )
}


export default Manual