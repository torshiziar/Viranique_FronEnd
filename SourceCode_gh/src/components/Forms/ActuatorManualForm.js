import React, {useEffect, useState} from "react";
import ReactSelect from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import {isMobile} from "react-device-detect";
import { getActuators } from "../../services/api";
import { useTranslation } from "react-i18next";


const ActuatorManualForm = ({handler, data, onCancel, errors}) => {
    const { t } = useTranslation();
    const alarmOptions = [
        {label: `${t("text.on")}`, value: "ON"},
        {label: `${t("text.off")}`, value: "OFF"},
        {label: `${t("text.switching")}`, value: "SWITCH"}
    ]
    
    const [selectedActuator, setSelectedActuator] = useState(null)
    const [titleActuatorManual, setTitleActuatorManual] = useState("");
    const [alarm, setAlarm] = useState(false)
    const [alarmType, setAlarmType] = useState(null)
    const [validationForm, setValidationForm] = useState(false)
    const [actuators, setActuators] = useState(null);

    useEffect(() => {
        loadActuators()
    },[])


    const loadActuators = () => {
        getActuators().then(res => {
            setActuators(actuatorsToList(res))
        }).catch(err => console.log(err));
    }

    const actuatorsToList = (res) => {
       // console.log(data)
        return res.filter(item => item.id === data?.actuator?.id || item.manual_selected !== true).map(el => {return {label: `${el.title} - ${el?.part_number}`, value: el?.id}});
    }

    useEffect(() => {
        if(selectedActuator && titleActuatorManual !== "" && ((!alarm && alarmType === null) || (alarm && alarmType !== null) || (!alarm && alarmType !== null))) {
            setValidationForm(true)
        } else {
            setValidationForm(false)
        }
    },[selectedActuator, titleActuatorManual, alarm, alarmType])


    useEffect(() => {
        if(data) {
            setTitleActuatorManual(data.title)
            setAlarm(data?.alarm?.following);
            setAlarmType(data.alarm?.condition ? alarmOptions.find(item => item.value === data.alarm?.condition) : null)
        }
    },[data])

    useEffect(() => {
        if (data) {
            setSelectedActuator(actuators?.find(item => item.value === data.actuator?.id))
        }
    },[actuators])

    useEffect(() => {
        if (!data) {
            setTitleActuatorManual(selectedActuator?.label.split("-")[0].trim())
        }
    },[selectedActuator])

    const submitHandler = () => {
        const values = {
            "title": titleActuatorManual,
            "lock": data ? data?.lock : true,
            "actuator": {"id": selectedActuator.value},
            "active": data ? data?.active : true,
            "alarm" : {
                "condition": (alarm && alarmType) ? alarmType?.value : null,
                "set_point" : null,
                "following" : alarm,
            },
        }
        handler(values)
    }

    return (
        <div className="row">
            <div className={`col-lg-12 col-sm-12 mt-3`}>
                <div className="form-group">
                    <label className="required">{t("text.Relayselection")}</label>
                    <ReactSelect
                        className={`autoCompeletSelect ${errors && errors?.actuator ? "border-error" : ""}`}
                        value={selectedActuator}
                        onChange={setSelectedActuator}
                        options={actuators}
                        mobileMode={true}
                        placeholder={t("text.Select")}
                    />
                    {
                        errors && errors?.actuator ? <p className="error-field">{errors?.actuator?.non_field_errors[0]}</p> : null
                    }
                </div>
            </div>
            <div className={`col-lg-12 col-sm-12 mt-4`}>
                <div className="form-group">
                    <label className="required">{t("text.automationname")}</label>
                    <input
                        type="text"
                        value={titleActuatorManual}
                        onChange={(e) => setTitleActuatorManual(e.target.value)}
                        className={`form-control pr-3 ${errors && errors?.title ? "border-error" : ""}`}
                        placeholder= {t("text.Choosedesirednamerelay")}
                    />
                    {
                        errors && errors?.title ? <p className="error-field">{errors?.title[0]}</p> : null
                    }
                </div>
            </div>
            <div className={`col-lg-12 col-sm-12 mt-4`}>
                <div
                    className={`col-12 ${isMobile ? "pt-3 pb-4" : "pt-3"}`}>
                    <div className={`row ${isMobile ? "justify-content-between" : "pl-2"}`}>
                        <label className="container-checkbox d-flex align-items-center mb-0">
                            <input type="checkbox" name="automation" checked={alarm}
                                   onChange={e => setAlarm(e.target.checked)}/>
                            <span className="checkmark"/>
                            <span
                                className="radio-text text-wrap">{t("text.Analarmactivatedduringrelayoperation")}</span>
                        </label>
                        <div className={`px-0 ${isMobile ? "col-12 mt-3" : ""}`}>
                            <ReactSelect
                                className={`autoCompeletSelect pl-0 ${!alarm ? "disabled" : ""}`}
                                value={alarmType}
                                onChange={setAlarmType}
                                options={alarmOptions}
                                mobileMode={true}
                                placeholder={t("text.Select")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`col-12 d-flex mt-5 ${isMobile ? "position-absolute btn-bottom-form" : ""}`}>
                <Button
                    className={`button btn-primary-fill mt-4 p-2 d-flex align-items-center justify-content-center ${isMobile ? "width-65" : "w-50"} ${!validationForm ? "disabled" : ""}`}
                    handler={submitHandler}>
                    <span className="p-1">{t("text.confirm")}</span>
                </Button>
                <Button
                    className={`button btn-primary-fill-outline mt-4 mr-3 d-flex align-items-center justify-content-center ${isMobile ? "width-35" : "w-50"}`}
                    handler={onCancel}>
                    <span>{t('text.cancel')}</span>
                </Button>
            </div>
        </div>
    )
}

export default ActuatorManualForm