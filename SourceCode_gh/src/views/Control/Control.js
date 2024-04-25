import React, {useEffect, useState} from "react";
import {isMobile} from 'react-device-detect';
import Manual from "../../components/Automation/Manual";
import Automatic from "../../components/Automation/Automatic";
import Smart from "../../components/Automation/Smart";
import {getSettingsAutomation} from "../../services/api";
import Button from "../../components/Button/Button";
import Modal from "react-modal";
import { useTranslation } from "react-i18next";

Modal.setAppElement('#root')

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'unset',
        bottom: 'unset',
        transform: 'translate(-50%, -50%)',
    },
};

const Control = () => {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState("Manual");
    const [automationType, setAutomationType] = useState(null);
    const [automationModalOpen, setAutomationModalOpen] = useState({isOpen: false, type: ''})

    useEffect(() => {
        loadAutomationType()
    },[])

    const changeTab = (e) => {
        setSelectedTab(e.target.attributes.datatab.value)
    }

    const loadAutomationType = () => {
        getSettingsAutomation().then(res => {
            setAutomationType(res.automation);
        }).catch(err => console.log(err))
    }
    
    return (
        <>
            <div className={`control container-fluid ${isMobile ? "" : "mt-3"}`}>
                <section className={`row card card-box flex-row ${isMobile ? "py-2" : "py-3"}`}>
                    <div className={`control-type cursor-pointer ${selectedTab === "Manual" ? "active text-primary" : ""}`} title={isMobile ? `${t("text.Manual")}` : `${t("text.Manualautomation")}`} datatab="Manual"
                         onClick={changeTab}>
                        {
                            isMobile ? `${t("text.Manual")}` : `${t("text.Manualautomation")}`
                        }
                    </div>
                    <div className={`control-type cursor-pointer ${selectedTab === "Automatic" ? "active text-primary" : ""}`} title={isMobile ? `${t("text.Automatic")}` : `${t("text.Automaticautomation")}`} datatab="Automatic"
                         onClick={changeTab}>
                        {
                            isMobile ? `${t("text.Automatic")}` : `${t("text.Automaticautomation")}`
                        }
                    </div>
                    <div className={`control-type cursor-pointer ${selectedTab === "Smart" ? "active text-primary" : ""}`} title={isMobile ? `${t("text.Smart")}` : `${t("text.Smartautomation")}`} datatab="Smart"
                         onClick={changeTab}>
                        {
                            isMobile ? `${t("text.Smart")}` : `${t("text.Smartautomation")}`
                        }
                    </div>
                </section>

                {
                    selectedTab === "Manual" && <Manual automationType={automationType} handleShowAutomation={setAutomationModalOpen}/>
                }
                {
                    selectedTab === "Automatic" && <Automatic automationType={automationType} handleShowAutomation={setAutomationModalOpen}/>
                }
                {
                    selectedTab === "Smart" && <Smart automationType={automationType} handleShowAutomation={setAutomationModalOpen}/>
                }
            </div>

            <Modal
                isOpen={automationModalOpen.isOpen}
                onRequestClose={() => setAutomationModalOpen({isOpen: false, type: ''})}
                style={customStyles}
                contentLabel="Example Modal"
            >
             {console.log(automationModalOpen.type)}
             {selectedTab === "Manual" ?
                    <p className={` ${isMobile ? "pb-3" : "pb-0"}`}>
                       {t("text.Youautomationsettingssectionmanual")}
                    </p>
                    :
                    selectedTab === "Automatic" ?
                        <p className={` ${isMobile ? "pb-3" : "pb-0"}`}>
                              {t("text.Youautomationsettingssectionautomatic")}
                        </p>
                        :
                        <p className={` ${isMobile ? "pb-3" : "pb-0"}`}>
                            {t("text.Youautomationsettingssectionsmart")}
                        </p>

                }
                <p className={` pb-4 font-500 mb-0`}>{t("text.Settings")} > {t("text.automation")} </p>
                <div className={`d-flex justify-content-center`}>
                    <Button
                        className="d-flex align-items-center button justify-content-center btn-primary-fill ml-2 w-50"
                        handler={() => setAutomationModalOpen({isOpen: false, type: ''})}
                    >
                        <span>{t("text.Irealized")}</span>
                    </Button>
                </div>
            </Modal>

        </>
    );
};

export default Control;