import React, {useEffect, useRef, useState} from 'react';
import {isMobile} from "react-device-detect";
import Button from "../Button/Button";
import ReactSelect from "../Select/Select";
import userImageNull from "../../assets/img/user-image-null.png";
import {uploadAvatar} from "../../services/api";
import {emailValidation} from "../../utils/emailValidation";
import {phoneNumberValidation, phoneNumberValidationUser} from "../../utils/phoneNumberValidation";
import { useTranslation } from 'react-i18next';

const userTypeOptions = [
    {label: "گلخانه", value: "گلخانه"},
    {label: "آبزی پروری", value: "آبزی پروری"},
    {label: "اتاق سرور", value: "اتاق سرور"},
    {label: "کشاورزی", value: "کشاورزی"},
    {label: "دیتا سنتر", value: "دیتا سنتر"},
    {label: "دیوار سبز", value: "دیوار سبز"},
    {label: "سایر", value: "سایر"},
]

const ProfileForm = ({closeHandler, data, submitHandler, isLoading , errors }) => {
    const [errors_, setErrors_] = useState(null)

    const [user, setUser] = useState({
        name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
        phone: "",
        address: ""
    })
    const [validInputs, setValidInputs] = useState({});
    const [userType, setUserType] = useState(null);
    const [validationForm, setValidationForm] = useState(false);

    const fileInput = useRef(null)

    const handleChangeUser = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if (data) setUser(data);
    }, [data])

    const handleUserProfile = e => {
        const formValues = new FormData();
        formValues.append("photo", e.target.files[0]);

        uploadAvatar(formValues).then(res => {
            localStorage.setItem("photo", "https://viranique.com/" + res?.photo);
            setUser({...user, photo: res?.photo})
        }).catch(err => {
            setErrors_(err)
            // console.log(err?.response.data.error.details?.photo[0] ,errors)
        }
            )
    }

    useEffect(() => {
        if(emailValidation(user.email) && user.username !== "" && phoneNumberValidation(user.phone)) {
            setValidationForm(true)
        } else {
            setValidationForm(false)
        }
    },[user])

    const handleCheckPhone = () => {
        setValidInputs({...validInputs, phone: !phoneNumberValidationUser(user.phone)})
    }
    const { t } = useTranslation();
    return (<>
        {
            !isMobile && <div className="row justify-content-center modal-header">
                <p className="col-5 text-center bold text-dark">{t("text.Account")}</p>
            </div>
        }

        <div className={`row ${isMobile ? "card pb-4 px-3" : ""}`}>
            <div className={`col-lg-6 col-sm-12 ${isMobile ? "px-0 mt-3" : "mt-4 pt-2"}`}>
                <div className="d-flex align-items-end">
                    <label className="avatar ml-1"
                           style={{backgroundImage: `url(${user?.photo ? `https://viranique.com/${user?.photo}` : userImageNull})`}}>
                        <i className="icon icon-24 icon-edit-profile"/>
                        <input type="file" ref={fileInput} accept="image/jpeg, image/png, image/jpg" hidden onChange={e => handleUserProfile(e)}/>
                    </label>
                    <div className="d-flex flex-column mr-3 align-self-stretch justify-content-around">
                        <span>{localStorage.getItem("username")}</span>
                        {/* {localStorage.getItem("name") + " " + localStorage.getItem("last_name")} gh */}
                        <span>{user?.phone}</span>
                    </div>
                    {
                        errors_ && <p className="error-field">{errors_?.response.data.error.code?.photo[0] == "photo_more_than_200k" && t("text.photo_more_than_200k")}</p>  //بعد از اینکه سمت بک اند برای خطاهای ولیدیشن کد قرار داده شد این ارورر ها ترجمه شود
                    }
                    <Button
                        className="button h-auto rounded-12 py-1 px-2 btn-primary-border d-flex align-items-center justify-content-center mr-auto"
                        handler={() => fileInput.current.click()}>
                        <span className="text-nowrap text-primary">{t("text.Changephoto")}</span>
                    </Button>
                </div>
            </div>
        </div>
        <div className={`row ${isMobile ? "card px-3 mt-3" : ""}`}>
            <div className={`col-lg-6 col-sm-12 ${isMobile ? "px-0 pb-2 mt-3" : "mt-4 pt-2"}`}>
                <div className="form-group">
                    <label htmlFor="name">{t("text.firstname")}</label>
                    <input
                        name="name"
                        value={user.name}
                        onChange={handleChangeUser}
                        type="text"
                        id="name"
                        className={`form-control ${errors && errors?.details?.name ? "border-error" : ""}`}
                        placeholder={t("text.Enteryourname")}/>
                    <i className={"icon-20 icon-user d-flex"}/>
                    {
                        errors && errors?.details?.name ? <p className="error-field">{errors?.code?.name[0] == "max_length" ? t("text.maximumfieldlengthis24characters") : errors?.details?.name[0]}</p> : null
                    }
                </div>
            </div>
            <div className={`col-lg-6 col-sm-12  ${isMobile ? "px-0 pb-2" : "mt-4 pt-2"}`}>
                <div className="form-group">
                    <label htmlFor="lastName">{t("text.lastname")}</label>
                    <input
                        name="last_name"
                        value={user.last_name}
                        onChange={handleChangeUser}
                        type="text"
                        id="lastName"
                        className={`form-control ${errors && errors?.details?.last_name ? "border-error" : ""}`}
                        placeholder={t("text.Enteryourlastname")}/>
                    <i className={"icon-20 icon-user d-flex"}/>
                    {
                        errors && errors?.details?.last_name ? <p className="error-field">{errors?.code?.last_name[0] == "max_length" ? t("text.maximumfieldlengthis24characters") :errors?.details?.last_name[0]}</p> : null
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
                        placeholder= {t("text.Forexample0901")}/>
                    <i className={"icon-20 icon-phone d-flex"}/>
                    {
                        errors && errors?.details?.phone ? <p className="error-field">{errors?.details?.phone[0]}</p> : null
                    }
                </div>
            </div>
            <div className={`col-lg-6 col-sm-12 ${isMobile ? "px-0 pb-2" : "mt-3"}`}>
                <div className="form-group">
                    <label htmlFor="email" className="required">{t("text.email")}</label>
                    <input
                        name="email"
                        value={user.email}
                        onChange={handleChangeUser}
                        type="email"
                        id="email"
                        disabled={true}
                        className={`form-control ${errors && errors?.details?.email ? "border-error" : ""}`}
                        placeholder={t("text.Forexampleemail")}/>
                    <i className={"icon-20 icon-email d-flex"}/>
                    {
                        errors && errors?.details?.email ? <p className="error-field">{errors?.details?.email[0]}</p> : null
                    }
                </div>
            </div>
        </div>
        <div className={`row ${isMobile ? "card px-3 mt-3" : ""}`}>
            <div className={`col-lg-6 col-sm-12 mt-3 ${isMobile ? "px-0 pb-2" : ""}`}>
                <div className="form-group">
                    <label htmlFor="username" className="required">{t("text.username")}</label>
                    <input
                        name="username"
                        value={user.username}
                        onChange={handleChangeUser}
                        type="text"
                        id="username"
                        disabled={false}
                        className={`form-control ${errors && errors?.details?.username ? "border-error" : ""}`}
                        placeholder={t("text.EnterEnglish")}/>
                    <i className={"icon-20 icon-user d-flex"}/>
                    {
                        errors && errors?.details?.username ? <p className="error-field">{errors?.code?.username[0] == "blank" ? t("text.Thisvaluemustnotbeempty") :errors?.details?.username[0]}</p> : null
                    }
                </div>
            </div>
            <div className={`col-lg-6 col-sm-12 mt-3 ${isMobile ? "px-0 pb-2" : ""}`}>
                <div className="form-group">
                    <label htmlFor="address">{t("text.address")}</label>
                    <textarea
                        rows={4}
                        name="address"
                        value={user.address ? user.address : ""}
                        onChange={handleChangeUser}
                        type="textarea"
                        id="address"
                        className={`form-control ${errors && errors?.details?.address ? "border-error" : ""}`}
                        placeholder={`${t("text.enteryouraddress")}`}>

                    </textarea>
                    <i className={"icon-20 icon-location d-flex"}/>
                    {
                        errors && errors?.details?.address ? <p className="error-field">{errors?.code?.address[0] == "max_length" ? t("text.maximumfieldlengthis24characters") : errors?.details?.address[0]}</p> : null
                    }
                </div>
            </div>
            {/* <div className={`col-lg-6 col-sm-12 mt-3 ${isMobile ? "px-0 pb-2" : ""}`}>
                <div className="form-group">
                    <label htmlFor="username">نوع کاربری</label>
                    <ReactSelect
                        options={userTypeOptions}
                        value={userType}
                        onChange={setUserType}
                        className="autoCompeletSelect"
                        mobileMode={true}
                        placeholder={t("text.Select")}
                        isIcon={true}
                    />
                    <i className={"icon-20 icon-user-type d-flex"}/>
                </div>
            </div> */}
            {/*<div className={`col-lg-6 col-sm-12 ${isMobile ? "px-0 pb-2" : "mt-3"}`}>*/}
            {/*    <div className="form-group">*/}
            {/*        <label htmlFor="password">تغییر کلمه عبور</label>*/}
            {/*        <input*/}
            {/*            name="password"*/}
            {/*            value={user.password ? user.password : ""}*/}
            {/*            onChange={handleChangeUser}*/}
            {/*            type="password"*/}
            {/*            id="password"*/}
            {/*            className="form-control"*/}
            {/*            placeholder="بصورت انگلیسی وارد نمایید."/>*/}
            {/*        <i className={"icon-20 icon-key d-flex"}/>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>

        <div className={`row justify-content-end ${isMobile ? "card px-3 mt-3" : ""}`}>
            {/* <div className={`col-lg-6 col-sm-12 mt-3 ${isMobile ? "px-0 pb-2" : ""}`}>
                <div className="form-group">
                    <label htmlFor="address">t("text.address")</label>
                    <textarea
                        rows={4}
                        name="address"
                        value={user.address ? user.address : ""}
                        onChange={handleChangeUser}
                        type="textarea"
                        id="address"
                        className={`form-control ${errors && errors?.details?.address ? "border-error" : ""}`}
                        placeholder={`${t("text.enteryouraddress")}`}>

                    </textarea>
                    <i className={"icon-20 icon-location d-flex"}/>
                    {
                        errors && errors?.details?.address ? <p className="error-field">{errors?.details?.address[0]}</p> : null
                    }
                </div>
            </div> */}
            {
                !isMobile && (
                    <div className={`col-6 d-flex justify-content-end align-items-end pb-3  mt-3 pt-2 ${isMobile ? "px-0" : ""}`}>
                        <Button
                            isLoading={isLoading}
                            className={`button btn-primary-fill d-flex align-items-center justify-content-center py-2 px-5 ${isMobile ? "w-100" : "ml-3"} ${!validationForm ? "disabled" : ""}`}
                            handler={() => submitHandler(user)}>
                            <span>{t("text.confirm")}</span>
                        </Button>
                        {
                            !isMobile && <Button
                                className={`button btn-primary-outline d-flex align-items-center justify-content-center py-2 px-5`}
                                handler={closeHandler}>
                                <span>{t('text.cancel')}</span>
                            </Button>
                        }
                    </div>
                )
            }
        </div>


        {
            isMobile && (<div className="row">
                <div className={`col-12 d-flex justify-content-end mt-3 pt-2 ${isMobile ? "px-0" : ""}`}>
                    <Button
                        isLoading={isLoading}
                        className={`button btn-primary-fill d-flex align-items-center justify-content-center py-2 px-5 ${isMobile ? "w-100" : "ml-3"} ${!validationForm ? "disabled" : ""}`}
                        handler={() => submitHandler(user)}>
                        <span>{t("text.confirm")}</span>
                    </Button>
                    {
                        !isMobile && <Button
                            className={`button btn-primary-outline d-flex align-items-center justify-content-center py-2 px-5`}
                            handler={closeHandler}>
                            <span>{t('text.cancel')}</span>
                        </Button>
                    }
                </div>
            </div>)
        }
    </>)
}

export default ProfileForm;