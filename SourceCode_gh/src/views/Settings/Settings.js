import React, {useEffect, useRef, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Modal from 'react-modal';

import {
    getSettingsAutomation,
    getActuatorsListAutomatic,
    getActuatorsListSmart,
    getActuatorsListManual,
    updateSettingsAutomation,
    getNotificationAutomation,
    getNotificationType,
    updateNotificationType,
    createNotificationAutomation,
    followNotification,
    unFollowNotification,
    deleteNotificationAutomation, getNotificationsAutomation, getSensors, getActuators, updateNotificationAutomation
} from "../../services/api";
import Button from '../../components/Button/Button';
import {isMobile} from "react-device-detect";
import 'react-confirm-alert/src/react-confirm-alert.css';
import DeviceManagement from "../../components/Settings/DeviceManagement";
import NotificationItem from "../../components/Settings/NotificationItem";
import {confirmAlert} from "react-confirm-alert";
import CreateNotificationForm from "../../components/Forms/CreateNotificationForm";
import {actuatorsToList, automaticToList, manualToList, sensorToList} from "../../utils/toList";
import { useTranslation } from "react-i18next";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'unset',
        bottom: 'unset',
        transform: 'translate(-50%, -50%)',
    },
};

const customStylesNotification = {
    content: {
        height: 'max-content',
        overflowY: 'auto'
    }
}

Modal.setAppElement('#root');

const Settings = () => {
    const { t } = useTranslation();
    const history = useHistory();

    const [automationState, setAutomationState] = useState(false)
    const [automationType, setAutomationType] = useState('')
    const [automationModalOpen, setAutomationModalOpen] = useState({isOpen: false, type: ''})
    const [AutomationTypeModalOpen, setAutomationTypeModalOpen] = useState(false)
    const [automationStatus, setAutomationStatus] = useState("last");

    const [automationModalIfEmptyOpen, setAutomationModalIfEmptyOpen] = useState({isOpen: false, type: ''})
    const [modalAutomationTypeSelect, setModalAutomationTypeSelect] = useState({isOpen: false, type: '', label: ''});

    const [createNotificationModal, setCreateNotificationModal] = useState(false)
    const [notificationsAutomation, setNotificationsAutomation] = useState([]);
    const [notificationAutomation, setNotificationAutomation] = useState(null);
    const [actuators, setActuators] = useState([]);
    const [sensors, setSensors] = useState([]);
    const [errors, setErrors] = useState(null)

    const [isAutomationSmart, setIsAutomationSmart] = useState(false)
    const [isAutomationManual, setIsAutomationManual] = useState(false);
    const [isAutomationAutomatic, setIsAutomationAutomatic] = useState(false);
    const [notificationType, setNotificationType] = useState({telegram: false, message: false, email: false})
    const [collapse, setCollapse] = useState(false);
    const [collapseNotifications, setCollapseNotifications] = useState(false);
    const [height, setHeight] = useState(0);
    const [manuals, setManuals] = useState([]);
    const [automatics, setAutomatics] = useState([])

    const notificationRef = useRef(null);

    useEffect(() => {
        loadAutomation()
        loadIsAutomations()
        loadNotificationsAutomation()
        loadNotificationType()
        loadActuators()
        loadSensors()
    }, [])

    useEffect(() => {
        if (collapseNotifications) setHeight(notificationRef.current?.getBoundingClientRect().height);
        else setHeight(0);
    }, [collapseNotifications]);


    const loadAutomation = () => {
        getSettingsAutomation().then(res => {
            if (res.automation) {
                setAutomationState(true)
                setAutomationType(res.automation);
            } else {
                setAutomationState(false)
            }
        }).catch(err => console.log(err))
    }

    const loadIsAutomations = () => {
        getActuatorsListAutomatic()
            .then(res => {
                if (res.length > 0) {
                    setIsAutomationAutomatic(true)
                    setAutomatics(automaticToList(res));
                }
            }).catch(err => console.log(err))

        getActuatorsListSmart()
            .then(res => {
                if (res.length > 0) {
                    setIsAutomationSmart(true)
                }
            }).catch(err => console.log(err))

        getActuatorsListManual()
            .then(res => {
                if (res.length > 0) {
                    setIsAutomationManual(true)
                    setManuals(manualToList(res));
                }
            }).catch(err => console.log(err))
    }

    const loadNotificationsAutomation = () => {
        getNotificationsAutomation().then(res => {
            setNotificationsAutomation(res)
        }).catch(err => console.log(err));
    }

    const loadNotificationAutomation = id => {
        getNotificationAutomation(id).then(res => {
            setNotificationAutomation(res)
            setCreateNotificationModal(true)
        }).catch(err => console.log(err))
    }

    const handleDeleteNotificationAutomation = (id) => {
        deleteNotificationAutomation(id).then(res => {
            loadNotificationsAutomation()
        }).catch(err => console.log())
    }

    const loadNotificationType = () => {
        getNotificationType().then(res => {
            setNotificationType(res)
        }).catch(err => console.log(err))
    }

    const handleChangeNotificationType = e => {
        const notification = {...notificationType};
        notification[e.target.name] = e.target.checked;

        updateNotificationType(notification).then(res => {
            loadNotificationType();
        }).catch(err => console.log(err))
    }

    const handleNotificationAutomation = async (value, id) => {
        if (value) {
            followNotification(id).then(() => {
                const indexNotificationAutomation = notificationsAutomation.findIndex(item => item.id === id)
                const notificationAutomation = notificationsAutomation[indexNotificationAutomation];
                notificationAutomation.following = value;
                const allNotificationsAutomation = [...notificationsAutomation];
                allNotificationsAutomation[indexNotificationAutomation] = notificationAutomation;
                setNotificationsAutomation(allNotificationsAutomation);
            }).catch(err => console.log(err))
        } else {
            unFollowNotification(id).then(() => {
                const indexNotificationAutomation = notificationsAutomation.findIndex(item => item.id === id)
                const notificationAutomation = notificationsAutomation[indexNotificationAutomation];
                notificationAutomation.following = value;
                const allNotificationsAutomation = [...notificationsAutomation];
                allNotificationsAutomation[indexNotificationAutomation] = notificationAutomation;
                setNotificationsAutomation(allNotificationsAutomation);
            }).catch(err => console.log(err))
        }
    }

    const handleAutomationType = e => {
        const values = {
            "automation": e.target.value,
            "type": automationStatus
        }

        switch (e.target.value) {
            case 'manual':
                if (isAutomationManual) {
                    setModalAutomationTypeSelect({isOpen: true, type: 'manual', label: `${t("text.Manual")}`})
                } else {
                    updateSettingsAutomation(values).then(res => {
                        setAutomationModalIfEmptyOpen({isOpen: true, type: `${t("text.Manual")}`})
                        loadAutomation()
                    }).catch(err => console.log(err))
                }
                break;
            case 'automatic':
                if (isAutomationAutomatic) {
                    setModalAutomationTypeSelect({isOpen: true, type: 'automatic', label: `${t("text.Automatic")}`})
                } else {
                    updateSettingsAutomation(values).then(res => {
                        setAutomationModalIfEmptyOpen({isOpen: true, type: `${t("text.Automatic")}`});
                        loadAutomation()
                    }).catch(err => console.log(err))
                }
                break;
            case 'smart':
                if (isAutomationSmart) {
                    setModalAutomationTypeSelect({isOpen: true, type: 'smart', label: `${t("text.Smart")}`})
                } else {
                    updateSettingsAutomation(values).then(res => {
                        setAutomationModalIfEmptyOpen({isOpen: true, type: `${t("text.Smart")}`})
                        loadAutomation()
                    }).catch(err => console.log(err))
                }
                break;
            default:
                break;
        }
    }

    const handleAutomationStatus = () => {
        const values = {
            "automation": modalAutomationTypeSelect.type,
            "type": automationStatus
        }

        updateSettingsAutomation(values).then(res => {
            setAutomationStatus("last");
            setModalAutomationTypeSelect({isOpen: false, type: '', label: ''})
            loadAutomation()
        }).catch(err => console.log(err))

    }

    const loadSensors = () => {
        getSensors().then(res => {
            setSensors(sensorToList(res))
        }).catch(err => console.log(err))
    }

    const loadActuators = () => {
        getActuators().then(res => {
            setActuators(actuatorsToList(res))
        }).catch(err => console.log(err));
    }

    const handleAutomationStateOff = () => {
        let values = {"automation": null}
        updateSettingsAutomation(values)
            .then(res => {
                loadAutomation()
                setAutomationState(false)
                setAutomationType(null)
            })
            .catch(err => console.log(err))
    }

    const handleAutomationStateOn = () => {
        if (isAutomationManual) {
            let values = {"automation": 'manual', "type": automationStatus}
            updateSettingsAutomation(values)
                .then(res => {
                    setAutomationState(true)
                    loadAutomation()
                })
                .catch(err => console.log(err))
        } else if (isAutomationAutomatic) {
            let values = {"automation": 'automatic', "type": automationStatus}
            updateSettingsAutomation(values)
                .then(res => {
                    setAutomationState(true)
                    loadAutomation()
                })
                .catch(err => console.log(err))
        } else if (isAutomationSmart) {
            let values = {"automation": 'smart', "type": automationStatus}
            updateSettingsAutomation(values)
                .then(res => {
                    setAutomationState(true)
                    loadAutomation()
                })
                .catch(err => console.log(err))
        } else {
            let values = {"automation": 'manual', "type": automationStatus}
            updateSettingsAutomation(values)
                .then(res => {
                    setAutomationState(true)
                    loadAutomation()
                    setAutomationModalIfEmptyOpen({
                        isOpen: true,
                        type: ''
                    })
                })
                .catch(err => console.log(err))
        }
    }

    const handleCreateNotificationAutomation = (data) => {
        setErrors(null)
        if (notificationAutomation) {
            updateNotificationAutomation(notificationAutomation?.id, data)
                .then(() => {
                    loadNotificationsAutomation()
                    handleCloseNotificationForm()
                }).catch(err => setErrors(err?.response?.data?.error?.details))
        } else {
            createNotificationAutomation(data).then(() => {
                loadNotificationsAutomation()
                handleCloseNotificationForm()
            }).catch(err => setErrors(err?.response?.data?.error?.details))
        }
    }

    const openModalChangeAutomationState = () => {
        if (isAutomationManual) {
            setAutomationModalOpen({isOpen: true, type: `${t("text.Manual")}`})
        } else if (isAutomationAutomatic) {
            setAutomationModalOpen({isOpen: true, type: `${t("text.Automatic")}`})
        } else if (isAutomationSmart) {
            setAutomationModalOpen({isOpen: true, type: `${t("text.Smart")}`})
        } else {
            setAutomationModalOpen({isOpen: true, type: `${t("text.Manual")}`})
        }
    }

    const confirmDelete = (id) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div className={`card card-box`}>
                        <p className={`text-dark text-center ${isMobile ? "mt-3" : ""}`}>{t("text.Areyousurewantremovewarning")}</p>
                        <div className="d-flex mt-4 justify-content-center">
                            <button
                                className="button btn-primary-fill-outline py-2 px-3 col-6 mx-2 btn-primary-border text-primary bold"
                                onClick={() => {
                                    handleDeleteNotificationAutomation(id)
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

    const handleCloseNotificationForm = () => {
        setCreateNotificationModal(false);
        setNotificationAutomation(null)
        setErrors(null)
    }

    return (
        <>
            <div className="col pb-4">
                <div
                    className={`settings row overflow-auto mx--30px px-15px pt-15px mt--15px ${isMobile ? "height-settings-custom-mobile" : "height-settings-custom"}`}>
                    <div className="col-lg-7 col-sm-12">
                        <section className={`row card card-box ${isMobile ? "px-3" : ""}`}>
                            <div className={`col border-bottom ${isMobile ? "py-4 px-0" : "p-4"}`}>
                                <div className={`d-flex justify-content-between align-items-center`}>
                                    <h6 className="bold mb-0 text-dark">{t("text.automation")}</h6>
                                    <label className="switch">
                                        <input type="checkbox" checked={automationState}
                                               onChange={openModalChangeAutomationState}/>
                                        <span className="slider round"/>
                                    </label>
                                </div>
                            </div>
                            <div
                                className={`col d-flex justify-content-between ${isMobile ? "flex-column py-4 px-0" : "flex-row p-4"}`}>
                                <div className={`${isMobile ? "mb-4" : ""} ${!automationState ? "disabled-text" : ""}`}>
                                    <span>{t("text.automation")}</span>
                                </div>
                                <div className={`d-flex ${isMobile ? "justify-content-between" : ""}`}>
                                    <label
                                        className={`container-radio ${isMobile ? "" : "ml-5"} ${!automationState ? "disabled" : ""}`}>
                                        <input type="radio" name="automation" checked={automationType === 'manual'}
                                               value="manual" onChange={handleAutomationType}/>
                                        <span className="radio-mark"/>
                                        <span className="radio-text">{t("text.Manual")}</span>
                                    </label>
                                    <label
                                        className={`container-radio ${isMobile ? "" : "ml-5"} ${!automationState ? "disabled" : ""}`}>
                                        <input type="radio" name="automation" checked={automationType === 'automatic'}
                                               value="automatic" onChange={handleAutomationType}/>
                                        <span className="radio-mark"/>
                                        <span className="radio-text">{t("text.Automatic")}</span>
                                    </label>
                                    <label
                                        className={`container-radio ${!automationState ? "disabled" : ""}`}>
                                        <input type="radio" name="automation" checked={automationType === 'smart'}
                                               value="smart" onChange={handleAutomationType}/>
                                        <span className="radio-mark"/>
                                        <span className="radio-text">{t("text.Smart")}</span>
                                    </label>
                                </div>
                            </div>
                        </section>
                        <section className={`row card card-box mt-3 p-2 ${isMobile ? "p-3" : ""}`}>
                            <div className="">
                                <div
                                    className={`d-flex justify-content-between align-items-center ${isMobile ? "pt-2 px-0" : "py-4 px-3"} ${notificationsAutomation.length > 0 && isMobile ? "pb-4" : "pb-2"}`}
                                    onClick={() => setCollapseNotifications(prevState => !prevState)}
                                    >
                                    <h6 className="bold mb-0 text-dark"> {t("text.Managealerts")}</h6>
                                    <i className={`icon icon-24 icon-arrow-down management-device-arrow cursor-pointer ${!collapseNotifications ? "" : "rotate-left"}`}/>
                                </div>
                            </div>

                            <div className={`col-12 px-0`}>
                                {
                                    notificationsAutomation.length > 0 && (
                                        <div className={`notifications-list overflow-hidden custom-collapse ${isMobile ? "pr-3 pl-1" : "px-3"} ${!collapseNotifications ? "border-0" : ""}`} style={{height}}>
                                            <div ref={notificationRef}>
                                            {
                                                notificationsAutomation.map(item => {
                                                    return (<NotificationItem sensors={sensors} actuators={actuators}
                                                                              key={item.id + 100} item={item}
                                                                              onNotificationState={handleNotificationAutomation}
                                                                              onEdit={loadNotificationAutomation}
                                                                              onDelete={confirmDelete}
                                                                              manuals={manuals}
                                                                              automatics={automatics}
                                                    />)
                                                })
                                            }
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    isMobile ? (
                                        <Link to={{
                                            pathname: '/Panel/Dashboard/Settings/NotificationManagement',
                                            state: {actuators, sensors, manuals, automatics}
                                        }} className="text-primary d-block font-weight-bold mt-3 cursor-pointer">
                                            <i className="icon icon-24 icon-plus-primary"/>
                                            <span className="mr-2">{t("text.Registernewalert")}</span>
                                        </Link>
                                    ) : (
                                        <div className="text-primary font-weight-bold mt-3 cursor-pointer"
                                             onClick={() => setCreateNotificationModal(true)}>
                                            <i className="icon icon-24 icon-plus-primary"/>
                                            <span className="mr-2">{t("text.Registernewalert")}</span>
                                        </div>
                                    )
                                }
                                <div
                                    className={`col d-flex justify-content-between management-notif-type mt-3 px-3 ${isMobile ? "flex-column pt-3 pb-4" : "flex-row"}`}>
                                    <div className={`${isMobile ? "pb-3" : ""}`}>
                                        <span className={`${isMobile ? "mb-1" : ""}`}>{t("text.Alertsendingtype")}</span>
                                    </div>
                                    <div className={`d-flex ${isMobile ? "justify-content-between" : "pl-2 ml-1"}`}>
                                        <label className={`container-checkbox mb-0 ${isMobile ? "" : "ml-5"}`}>
                                            <input type="checkbox" name="message"
                                                   checked={notificationType?.message}
                                                   onChange={handleChangeNotificationType}
                                            />
                                            <span className="checkmark"/>
                                            <span className="radio-text">  {t("text.sms")}</span>
                                        </label>
                                        {/* <label className={`container-checkbox mb-0 ${isMobile ? "" : "ml-5"}`}>
                                            <input type="checkbox" name="telegram"
                                                   checked={notificationType?.telegram}
                                                   onChange={handleChangeNotificationType}
                                            />
                                            <span className="checkmark"/>
                                            <span className="radio-text">تلگرام</span>
                                        </label> */}
                                        <label className="container-checkbox mb-0">
                                            <input type="checkbox" name="email"
                                                   checked={notificationType?.email}
                                                   onChange={handleChangeNotificationType}
                                            />
                                            <span className="checkmark"/>
                                            <span className="radio-text">{t("text.email")}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            className={`row card card-box mt-3 ${isMobile ? "px-3" : ""} ${collapse && !isMobile ? "pb-3" : ""}`}>
                            <div className="">
                                <div
                                    className={`d-flex justify-content-between align-items-center ${isMobile ? "py-4 px-0" : "p-4"}`}
                                    onClick={() => setCollapse(prevState => !prevState)}
                                >
                                    <h6 className="bold mb-0 text-dark">{t("text.Devicemanagement")}</h6>
                                    {
                                        !isMobile ? (
                                            <i className={`icon icon-24 icon-arrow-down management-device-arrow cursor-pointer ${!collapse ? "" : "rotate-left"}`}
                                            />) : (
                                            <Link to={'/Panel/Dashboard/Settings/DeviceManagement'}>
                                                <i className="icon icon-24 icon-arrow-down management-device-arrow mobile"/>
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>
                            {
                                !isMobile ? (<DeviceManagement collapse={collapse}/>) : null
                            }
                        </section>
                    </div>
                    <div className="col-5"/>
                </div>
            </div>

            <Modal
                isOpen={automationModalOpen.isOpen}
                onRequestClose={() => setAutomationModalOpen({isOpen: false, type: ''})}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {
                    automationState ? (
                        <>
                            <p className={`text-center ${isMobile ? "pb-3" : "pb-0"}`}>با غیر فعال کردن اتوماسیون کلیه
                                سنسور های شما
                                تا زمان فعال کردن مجدد خاموش خواهد ماند.</p>
                            <div className={`d-flex ${isMobile ? "mt-3" : "mt-5"}`}>
                                <Button
                                    className="d-flex align-items-center button justify-content-center btn-primary-outline ml-2 w-50 btn-primary-border"
                                    handler={() => {
                                        handleAutomationStateOff()
                                        setAutomationModalOpen({isOpen: false, type: ''})
                                    }}
                                >
                                    <span>غیرفعال شود</span>
                                </Button>
                                <Button
                                    className="d-flex align-items-center button justify-content-center btn-primary-fill mr-2 w-50"
                                    type="reset"
                                    handler={() => setAutomationModalOpen({isOpen: false, type: ''})}
                                >
                                    <span>{t('text.cancel')}</span>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className={`text-center ${isMobile ? "pb-3" : "pb-0"}`}>
                                اگر از روشن شدن اتوماسیون
                                {automationModalOpen.type}
                                مطمئن هستید لطفا یکی از وضغیت های زیر را برای وضعیت اتوماسیون ها انتخاب کنید.
                            </p>
                            <div className="d-flex flex-column">
                                <label
                                    className={`container-radio mt-20px`}>
                                    <input type="radio" name="automationStatus" checked={automationStatus === 'last'}
                                           value="last" onChange={(e) => setAutomationStatus(e.target.value)}/>
                                    <span className="radio-mark"/>
                                    <span className="radio-text">آخرین وضعیت</span>
                                </label>
                                <label
                                    className={`container-radio mt-20px`}>
                                    <input type="radio" name="automationStatus" checked={automationStatus === 'active'}
                                           value="active" onChange={(e) => setAutomationStatus(e.target.value)}/>
                                    <span className="radio-mark"/>
                                    <span className="radio-text">همه اتوماسیون ها روشن</span>
                                </label>
                                <label
                                    className={`container-radio mt-20px`}>
                                    <input type="radio" name="automationStatus"
                                           checked={automationStatus === 'deactive'}
                                           value="deactive" onChange={(e) => setAutomationStatus(e.target.value)}/>
                                    <span className="radio-mark"/>
                                    <span className="radio-text">همه اتوماسیون ها خاموش</span>
                                </label>
                            </div>
                            <div className={`d-flex ${isMobile ? "mt-3" : "mt-5"}`}>
                                <Button
                                    className="d-flex align-items-center button justify-content-center btn-primary-outline ml-2 w-50 btn-primary-border"
                                    handler={() => {
                                        handleAutomationStateOn()
                                        setAutomationModalOpen({isOpen: false, type: ''})
                                    }}
                                >
                                    <span>فعال شود</span>
                                </Button>
                                <Button
                                    className="d-flex align-items-center button justify-content-center btn-primary-fill mr-2 w-50"
                                    type="reset"
                                    handler={() => setAutomationModalOpen({isOpen: false, type: ''})}
                                >
                                    <span>{t('text.cancel')}</span>
                                </Button>
                            </div>
                        </>
                    )
                }
            </Modal>

            <Modal
                isOpen={AutomationTypeModalOpen}
                onRequestClose={() => setAutomationTypeModalOpen(false)}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <p className={`text-center ${isMobile ? "pb-3" : "pb-0"}`}>بدون انتخاب یکی از گزینه های اتوماسیون، امکان
                    ذخیره تنظیمات وجود ندارد.لطفا انتخاب و سپس ذخیره نمایید.</p>
                <div className={`d-flex justify-content-center ${isMobile ? "mt-3" : "mt-5"}`}>
                    <Button
                        className="d-flex align-items-center button justify-content-center btn-primary-fill mr-2 w-50"
                        type="reset"
                        handler={() => setAutomationTypeModalOpen(false)}
                    >
                        <span>{t("text.Irealized")}</span>
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={automationModalIfEmptyOpen.isOpen}
                onRequestClose={() => setAutomationModalIfEmptyOpen({isOpen: false, type: ''})}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <p className={`text-center ${isMobile ? "pb-3" : "pb-0"}`}>
                    کاربر عزیز متاسفانه شما برای اتوماسیون
                    {automationModalIfEmptyOpen.type} {" "}
                    خود تنظیماتی را انجام نداده اید.
                </p>
                <div className={`d-flex justify-content-center ${isMobile ? "mt-3" : "mt-5"}`}>
                    <Button
                        className="d-flex align-items-center button justify-content-center btn-primary-fill ml-2 w-50"
                        handler={() => {
                            setAutomationModalIfEmptyOpen({isOpen: false, type: ''})
                            history.push('/Panel/Dashboard/Control')
                        }}
                    >
                        <span>{t("text.add")}</span>
                    </Button>
                    <Button
                        className="d-flex align-items-center button justify-content-center btn-primary-outline mr-2 w-50 btn-primary-border"
                        type="reset"
                        handler={() => setAutomationModalIfEmptyOpen({isOpen: false, type: ''})}
                    >
                        <span>فعلا نه</span>
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={modalAutomationTypeSelect.isOpen}
                onRequestClose={() => setModalAutomationTypeSelect({isOpen: false, type: ''})}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <p className={`text-center ${isMobile ? "pb-3" : "pb-0"}`}>
                    لطفا وضعیت اتوماسیون ها را در زمان فعال شدن اتوماسیون
                    {modalAutomationTypeSelect.label}
                    مشخص نمایید.
                </p>

                <div className="d-flex flex-column">
                    <label
                        className={`container-radio mt-20px`}>
                        <input type="radio" name="automationStatus" checked={automationStatus === 'last'}
                               value="last" onChange={(e) => setAutomationStatus(e.target.value)}/>
                        <span className="radio-mark"/>
                        <span className="radio-text">آخرین وضعیت</span>
                    </label>
                    <label
                        className={`container-radio mt-20px`}>
                        <input type="radio" name="automationStatus" checked={automationStatus === 'active'}
                               value="active" onChange={(e) => setAutomationStatus(e.target.value)}/>
                        <span className="radio-mark"/>
                        <span className="radio-text">همه اتوماسیون ها روشن</span>
                    </label>
                    <label
                        className={`container-radio mt-20px`}>
                        <input type="radio" name="automationStatus" checked={automationStatus === 'deactive'}
                               value="deactive" onChange={(e) => setAutomationStatus(e.target.value)}/>
                        <span className="radio-mark"/>
                        <span className="radio-text">همه اتوماسیون ها خاموش</span>
                    </label>
                </div>
                <div className={`d-flex justify-content-center ${isMobile ? "mt-3" : "mt-5"}`}>
                    <Button
                        className={`d-flex align-items-center button justify-content-center btn-primary-fill ml-2 w-50 ${automationStatus === "" ? "disabled" : ""}`}
                        handler={handleAutomationStatus}
                    >
                        <span>{t("text.confirm")}</span>
                    </Button>
                    <Button
                        className="d-flex align-items-center button justify-content-center btn-primary-outline mr-2 w-50 btn-primary-border"
                        type="reset"
                        handler={() => {
                            setModalAutomationTypeSelect({isOpen: false, type: '', label: ''})
                            setAutomationStatus("last")
                        }}
                    >
                        <span>{t('text.cancel')}</span>
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={createNotificationModal}
                onRequestClose={handleCloseNotificationForm}
                style={customStylesNotification}
                className="modal-user"
                contentLabel="Example Modal">

                <CreateNotificationForm
                    onSubmit={handleCreateNotificationAutomation}
                    data={notificationAutomation}
                    automatics={automatics}
                    manuals={manuals}
                    sensors={sensors}
                    errors={errors}
                    actuators={actuators}
                    onClose={handleCloseNotificationForm}
                />
            </Modal>
        </>
    );
};

export default Settings;


