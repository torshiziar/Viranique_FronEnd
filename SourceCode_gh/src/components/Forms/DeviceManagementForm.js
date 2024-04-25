import React, {useEffect, useState} from 'react';
import {isMobile} from "react-device-detect";
import Button from "../Button/Button";
import { useTranslation } from 'react-i18next';

const DeviceManagementForm = ({data, handler, isOpenDevice, onClose, onChange, errorDevice, errors}) => {
    const { t } = useTranslation();
    const [titleDevice, setTitleDevice] = useState("");
    const [serialDevice, setSerialDevice] = useState("");
    const [validationForm, setValidationForm] = useState(false)

    useEffect(() => {
        if(data) {
            setTitleDevice(data.title)
            setSerialDevice(data.part_number)
        }
    },[data])

    useEffect(() => {
        if(((titleDevice !== "" && data) || (!data)) && serialDevice !== "" && errorDevice !== "exist") {
            setValidationForm(true)
        } else {
            setValidationForm(false)
        }
    },[titleDevice, serialDevice, errorDevice])


    const handleDevice = () => {
        let values = null;
        if (data) {
            values = {
                title: titleDevice,
                part_number: serialDevice
            }
        } else {
            values = {
                part_number: serialDevice
            }
        }

        handler(values)
    }

    const handleCloseModal = () => {
        setTitleDevice("")
        setSerialDevice("")
        onClose()
    }

    return (
        <>
            <div className="modal-header">
                <h5 className={`bold text-dark text-nowrap ${isMobile ? "text-right" : "text-center"}`}>
                    {
                        data ? t("text.Editdeviceinformation") : t("text.Addnewdevice")
                    }
                </h5>
                {
                    isMobile && <i className="icon icon-24 icon-close" onClick={handleCloseModal}/>
                }
            </div>

            {
                data && (
                    <div className={`col-lg-12 col-sm-12 ${isMobile ? "px-0 mt-3" : "mt-4 pt-2"}`}>
                        <div className="form-group">
                            <label htmlFor="name" className="required"> {t("text.devicename")}</label>
                            <input
                                type="text"
                                id="title"
                                value={titleDevice}
                                onChange={e => setTitleDevice(e.target.value)}
                                className={`form-control pr-3 ${errors && errors?.title ? "border-error" : ""}`}
                                placeholder={t("text.Enterdevicename")}/>
                            {
                                errors && errors?.title ? <p className="error-field">{errors?.title[0]}</p> : null
                            }
                        </div>
                    </div>
                )
            }

            <div className={`col-lg-12 col-sm-12 pt-2 ${isMobile ? "px-0 mt-3 pb-3" : "mt-4"}`}>
                <div className="form-group">
                    <label htmlFor="name" className="required">{t("text.Serialnumberdevice")}</label>
                    <input
                        type="text"
                        id="name"
                        value={serialDevice}
                        onChange={e => {
                            onChange(e.target.value)
                            setSerialDevice(e.target.value)
                        }}
                        className={`form-control pr-3 ${data ? "disabled" : ""} ${errors && errors?.part_number ? "border-error" : ""}`}
                        placeholder={t("text.forexampleserial")}/>
                    {
                        errors && errors?.non_field_errors ? <p className="error-field">{errors?.non_field_errors[0]}</p> : null
                    }
                    {
                        errorDevice === "exist" ? (<p className="error-field danger-text">این شماره سریال قبلا ثبت شده است.</p>) : errorDevice === "notFound" ? (<p className="error-field danger-text">شماره سریال وارد شده وجود ندارد.</p>) : null
                    }
                </div>
            </div>
            <div className={`col-12 d-flex justify-content-end ${isMobile ? "px-0" : "mt-5"}`}>
                <Button
                    className={`d-flex align-items-center button justify-content-center btn-primary-fill mx-2 px-4 ${isMobile ? "width-65" : ""} ${!validationForm ? "disabled" : ""}`}
                    handler={() => {
                        handleDevice()
                    }}
                >
                    <span className="px-2">{t("text.confirm")}</span>
                </Button>
                <Button
                    className={`d-flex align-items-center button justify-content-center btn-primary-outline mr-2 px-4 ${isMobile ? "width-35" : "btn-primary-border"}`}
                    handler={handleCloseModal}
                >
                    <span className="px-2">{t('text.cancel')}</span>
                </Button>
            </div>
        </>
    )
}


export default DeviceManagementForm