import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import './Accunting.scss';


const IncCredit_ = () => {
    const { t } = useTranslation();
    const [smsStatus, setSmsStatus] = useState(null)
   
    const [showPaymentSmsCard, setShowPaymentSmsCard] = useState(false)
    const paymentSmsButton = useRef();
    const paymentSmsCard = useRef();
    const handlePaymentSMS = () => {
        setShowPaymentSmsCard(true)
             // window.scrollTo({
        //     top:paymentSmsCard.current.offsetTop,
        //     behavior: "smooth"
        //   });
    }
    return (
        <div className="wrap-accunting overflow-auto height-user-custom px-30px mx--15px mt--15px pt-15px">
            <div className="row justify-content-between ">
                <div className="card col-xxl-3 col-lg-3 col-md-12 col-12 my-2 " ref={paymentSmsButton}>
                    <div className="card-body">
                        <h6 className="card-title text-center p-2 border-bottom fs-sm_ " >{t("text.Chargingpanel")}</h6>
                        <div className="card-text">
                            <label
                                className={`container-radio mt-20px`}>
                                <input type="radio" name="sms_status" checked={smsStatus === "100000"}
                                    value="100000" onChange={(e) => setSmsStatus(e.target.value)} />
                                <span className="radio-mark" />
                                <span className="radio-text"> {new Intl.NumberFormat().format(100000)} </span> <span>{t("text.rial")}</span>
                            </label>
                            <label
                                className={`container-radio mt-20px`}>
                                <input type="radio" name="sms_status" checked={smsStatus === "500000"}
                                    value="500000" onChange={(e) => setSmsStatus(e.target.value)} />
                                <span className="radio-mark" />
                                <span className="radio-text"> {new Intl.NumberFormat().format(500000)} </span> <span>{t("text.rial")}</span>
                            </label>

                            <label
                                className={`container-radio mt-20px`}>
                                <input type="radio" name="sms_status" checked={smsStatus === "1000000"}
                                    value="1000000" onChange={(e) => setSmsStatus(e.target.value)} />
                                <span className="radio-mark" />
                                <span className="radio-text"> {new Intl.NumberFormat().format(1000000)} </span> <span>{t("text.rial")}</span>
                            </label>

                            <label
                                className={`container-radio mt-20px`}>
                                <input type="radio" name="sms_status" checked={smsStatus === "5000000"}
                                    value="5000000" onChange={(e) => setSmsStatus(e.target.value)} />
                                <span className="radio-mark" />
                                <span className="radio-text"> {new Intl.NumberFormat().format(5000000)} </span> <span>{t("text.rial")}</span>
                            </label>

                            <label
                                className={`container-radio mt-20px`}>
                                <input type="radio" name="sms_status" checked={smsStatus === "10000000"}
                                    value="10000000" onChange={(e) => setSmsStatus(e.target.value)} />
                                <span className="radio-mark" />
                                <span className="radio-text"> {new Intl.NumberFormat().format(10000000)} </span> <span>{t("text.rial")}</span>
                            </label>

                            <label
                                className={`container-radio mt-20px`}>
                                <input type="radio" name="sms_status" checked={smsStatus === "Desiredamount"}
                                    value="Desiredamount" onChange={(e) => setSmsStatus(e.target.value)} />
                                <span className="radio-mark" />
                                <span className="radio-text"> {t("text.Desiredamount")}</span>
                            </label>

                            <div className={`${smsStatus !== 'Desiredamount' ? 'd-none' : 'd-flex'} m-4 align-items-center`}>
                                <input type="text" className="form-control mx-2" placeholder={t("text.Enterdesiredvalue")} />
                                <span>{t("text.rial")}</span>
                            </div>

                        </div>
                        <Button
                            className="fs-xs_ d-flex button btn-primary-fill height-auto py-1 px-4 justify-content-center align-items-center ml-3 form-control my-4 py-2"
                            handler={() => handlePaymentSMS()}
                        >
                            <span>{t("text.payment")}</span>

                        </Button>

                    </div>
                </div>
              
            </div>

            <div className={`${!showPaymentSmsCard ? 'd-none' : 'd-block'} h-25 row mt-4 paymentSmsCard`} ref={paymentSmsCard}>
                <div className="card col-xxl-7 col-xl-7 col-lg-7 col-md-12 col-12">
                <div className="card-body">
                        <h6 className="card-title text-center p-2 border-bottom fs-sm_" >{t("text.PaymentthroughallShatabmembercards")}</h6>
                        <div className="card-text">
                           <div className="my-2">
                            <span >{t("text.Panelchargeamount")} :</span>
                            <span> {new Intl.NumberFormat().format(100000)}  </span> 
                            <span> {t("text.rial")} </span>
                           </div>
                           <div className="my-2">
                            <span >{t("text.tax")}  :</span>
                            <span> {new Intl.NumberFormat().format(100000)}  </span> 
                            <span> {t("text.rial")} </span>
                           </div>
                           <div className="my-2">
                            <span >{t("text.amountpayable")}  :</span>
                            <span> {new Intl.NumberFormat().format(100000)}  </span> 
                            <span> {t("text.rial")} </span>
                           </div>
                        </div>
                        <div className=" d-flex">
                        <Button
                            className="fs-xs_ button btn-primary-fill height-auto py-1 px-4 justify-content-center align-items-center ml-3 form-control my-4 py-2"
                            handler={() => console.log(false)}
                        >
                            <span>{t("text.Transferpayment")}</span>
                        </Button>
                        </div>
                    </div>
                    <div>
                            <h6>{t("text.note")}:</h6>
                          <p>
                           - {t("text.Disconnectyourvpn")}
                          </p>
                          <p>
                            {t("text.try")}
                          </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IncCredit_;