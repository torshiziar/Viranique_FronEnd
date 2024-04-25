import React, { useEffect, useMemo, useRef, useState } from "react";
import { Redirect, Link, useLocation } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import logo from "../../assets/img/logo.png";
import {
    getActivities,
    getMe, getNotifications,
    getUnReadNotificationCount,
    logout,
    uploadAvatar
} from "../../services/api";
import moment from "moment-jalaali";
import { connect } from "react-redux";
import HeaderAction from "./HeaderAction";
import ProfileForm from "../Forms/ProfileForm";
import Modal from "react-modal";
import Notification from "../Notification/Notification";
import Activity from "../Activity";
import CurrentTime from "./CurrentTime";
import { confirmAlert } from "react-confirm-alert";
import { useTranslation } from "react-i18next";
import Language from "./language";
import Accunting from "../Accunting/Accunting";


Modal.setAppElement('#root');

const customStylesPc = {
    content: {
        marginRight: 'auto',
        padding: '0 15px',
        width: '365px',
        overflow: 'hidden',
    },
};

const customStylesMobile = {
    content: {
        position: 'relative !important',
        marginRight: 'auto',
        marginLeft: 'auto',
        inset: '15px',
        padding: '0 15px',
        width: '360px',
        overflow: 'hidden',
    },
};

const customStylesUserProfile = {
    content: {
        height: 'max-content',
        overflowY: 'auto'
    },
};
let ws;

const Header = ({ headerAction, userLoggedIn }) => {
    const { t } = useTranslation();
    const location = useLocation()
    const today = new Date();
    const [redirectToLogin, setRedirectToLogin] = useState(null)
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const wrapperRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false)
    const [showActivity, setShowActivity] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [unReadCountNotification, setUnReadCountNotification] = useState(0);
    const [activities, setActivities] = useState([])
    const [notifications, setNotifications] = useState({})
    const [errors, setErrors] = useState(null)
    const [lastMessage, setLastMessage] = useState(null);
    const [lastMessageActivity, setLastMessageActivity] = useState(null);
    const [lastMessageNotification, setLastMessageNotification] = useState(null);
    const [userProfile, setUserProfile] = useState(null);


    useEffect(()=>{
        // setUserProfile(localStorage.getItem("photo"))
        getMe().then(res => {
            setUserProfile(res)
        }).catch(error => console.log(error))

    },[user,localStorage.getItem("photo")])

    useEffect(() => {
        if (showNotification) {
            loadNotifications()
        }
    }, [showNotification])

    useEffect(() => {
        if (showActivity) {
            loadActivities()
        }
    }, [showActivity])

    useEffect(() => {

        document.addEventListener('click', handleClickOutside, true);
        handleWebSocketNotifications();
        handleNetworkStatus();

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            ws.close();
        }
    }, [])

    const handleNetworkStatus = () => {
        window.addEventListener("offline", () => {
            confirmDelete()
        });
    }

    const confirmDelete = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className={`card card-box`}>
                        <i className="icon icon-24 icon-danger mx-auto" />
                        <p className={`text-dark text-center mt-3`}>لطفا وضعیت اتصال به اینترنت را بررسی کنید.</p>
                        <div className="d-flex mt-4 justify-content-center">
                            <button
                                className="button btn-primary-fill-outline py-2 px-3 col-6 mx-2 btn-primary-border text-primary bold"
                                onClick={() => {
                                    onClose();
                                }}
                            >
                                <span className="py-1 px-3">{t("text.confirm")}</span>
                            </button>
                        </div>
                    </div>
                );
            },
            overlayClassName: "overlay-custom-confirm-modal"
        });
    }

    const handleWebSocketNotifications = () => {
        ws = new WebSocket(`wss://viranique.com/ws/dashboard/${localStorage.getItem('token')}/`);

        ws.onmessage = (e) => {
            const message = JSON.parse(e.data);
            console.log("message")
            console.log(message)
            setLastMessage(message)
            if (message?.notification) {
                loadUnReadCountNotification()
            }
        };

        ws.onclose = (e) => {
            console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
            setLastMessage(null);
            setTimeout(function () {
                handleWebSocketNotifications()
            }, 1000);
        };

        ws.onerror = function (err) {
            console.error('Socket encountered error: ', err.message, 'Closing socket');
            ws.close();
        };
    }

    useEffect(() => {
        if (lastMessage?.activity && showActivity) {
            setLastMessageActivity(lastMessage?.activity)
        } else if (lastMessage?.notification && showNotification) {
            setLastMessageNotification(lastMessage?.notification)
        }
    }, [lastMessage])

    useEffect(() => {
        loadUnReadCountNotification()
    }, [])

    const loadUnReadCountNotification = () => {
        getUnReadNotificationCount()
            .then(res => setUnReadCountNotification(res?.unread_count))
            .catch(err => console.log(err))
    }

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            setDropDownOpen(false);
        }
    }

    const signOut = () => {
        logout();
        setRedirectToLogin(true);
    }

    const handleUserProfile = () => {
        getMe().then(res => {
            setUser(res)
            setShowModal(true)
        }).catch(error => console.log(error))
    }

    const handleCloseModal = () => {
        setShowNotification(false)
        setNotifications({}); //setNotifications([]);
        setLastMessage(null);// new
        ////new doran
    }

    const handleProfileUser = (data) => {
        const formValues = new FormData();

        formValues.append("name", data.name)
        formValues.append("last_name", data.last_name)
        formValues.append("phone", data.phone)
        formValues.append("address", data.address)
        formValues.append("username", data.username)
        // formValues.append("photo", data.photo); // بعد از اینکه سمت بک اند درست شد اینو اینجا بفرستم


        setIsLoading(true)
        uploadAvatar(formValues).then(res => {
            localStorage.setItem("username", res?.username);
            localStorage.setItem("name", res?.name);
            localStorage.setItem("last_name", res?.last_name);
            setIsLoading(false)
            setShowModal(false);
        }).catch(err => {
            setIsLoading(false)
            setErrors(err?.response?.data?.error)
        })
    }

    const loadNotifications = () => {
        getNotifications().then(res => {
            setNotifications(res)
        }).catch(err => console.log(err))
    }

    const loadActivities = () => {
        getActivities().then(res => {
            setActivities(res);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (location.pathname === '/Panel/Dashboard/User/Me') {
            setDropDownOpen(false)
        }
    }, [location])

    if (redirectToLogin) {
        return <Redirect to={{ pathname: "/Login" }} />;
    }

    return (
        <>
            <header
                className={`header-box sticky-top bg-white row justify-content-between align-items-center ${!isMobile ? "mt-2 ml-2 pr-2" : ""}`}>
                <div className={`d-flex align-items-center ${isMobile ? "mr-3" : ""}`}>
                    <img className="d-block header-logo" src={logo} />
                    <h1 className={isMobile ? "d-none" : "h6 mx-2 mt-2"}>{t("text.Smartsystem")}</h1>
                </div>
                <div className=" d-flex justify-content-center align-items-center">
                    <div className="CurrentTime">
                        <CurrentTime />
                    </div>
                    <div
                        className={isMobile ? "d-none" : "d-flex text-center justify-content-center align-items-center ml-4 border-right pr-2"}>
                        <i className="icon icon-20 icon-calendar" />
                        <div className="pr-2">{moment(today).locale(`${t("text.langweather")}`).format(`${t("text.formatdate")}`)}</div>
                    </div>
                    <div className={"d-flex text-center justify-content-center align-items-center ml-4 border-right pr-2"}>
                        <Language />

                    </div>
                    {/* ////// gh */}
                    <div className={"d-flex text-center justify-content-center align-items-center ml-4 border-right pr-2"}>
                        <Accunting />
                    </div>
                    {/* ////////gh */}
                    <div
                        className={`d-flex text-center cursor-pointer justify-content-center align-items-center position-relative ${isMobile ? "px-3" : "px-4 border-right"}`}
                        onClick={() => setShowActivity(prevState => !prevState)}
                    >
                        <i className="icon icon-20 icon-activity" />
                    </div>

                    <div
                        className={`wrapIconNotif d-flex text-center cursor-pointer justify-content-center align-items-center position-relative ${isMobile ? "px-3" : "ml-4 px-4 border-left border-right"}`}
                        onClick={() => setShowNotification(prevState => !prevState)}
                    >
                        <i className="icon icon-20 icon-notification" />
                        {
                            unReadCountNotification > 0 && <span
                                className="d-flex rounded-circle justify-content-center align-items-center p-2 bg-dark-red notification">{unReadCountNotification > 9 ? `9+` : unReadCountNotification}</span>
                        }
                    </div>
                    
                    <li className="nav-item drop-down d-inline-block" ref={wrapperRef}>
                        <div
                            className={`d-flex justify-content-between align-items-center p-1 ${isMobile ? "ml-3 drop-down-rounded" : ""}`}

                            // nav-link
                            onClick={() => setDropDownOpen(prevState => !prevState)}
                            href="#"
                            id="headerDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">

                            {
                                userProfile ? (<img src={userProfile?.photo ? `https://viranique.com/${userProfile?.photo}` : null}  //userProfile   user?.photo ? `https://viranique.com/${user?.photo}
                                    className={`header-avatar ${isMobile ? "" : "ml-2 my-1"}`} />) : (
                                    <i className={`icon icon-34 icon-profile ${isMobile ? "" : "ml-2 my-1"}`} />)
                            }
                            {
                                !isMobile && <div>
                                    {localStorage.getItem("username")}
                                </div>
                            }
                            <div>
                                <i className={`icon icon-20 icon-arrow-down ${isMobile ? "" : "mx-3"}`} />
                            </div>
                        </div>
                        <div
                            className={
                                "dropdown-menu text-right position-absolute p-0  m-0 " +
                                (dropDownOpen ? "show" : "")
                            }
                            aria-labelledby="headerDropdown">
                            <i className="icon icon-14  icon-polygon-dropdown polygon-dropdown position-absolute " />
                            {
                                isMobile &&
                                <div
                                    className="dropdown-item d-flex flex-column btn.link pt-2 pb-2 px-3  font-size-standard dropdown-click p-0 small cursor-pointer">
                                    <div className="pb-2 border-bottom text-dark bold">
                                        {/* {localStorage.getItem("name") + " " + localStorage.getItem("last_name")} /////gh */}
                                        {localStorage.getItem("username")}
                                    </div>
                                </div>
                            }
                            <div className="d-flex dropdown-item align-items-center px-3">
                                <i className={"icon-20 icon-user d-flex"} />
                                {
                                    isMobile ? (<Link to="/Panel/Dashboard/User/Me"
                                        className="dropdown-item dropdown-click px-3 pt-2 pb-2 ">
                                        {t("text.Account")}
                                    </Link>) : (<p
                                        className="small mb-0 dropdown-click mr-2 pt-2 pb-2 cursor-pointer"
                                        onClick={() => {
                                            handleUserProfile()
                                            setDropDownOpen(prevState => !prevState)
                                        }}
                                    >
                                        {t("text.Account")}
                                    </p>)
                                }
                            </div>

                            <div
                                className="dropdown-item d-flex btn.link pt-2 pb-2 px-3  font-size-standard dropdown-click p-0 small cursor-pointer"

                                onClick={(e) => {
                                    e.stopPropagation();
                                    signOut();
                                }}>
                                <i className={"icon-20 icon-sign-out d-flex"} />
                                <p className={`text-danger m-0 dropdown-click mr-2 ${isMobile ? "mt-2" : ""}`}>

                                    {t("text.Signout")}{" "}
                                </p>
                            </div>
                        </div>
                    </li>
                </div>
                {
                    headerAction && <HeaderAction />
                }
            </header>

            <Modal
                isOpen={showModal}
                className="modal-user"
                onRequestClose={() => setShowModal(false)}
                shouldCloseOnOverlayClick={true}
                style={customStylesUserProfile}
            >
                <div className="container-fluid">
                    <ProfileForm
                        closeHandler={() => {
                            setShowModal(false)
                            setUser(null)
                            setErrors(null)
                        }}
                        isLoading={isLoading}
                        submitHandler={handleProfileUser}
                        data={user}
                        errors={errors}
                        // handleErrorsOfChild={handleErrorsOfChild}
                    />
                </div>
            </Modal>

            <Modal
                isOpen={showNotification}
                shouldCloseOnOverlayClick={true}
                onRequestClose={handleCloseModal}
                style={isMobile ? customStylesMobile : customStylesPc}
            >
                <Notification
                    // handleCloseModal={() => setShowNotification(false)}///doran
                    handleCloseModal={handleCloseModal}
                    unReadCountNotification={unReadCountNotification}
                    notifications={notifications}
                    lastMessage={lastMessageNotification}
                    loadNotifications={loadNotifications}
                    loadUnReadCountNotification={loadUnReadCountNotification}
                />
            </Modal>


            <Modal
                isOpen={showActivity}
                shouldCloseOnOverlayClick={true}
                onRequestClose={() => setShowActivity(false)}
                style={isMobile ? customStylesMobile : customStylesPc}
            >
                <Activity
                    handleCloseModal={() => setShowActivity(false)}
                    userLoggedIn={userLoggedIn}
                    activities={activities}
                    lastMessage={lastMessageActivity}
                />
            </Modal>
        </>
    );
}


const mapStateToProps = state => ({
    headerAction: state.headerAction
});

export default connect(mapStateToProps, null)(Header);

