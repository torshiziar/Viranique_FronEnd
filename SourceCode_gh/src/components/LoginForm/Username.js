import { isMobile } from "react-device-detect";
import Button from "../Button/Button";
import React from "react";
import { useTranslation } from "react-i18next";

const Username = ({ userName, setUsername, setPage }) => {
    const { t } = useTranslation();
    const handlePage = () => {
        if (username !== "") {
            setPage("getPassword")
        }
    }

    return (
        <>
                <form
                    onSubmit={handlePage}
                    className={`col-md-12 position-unset login-form-holder ${isMobile ? "p-0" : ""}`}>
                    <div className="form-group">
                        <label htmlFor="code" className="mb-2">
                            {t("text.username")} / {t("text.email")} / {t("text.phonenumber")}
                        </label>
                        <input
                            className="form-control mb-4"
                            type="text"
                            id="username"
                            name="code"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={t("text.Enterusernameemailmobilenumber")}
                        />
                        {
                            userName === "" ? (<i className={"icon-20 icon-user d-flex"} />) : null
                        }
                    </div>
                    <div
                        className={`form-group bottom pointer ${isMobile ? "" : "position-unset"}`}>
                        <Button
                            className={`w-100 text-center  button btn-primary-fill ${!userName ? "disabled" : ""}`}
                            // handler={handlePage}
                            type="submit"
                            >
                            {t("text.login")}
                        </Button>
                    </div>
            </form>
        </>
    )
}

export default Username;