import React, { useState, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Modal from "react-modal";

const Language = (props) => {
    const [dropDownMenuFlagOpen, setDropDownMenuFlagOpen] = useState(false)
    const [selectedFlag, setSelectedFlag] = useState("icon-flag-iran")
    const wrapperRef = useRef(null);
    const { t, i18n } = useTranslation();

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setDropDownMenuFlagOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [])
    useEffect(() => {
        const lang = localStorage.getItem("lang")
        lang && lang == 'fa' ? setSelectedFlag("icon-flag-iran") : lang == 'en' ? setSelectedFlag("icon-flag-english") : setSelectedFlag("icon-flag-iran");
        lang ?  i18n.changeLanguage(lang):i18n.changeLanguage('fa')
    }, [localStorage.getItem("lang")])


    return (
        <div className={`position-relative ${dropDownMenuFlagOpen ? "dropdown-open" : ""} `}>
            <div className={`icon icon-18 mr-1 ${selectedFlag}`} onClick={() => setDropDownMenuFlagOpen(prevState => !prevState)} />

            {
                isMobile ? (
                    <Modal
                        isOpen={dropDownMenuFlagOpen}
                        onRequestClose={() => setDropDownMenuFlagOpen(false)}
                        shouldCloseOnOverlayClick={true}
                        className="action-modal pb-2"
                    >
                        <div className="row justify-content-end mb-3 position-relative">
                            <div className="position-absolute btn-close">
                                <i className="icon icon-24 icon-close" onClick={() => setDropDownMenuFlagOpen(false)} />
                            </div>
                        </div>
                        <div className="row px-2 font-size-14 font-400">
                            <div className="col-12 mt-2 px-2">
                                <div
                                    onClick={() => {
                                        setDropDownMenuFlagOpen(false)
                                        localStorage.setItem('lang', 'fa')
                                    }}
                                    className="d-flex tile-dropdown-item py-2 border-bottom border-muted align-items-center cursor-pointer">
                                    <div className="icon icon-20 icon-flag-iran" />
                                    <div className="mr-2 text-nowrap">فارسی</div>
                                </div>
                            </div>
                            <div className="col-12 mt-2 px-2">
                                <div
                                    onClick={() => {
                                        setDropDownMenuFlagOpen(false)
                                        localStorage.setItem('lang', 'en')

                                    }}
                                    className="d-flex tile-dropdown-item py-2 border-bottom border-muted align-items-center cursor-pointer">
                                    <div className="icon icon-20 icon-flag-english" />
                                    <div className="mr-2 text-nowrap">English</div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                ) : (
                    <div className={`tile-dropdown position-absolute font-size-14 font-400 px-3 bg-white`} ref={wrapperRef} >
                        <div
                            onClick={() => {
                                setDropDownMenuFlagOpen(false)
                                localStorage.setItem('lang', 'fa')
                            }}
                            className="d-flex tile-dropdown-item border-bottom border-muted py-3 align-items-center cursor-pointer">
                            <div className="icon icon-20 icon-flag-iran" />
                            <div className="mr-2 text-nowrap"> فارسی </div>
                        </div>
                        <div
                            onClick={() => {
                                setDropDownMenuFlagOpen(false)
                                localStorage.setItem('lang', 'en')
                            }}
                            className="d-flex tile-dropdown-item border-bottom border-muted py-3 align-items-center cursor-pointer">
                            <div className="icon icon-20 icon-flag-english" />
                            <div className="mr-2">English</div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default Language