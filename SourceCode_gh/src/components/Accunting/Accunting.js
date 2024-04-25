import React, { useState, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Modal from "react-modal";
// import IncCredit_ from "./IncCredit_";
import { Link } from "react-router-dom";
import { getremain_account } from "../../services/api";


const Accunting = (props) => {
    const [dropDownMenuOpen, setDropDownMenuOpen] = useState(false);
    const [walletbalance, setWalletbalance] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const wrapperRef = useRef(null);
    const { t } = useTranslation();

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setDropDownMenuOpen(false);
        }
       setWalletbalance(null) 
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [])
    
    const Viewwalletbalance =()=>{
        setIsLoading(true)
        let username = localStorage.getItem('username')
        getremain_account(username).
        then(res=>{
            setWalletbalance(new Intl.NumberFormat().format(res.remain_account));
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    return (
        <div className={`position-relative ${dropDownMenuOpen ? "dropdown-open" : ""} `}>
            <div className={`icon icon-18 mr-1 icon-accunting`} onClick={() => {setDropDownMenuOpen(prevState => !prevState),Viewwalletbalance()}} />
            

            {
                isMobile ? (
                    <Modal
                        isOpen={dropDownMenuOpen}
                        onRequestClose={() => setDropDownMenuOpen(false)}
                        shouldCloseOnOverlayClick={true}
                        className="action-modal pb-2"
                    >
                        <div className="row justify-content-end mb-3 position-relative">
                            <div className="position-absolute btn-close">
                                <i className="icon icon-24 icon-close" onClick={() => setDropDownMenuOpen(false)} />
                            </div>
                        </div>
                        <div className="row px-2 font-size-14 font-400">
                            <div className="col-12 mt-2 px-2">
                                <div
                                    onClick={() => {
                                        setDropDownMenuOpen(false)
                                    }}
                                    className="d-flex tile-dropdown-item py-2 align-items-center cursor-pointer">
                                    <div className="mr-2 text-nowrap">
                                        <Link to="/Panel/Dashboard/IncCredit_"
                                            className="d-flex">
                                            <div className="icon icon-20 icon-Increase-credit" />
                                            {t("text.Increasecredit")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-2 px-2">
                                <div
                                    onClick={() => {
                                        setDropDownMenuOpen(false)
                                    }}
                                    className="d-flex tile-dropdown-item py-2 align-items-center cursor-pointer">
                                    <div className="mr-2 text-nowrap">
                                        <Link to="/Panel/Dashboard/Usagetimepanel"
                                            className="d-flex">
                                            <div className="icon icon-20 icon-Increase-credit" />
                                            {t("text.Usagetimepanel")}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 mt-2 px-2">
                                <div
                                    // onClick={() => {
                                    //     Viewwalletbalance()
                                    // }}
                                    className="d-flex tile-dropdown-item py-2 align-items-center cursor-pointer">
                                    <div className="mr-2 text-nowrap">
                                      
                                            <div className="icon icon-20 icon-Increase-credit" />
                                            {/* {t("text.Viewwalletbalance")} */}
                                            {/* {isLoading ? <span className="loading_" style={{top:'30px'}}/> : walletbalance && <div className="d-flex justify-content-between"><span>{t("text.Viewwalletbalance")}</span><span>{walletbalance}{t("text.rial")}</span></div>} */}
                                            <span>{t("text.Viewwalletbalance")}</span>{isLoading ? <span className="loading_mobile "/> : (<span>{walletbalance} {t("text.rial")}</span>)}
                                       
                                    </div>
                                </div>
                                {/* {isLoading ? <div className="loading_" style={{top:'30px'}}/> : walletbalance && <div className="d-flex justify-content-between"><span>{t("text.Viewwalletbalance")}</span><span>{walletbalance}{t("text.rial")}</span></div>} */}
                            </div>
                        </div>
                    </Modal>
                ) : (
                    <div className={`tile-dropdown position-absolute font-size-14 font-400 px-3 bg-white`} ref={wrapperRef} >
                        <div
                            onClick={() => {
                                setDropDownMenuOpen(false)
                            }}
                            className="d-flex tile-dropdown-item py-3 align-items-center cursor-pointer">
                            <div className="mr-2 text-nowrap">
                                <Link to="/Panel/Dashboard/IncCredit_"
                                    className="d-flex ">
                                    <div className="icon icon-20 icon-Increase-credit mx-2" />
                                    {t("text.Increasecredit")}
                                </Link>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                setDropDownMenuOpen(false)
                            }}
                            className="d-flex tile-dropdown-item py-3 align-items-center cursor-pointer">
                            <div className="mr-2 text-nowrap">
                                <Link to="/Panel/Dashboard/Usagetimepanel"
                                    className="d-flex ">
                                    <div className="icon icon-20 icon-Increase-credit mx-2" />
                                    {t("text.Usagetimepanel")}
                                </Link>
                            </div>
                        </div>
                        <div
                            // onClick={() => {
                            //     // setDropDownMenuOpen(false)
                            //     Viewwalletbalance()

                            // }}
                            className="d-flex tile-dropdown-item py-3 align-items-center cursor-pointer">
                            <div className="mr-2 text-nowrap">
                                    <div className="icon icon-20 icon-Increase-credit mx-2" />
                                    <span>{t("text.Viewwalletbalance")}</span>{isLoading ? <div><span className="loading_ "></span></div> : (<span>{walletbalance}{t("text.rial")}</span>)}
                                    
                            {/* {isLoading ? <span className="loading_ "/> : walletbalance && <div className="d-flex justify-content-between"><span>{t("text.Viewwalletbalance")}</span><span>{walletbalance}{t("text.rial")}</span></div>} */}

                            </div>
                        </div>
                            {/* {isLoading ? <div className="loading_ "/> : walletbalance && <div className="d-flex justify-content-between"><span>{t("text.Viewwalletbalance")}</span><span>{walletbalance}{t("text.rial")}</span></div>} */}

                    </div>
                )
            }
        </div>
    )
}
export default Accunting