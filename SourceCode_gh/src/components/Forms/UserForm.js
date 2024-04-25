import React, { useEffect, useRef, useState } from 'react';
import Button from "../Button/Button";
import { isMobile } from "react-device-detect";
import { emailValidation } from "../../utils/emailValidation";
import { phoneNumberValidation, phoneNumberValidationUser } from "../../utils/phoneNumberValidation";
import { useTranslation } from 'react-i18next';


const UserForm = ({ closeHandler, data, submitHandler, errors }) => {
    const { t } = useTranslation();
    const [user, setUser] = useState({
        name: "",
        last_name: "",
        username: "",
        email: "",
        phone: "",
        can_monitor: true,
        can_control: false
    })
    const [validInputs, setValidInputs] = useState({});
    const [validationForm, setValidationForm] = useState(false);
    const inputRef = useRef(null);

    const handleChangeUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (user.username !== "" && (emailValidation(user.email) || user.email === "" || !user?.email) && phoneNumberValidationUser(user.phone)) {
            setValidationForm(true)
        } else {
            setValidationForm(false)
        }
    }, [user])

    useEffect(() => {
        if (data) setUser(data);
    }, [data])

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    const handleCheckEmail = () => {
        setValidInputs({ ...validInputs, email: user.email === "" ? false : !emailValidation(user.email) })
    }

    const handleCheckPhone = () => {
        setValidInputs({ ...validInputs, phone: !phoneNumberValidationUser(user.phone) })
    }
    // const [errorpermission_denied, setErrorpermission_denied] = useState(true)
    // const submitHandler_ = (user) => {
    //     if (errors?.code == "permission_denied")
    //         setErrorpermission_denied(true)
    //     submitHandler(user)
    // }
    return (<>
        {
            !isMobile && <div className="row justify-content-center modal-header">
                <p className="col-5 text-center bold text-dark">{data ? `${t("text.Edituser")}` : `${t("text.newuser")}`}</p>
            </div>
        }
        <div className={`row ${isMobile ? "card pb-4 px-3" : "align-items-center"}`}>
            <div className={`col-lg-6 col-sm-12 ${isMobile ? "px-0 pb-2 mt-3" : "mt-4 pt-2"}`}>
                <div className="form-group">
                    <label htmlFor="name">{t("text.firstname")}</label>
                    <input
                        name="name"
                        value={user.name}
                        onChange={handleChangeUser}
                        type="text"
                        id="name"
                        ref={inputRef}
                        className={`form-control ${errors && errors?.details?.name ? "border-error" : ""}`}
                        placeholder={t("text.Enteryourname")} />
                    <i className={"icon-22 icon-user d-flex"} />
                    {
                        errors && errors?.details?.name ? <p className="error-field">{errors?.code?.name[0] == "max_length" ? t("text.maximumfieldlengthis24characters") : errors?.details?.name[0]}</p> : null
                    }
                </div>
            </div>
            <div className={`col-lg-6 col-sm-12  ${isMobile ? "px-0 pb-2 border-bottom" : "mt-4 pt-2"}`}>
                <div className="form-group">
                    <label htmlFor="lastName">{t("text.lastname")}</label>
                    <input
                        name="last_name"
                        value={user.last_name}
                        onChange={handleChangeUser}
                        type="text"
                        id="lastName"
                        className={`form-control ${errors && errors?.details?.last_name ? "border-error" : ""}`}
                        placeholder={t("text.Enteryourlastname")} />
                    <i className={"icon-22 icon-user d-flex"} />
                    {
                        errors && errors?.details?.last_name ? <p className="error-field">{errors?.code?.last_name[0] == "max_length" ? t("text.maximumfieldlengthis24characters") : errors?.details?.last_name[0]}</p> : null
                    }
                </div>
            </div>
            <div className={`col-lg-6 col-sm-12 mt-3 ${isMobile ? "px-0 pb-2" : ""}`}>
                <div className="form-group">
                    <label htmlFor="username" className="required">{t("text.username")}</label>
                    <input
                        name="username"
                        value={user.username}
                        onChange={handleChangeUser}
                        type="text"
                        id="username"
                        className={`form-control ${errors && errors?.details?.username ? "border-error" : ""}`}
                        placeholder={t("text.EnterEnglish")} />
                    <i className={"icon-22 icon-user d-flex"} />
                    {
                        errors && errors?.details?.username ? <p className="error-field">{errors?.code?.username[0] == "null_username" ? t("text.Thisvaluemustnotbeempty") : errors?.code?.username[0] == "username_exists" ? t("text.Thisusernamealreadyregistered") : errors?.details?.username[0]}</p> : null
                    }
                </div>
            </div>

            <div className={`col-lg-6 col-sm-12 ${isMobile ? "px-0 pb-2" : "mt-3"}`}>
                <div className="form-group">
                    <label htmlFor="phone" className="required">{t("text.mobilenumber")}</label>
                    <input
                        name="phone"
                        value={user.phone}
                        onBlur={handleCheckPhone}
                        onChange={handleChangeUser}
                        type="tell"
                        id="phone"
                        className={`form-control ${errors && errors?.details?.phone ? "border-error" : ""} ${validInputs?.phone ? "border-error" : ""}`}
                        placeholder={t("text.Forexample0901")} />
                    <i className={"icon-22 icon-phone d-flex"} />
                    {
                        errors && errors?.details?.phone ? <p className="error-field">{errors?.code?.phone[0] == "existing_phone_number" ? t("text.phonenumberalreadyregisteredthisservice") : errors?.details?.phone[0]}</p> : null
                    }
                </div>
            </div>

            <div className={`col-lg-6 col-sm-12 ${isMobile ? "px-0 pb-2" : "mt-3"}`}>
                <div className="form-group">
                    <label htmlFor="email">{t("text.email")}</label>
                    <input
                        name="email"
                        value={user.email}
                        onBlur={handleCheckEmail}
                        onChange={handleChangeUser}
                        type="email"
                        id="email"
                        className={`form-control ${errors && errors?.details?.email ? "border-error" : ""} ${validInputs?.email ? "border-error" : ""}`}
                        placeholder={t("text.Forexampleemail")} />
                    <i className={"icon-22 icon-email d-flex"} />
                    {
                        errors && errors?.details?.email ? <p className="error-field">{errors?.code?.email[0] == "email_exists" ? t("text.accountalreadybeenregisteredemailaddress") : errors?.details?.email[0]}</p> : null
                    }
                </div>
            </div>
            <div className={`col-lg-6 col-sm-12 ${isMobile ? "px-0 pb-2 mt-2" : "mt-4 d-flex align-items-center"}`}>
                <label htmlFor="canControl" className="container-checkbox m-0">
                    <input type="checkbox" id="canControl" checked={user.can_control} name={"can_control"}
                        onChange={e => setUser({ ...user, [e.target.name]: e.target.checked })} />
                    {t("text.Doesuserhavepermissionchangeautomation")}
                    <span className="checkmark" />
                </label>
            </div>


            {/* ///gh  فردا این قسمت رو درست کنم و ترجمه اش را هم قرار بدهم.*/}
            {errors && errors?.code == "permission_denied" && <div className={`col-lg-6 col-sm-12 ${isMobile ? "px-0 pb-2 mt-2" : "mt-4 d-flex align-items-center"}`}>
                <p className="error-field">{t("text.Youarenotauthorizedexecutecommand")}</p>
            </div>}
            {/* gh */}
        </div>

        <div className="row">
            <div className={`col-12 d-flex justify-content-end mt-3 pt-2 ${isMobile ? "px-0" : ""}`}>
                <Button
                    className={`mx-3 button btn-primary-fill d-flex align-items-center justify-content-center py-2 px-5 ${isMobile ? "width-65" : ""} ${!validationForm ? "disabled" : ""}`}
                    handler={() => submitHandler(user)}>
                    <span>{t("text.confirm")}</span>
                </Button>
                <Button
                    className={`button btn-primary-outline d-flex align-items-center justify-content-center py-2 px-5 ${isMobile ? "width-35" : ""}`}
                    handler={closeHandler}>
                    <span>{t('text.cancel')}</span>
                </Button>
            </div>

        </div>
    </>)
}

export default UserForm;