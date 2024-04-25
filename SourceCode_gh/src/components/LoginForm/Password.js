import React, {useState} from "react";
import Button from "../Button/Button";
import {isMobile} from "react-device-detect";
import { useTranslation } from "react-i18next";

const Password = ({password,setPassword, handler, setPage, sendCode, handleForgetPassword}) => {
    const { t } = useTranslation();
    const [isPasswordType, setIsPasswordType] = useState(true)

    return (
        <form onSubmit={handler} className={`col-md-12 position-unset login-form-holder ${isMobile ? "p-0" : ""}`}>
            <div className="form-group">
                <label htmlFor="code" className="mb-2">
                  {t("text.password")}
                </label>
                <input
                    className="form-control mb-5"
                    type={isPasswordType ? "password" : "text"}
                    id="password"
                    name="code"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("text.Enteryourpassword")}
                />
                {
                    password === "" ? (<i className={"icon-20 icon-key d-flex"}/>) : (<><i className={`icon icon-24 icon-eye${isPasswordType ? "" : "-close"}`} onClick={() => setIsPasswordType(prevState => !prevState)}/><i className="icon icon-16 icon-close-circle-white" onClick={() => setPassword("")}/></>)
                }
            </div>
            <p className='text-primary bold text-right w-fit-content'
               role="button"
               onClick={sendCode}>
                {t("text.loginOnetimecode")}
            </p>
            <p className='text-primary mt-2 bold text-right w-fit-content' role="button" onClick={handleForgetPassword}>
                {t("text.Forgotyourpassword")}
            </p>
            <div
                className={`form-group pointer ${isMobile ? "" : "position-unset"}`}>
                <Button
                    className={`w-100 text-center  button btn-primary-fill ${!password ? "disabled" : ""}`}
                    // handler={handler}
                    type="submit"
                    >
                    {t("text.login")}
                </Button>
            </div>
        </form>
    )
}

export default Password;