
import React, { useState } from "react"
import Button from "../Button/Button"
import { useTranslation } from "react-i18next"

const Usagetimepanel = () => {
    const [timestatus, setTimestatus] = useState(null)
    const [historystatus, setHistorystatus] = useState(null)
    const { t } = useTranslation();
    return (
        <div className="row justify-content-around ">
            <div className="card col-xxl-3 col-lg-3 col-md-12 col-12 my-2">
                <div className="card-body">
                    <h6 className="card-title text-center p-2 border-bottom fs-sm_" >{t("text.Chargingpanel")}</h6>
                    <div className="card-text min-hight">
                        <label
                            className={`container-radio mt-20px`}>
                            <input type="radio" name="time_status" checked={timestatus === "Automatic"}
                                value="Automatic" onChange={(e) => setTimestatus(e.target.value)} />
                            <span className="radio-mark" />
                            <span className="radio-text">{t("text.automaticable")}</span>
                        </label>

                        <label
                            className={`container-radio mt-20px`}>
                            <input type="radio" name="time_status" checked={timestatus === "noAutomatic"}
                                value="noAutomatic" onChange={(e) => setTimestatus(e.target.value)} />
                            <span className="radio-mark" />
                            <span className="radio-text">{t("text.noAutomaticoperation")}</span>
                        </label>



                    </div>
                    <Button
                        className="fs-xs_ d-flex button btn-primary-fill height-auto py-1 px-4 justify-content-center align-items-center ml-3 form-control my-4 py-2"
                        handler={() => console.log(false)}
                    >
                        <span>{t("text.confirm")}</span>
                    </Button>
                </div>
            </div>
            <div className="card col-xxl-3 col-lg-3 col-md-12 col-12 my-2">
                <div className="card-body">
                    <h6 className="card-title text-center p-2 border-bottom fs-sm_" >{t("text.Abilityusedatahistory")}</h6>
                    <div className="card-text">
                        <label
                            className={`container-radio mt-20px`}>
                            <input type="radio" name="history_status" checked={historystatus === "500mb"}
                                value="500mb" onChange={(e) => setHistorystatus(e.target.value)} />
                            <span className="radio-mark" />
                            <span className="radio-text">{t("text.mb500")}</span>
                        </label>

                        <label
                            className={`container-radio mt-20px`}>
                            <input type="radio" name="history_status" checked={historystatus === "1gig"}
                                value="1gig" onChange={(e) => setHistorystatus(e.target.value)} />
                            <span className="radio-mark" />
                            <span className="radio-text">{t("text.gb1")}</span>
                        </label>
                    </div>
                    <Button
                        className="fs-xs_ d-flex button btn-primary-fill height-auto py-1 px-4 justify-content-center align-items-center ml-3 form-control my-4 py-2"
                        handler={() => console.log(false)}
                    >
                        <span>{t("text.confirm")}</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default Usagetimepanel;