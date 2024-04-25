import React, { useEffect, useRef, useState } from "react";
import {
    getActuators,
    getNotifications,
    getSensors,
    markAllAsReadNotification
} from "../../services/api";
import NotificationItem from "./NotificationItem";
import Modal from "react-modal";
import MultiSelect from "react-multi-select-component";
import moment from "moment-jalaali";
import Button from "../Button/Button";
import { isMobile } from "react-device-detect";
import ReactSelect from "../Select/Select";
import {
    sensorToList
} from "../../utils/toList";
import CustomDatePicker from "../CustomDatePicker";
import { useTranslation } from "react-i18next";
import DatePicker_ from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

Modal.setAppElement('#root');

const customStyles = {
    content: {
        height: 'max-content',
        overflow: 'initial',
        marginRight: 'auto',
        padding: '0 15px',
        width: '365px',
    }
}

const customStylesMobile = {
    content: {
        height: 'max-content',
        overflow: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: '0 15px',
        inset: '15px',
        width: '365px',
    }
}

const styles = {
    calendarContainer: 'calendarContainer',
    dayPickerContainer: 'dayPickerContainer',
    monthsList: 'monthsList',
    daysOfWeek: 'daysOfWeek',
    dayWrapper: 'dayWrapper',
    currentMonth: 'currentMonth',
    selected: 'selected',
    heading: 'heading',
    prev: 'prev',
    next: 'next',
    title: 'title',
}

const tomorrowDate = moment();

const notificationTypeNames = {
    SENSOR: 20,
    ACTUATOR: 21,
    SYSTEM: 22
}



const Notification = ({ unReadCountNotification, handleCloseModal, notifications, lastMessage, loadNotifications, loadUnReadCountNotification }) => {
    const { t } = useTranslation();
    const notificationTypes = [
        { value: notificationTypeNames.SENSOR, label: `${t("text.Sensoralarm")}` },
        { value: notificationTypeNames.ACTUATOR, label: `${t("text.Relayalarms")}` },
        { value: notificationTypeNames.SYSTEM, label: `${t("text.systemalarm")}` }
    ]
    const dateFromEl = useRef(null);
    const [isShowFilter, setIsShowFilter] = useState(false);
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [titleNotificationItems, setTitleNotificationItems] = useState("")
    const [notificationItems, setNotificationItems] = useState([]);

    const [filterOptions, setFilterOptions] = useState({
        selectedNotificationType: null,
        selectedNotificationItems: []
    })
    const [prevFilterOptions, setPrevFilterOptions] = useState({
        selectedNotificationType: null,
        selectedNotificationItems: []
    })
    const [dateFrom, setDateFrom] = useState(null);
    const [dateFromPrev, setDateFromPrev] = useState(null);

    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const [isFilter, setIsFilter] = useState(false);



    const sortList = (notifList) => { ////////sort date of notification with frontend -ghafurian
        return notifList.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        })
    }
    useEffect(() => {
        console.log("notifications");
        console.log(notifications);
        console.log(lastMessage);
        // if (lastMessage) {
        //     setList(prevState => [lastMessage].concat(prevState));
        // }
        // else 
        setList("results" in notifications ? notifications.results : [])///// setList(notifications?.results) doran

        setNextPage(notifications?.next ? notifications?.next.replace('http', 'https') : null)
        setPrevPage(notifications?.previous ? notifications?.previous.replace('http', 'https') : null)
    }, [notifications, lastMessage])


    // useEffect(() => {
    //     if (lastMessage) {
    //         setList(prevState => [lastMessage].concat(prevState));
    //     }
    // }, [lastMessage])

    useEffect(() => {
        setFilterOptions({ ...filterOptions, selectedNotificationItems: [] })
        if (filterOptions.selectedNotificationType?.value === notificationTypeNames.SENSOR) {
            loadSensors()
        } else if (filterOptions.selectedNotificationType?.value === notificationTypeNames.ACTUATOR) {
            loadActuators()
        }
    }, [filterOptions.selectedNotificationType])

    const handleReadAllNotifications = () => {
        markAllAsReadNotification().then(() => {
            loadUnReadCountNotification()
            const tempList = [...list];
            tempList?.map(item => {
                return console.log(item.unread = false)
            })

            setList(tempList);
        }).catch(err => {
            console.log(err)
        });
    }

    const handleShowFilter = () => {
        setIsShowFilter(true);
    }

    const handleHideFilter = () => {
        setIsShowFilter(false);
    }

    const ArrowRenderer = ({ expanded }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="#646464" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>;

    const loadSensors = () => {
        setList
        getSensors().then(res => {
            setNotificationItems(sensorToList(res))
        }).catch(err => console.log(err))
    }

    const loadActuators = () => {
        getActuators().then(res => {
            setNotificationItems(sensorToList(res))
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        if (filterOptions.selectedNotificationItems.length === 0 && filterOptions.selectedNotificationType === null && dateFrom === null) {
            setIsFilter(false)
        } else {
            setIsFilter(true)
        }
    }, [filterOptions, dateFrom])

    const handleScroll = () => {
        const element = document.querySelector(".notification-list")
        if (Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight || Math.ceil(element.scrollHeight - element.scrollTop) - 1 === element.clientHeight) {
            if (nextPage && !isLoading) {
                getNextPageNotification();

            }
        }
    }
    const getNextPageNotification = () => {
        setIsLoading(true);
        getNotifications(null, null, null, null, nextPage).then(res => {
            setList(prev => [...prev, ...sortList(res.results)]);
            setNextPage(res?.next ? res?.next.replace('http', 'https') : null);
            setPrevPage(res?.previous ? res?.previous.replace('http', 'https') : null)
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
        })
    }

    const getPrevPageNotification = () => {
        setIsLoading(true)
        getNotifications(null, null, null, null, prevPage).then(res => {
            setList(prev => [...res.results, ...prev]);
            setNextPage(res?.next ? res?.next.replace('http', 'https') : null);
            setPrevPage(res?.previous ? res?.previous.replace('http', 'https') : null)

            setIsLoading(false);
        }).catch(err => setIsLoading(false))
    }

    const handleFilter = () => {
        console.log("dateFrom")
        console.log(moment(dateFrom).locale(`${t("text.langweather")}`).format(`${t("text.formatdate")}`))
        const notificationItemsId = filterOptions.selectedNotificationItems.map(item => item.value).toString()
        const date = dateFrom ?
            localStorage.getItem("lang") == 'fa' ? dateFrom.format('YYYY-MM-DD')
                : moment(dateFrom).locale("en").format("YYYY-MM-DD")
            :
            null;
        const notificationType = filterOptions.selectedNotificationType ? filterOptions.selectedNotificationType.value : null
        setPrevFilterOptions(filterOptions)
        setDateFromPrev(dateFrom);

        getNotifications(null, notificationType, notificationItemsId, date, null)
            .then(res => {
                setList(res?.results)
                setNextPage(res?.next ? res?.next.replace('http', 'https') : null);
                setPrevPage(res?.previous ? res?.previous.replace('http', 'https') : null)

                setIsShowFilter(false)
            }).catch(err => console.log(err))

        setIsShowFilter(false)
    }

    const checkAutomationItems = () => {
        let result = false;
        let filterAutomationItemsIds = filterOptions.selectedNotificationItems.map(item => item.value)
        if (prevFilterOptions.selectedNotificationItems.length !== filterOptions.selectedNotificationItems.length) {
            result = false
        } else {
            result = handleCheck(filterAutomationItemsIds)
        }
        return result;
    }

    const handleCheck = (filterAutomationItemsIds) => {
        const res = prevFilterOptions.selectedNotificationItems.map(item => filterAutomationItemsIds.some(el => item.value === el))
        return !res.some(item => item === false);
    }

    const isFilterOptionsChanged = () => {
        if (filterOptions.selectedNotificationItems.length === 0 && filterOptions.selectedNotificationType === null && dateFrom === null && prevFilterOptions.selectedNotificationItems.length === 0 && prevFilterOptions.selectedNotificationType === null && dateFromPrev === null) {
            return false
        } else return !(prevFilterOptions.selectedNotificationType?.value !== filterOptions.selectedNotificationType?.value || dateFromPrev !== dateFrom || !checkAutomationItems());
    }

    const handleChangeNotificationType = item => {
        setFilterOptions({ ...filterOptions, selectedNotificationType: item })
    }

    const handleChangeNotificationItems = items => {
        setFilterOptions({ ...filterOptions, selectedNotificationItems: items })
    }

    const resetFilter = () => {
        setFilterOptions({ selectedNotificationType: null, selectedNotificationItems: [] })
        setPrevFilterOptions({ selectedNotificationType: null, selectedNotificationItems: [] })
        setDateFrom(null);
        setDateFromPrev(null);
        loadNotifications()
        setIsShowFilter(false);
    }

    useEffect(() => {
        if (filterOptions.selectedNotificationType?.label === `${t("text.Relayalarms")}`) {
            setTitleNotificationItems(t("text.Relay"))
        } else if (filterOptions.selectedNotificationType?.label === `${t("text.systemalarm")}`) {
            setTitleNotificationItems(t("text.system"))
        } else if (filterOptions.selectedNotificationType?.label === `${t("text.Sensoralarm")}`) {
            setTitleNotificationItems(t("text.sensor"))
        } else {
            setTitleNotificationItems("")
        }
    }, [filterOptions.selectedNotificationType])

    return (
        <>
            <div className={`row px-2 border-bottom notif-scroll ${isMobile ? "pb-4 pt-2" : "py-4"}`}>
                <div className="col-12 d-flex justify-content-between  align-items-center">
                    <div className="d-flex  align-items-center font-weight-bold text-dark">
                        {t("text.Notifications")}
                        <span className="notification-counter mr-2">
                            {
                                unReadCountNotification
                            }
                        </span>
                    </div>
                    <div className="d-flex align-items-center">
                        <i className={`icon icon-24 icon-filter cursor-pointer ml-3 ${isFilter ? "circle-filter" : ""}`}
                            onClick={handleShowFilter} />
                        <div
                            className="px-2 all-read ml-3"
                            role="button"
                            onClick={() => handleReadAllNotifications()}
                        >
                            {t("text.readall")}
                        </div>
                        <i
                            className="icon icon-24 icon-close cursor-pointer"
                            onClick={handleCloseModal}
                        />
                    </div>
                </div>
            </div>
            <div className="notification-list" onScroll={handleScroll}>

                {list?.length > 0 && list?.map((item) => (
                    <>
                        <NotificationItem key={item?.id} item={item} />
                        {/* {console.log(list)} */}
                    </>
                ))}


                {isLoading && <p className="text-center text-primary font-weight-bold mt-3"><span
                    className="indicator-left indicator-right">{t("text.communicate")}</span></p>}


                {/*{error && <p className="text-center text-primary font-weight-bold mt-3"><span*/}
                {/*className="indicator-left indicator-right">خطا در برقراری ارتباط با سرور</span></p>}*/}
                {
                    !nextPage && <div className="d-flex justify-content-center text-primary font-weight-bold mt-3">
                        <span className="end-notification-list font-400 font-size-12 indicator-left indicator-right">{t("text.Endalarms")}</span>
                    </div>
                }
            </div>

            <Modal
                isOpen={isShowFilter}
                contentLabel="اضافه کردن کاربر جدید"
                onRequestClose={() => setIsShowFilter(false)}
                shouldCloseOnOverlayClick={true}
                style={isMobile ? customStylesMobile : customStyles}
            >
                <div className="d-flex flex-column filter-modal">
                    <div className="d-flex justify-content-between align-items-center py-3">
                        <div className="d-flex align-items-center">
                            <i className="icon icon-24 icon-filter" />
                            <span className="mr-2">{t("text.Filter")}</span>
                        </div>
                        <i className="icon icon-24 icon-close cursor-pointer" onClick={handleHideFilter} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">{t("text.selectalarm")}</label>
                        <ReactSelect
                            options={notificationTypes}
                            value={filterOptions.selectedNotificationType}
                            onChange={handleChangeNotificationType}
                            placeholder={t("text.Select")}
                            mobileMode={true}
                            className="autoCompeletSelect "
                        />
                    </div>
                    <div className="form-group mt-12px">
                        <label htmlFor="name"> {t("text.Contents")} {titleNotificationItems}</label>
                        <MultiSelect
                            options={notificationItems}
                            value={filterOptions.selectedNotificationItems}
                            hasSelectAll={false}
                            disableSearch={true}
                            ArrowRenderer={ArrowRenderer}
                            onChange={handleChangeNotificationItems}
                            labelledBy={t("text.Select")}
                            overrideStrings={{
                                "noOptions": `${t("text.Thereisnodata")}`,
                                "search": `${t("text.search")}`,
                                "selectSomeItems": `${t("text.Select")}`,
                                "allItemsAreSelected": `${t("text.Allitemsselected")}`
                            }}
                        />
                    </div>

                    <div className="form-group mt-12px">
                        <label htmlFor="name">{t("text.Gotodate")}</label>
                        {localStorage.getItem("i18nextLng") == 'fa' ?
                            <CustomDatePicker
                                max={tomorrowDate}
                                onChange={value => {
                                    dateFromEl.current.state.isOpen = false;
                                    setDateFrom(value);
                                }}
                                value={dateFrom}
                                refDatePicker={dateFromEl}
                            />
                            :
                            <DatePicker_
                                selected={dateFrom}
                                onChange={value => setDateFrom(value)
                                }
                                className="report-calendar-Container form-control p-date-picker"
                            />
                        }
                    </div>

                    <div className="d-flex form-group my-4 ">
                        {
                            isFilterOptionsChanged() ?
                                <Button
                                    className={`ml-3 button btn-primary-fill d-flex align-items-center justify-content-center width-50 py-2 px-5`}
                                    handler={resetFilter}>
                                    <span className="text-nowrap">{t("text.Removefilter")}</span>
                                </Button> : <Button
                                    className={`ml-3 button btn-primary-fill d-flex align-items-center justify-content-center width-50 py-2 px-5`}
                                    handler={handleFilter}>
                                    <span className="text-nowrap">{t("text.confirm")}</span>
                                </Button>
                        }
                        <Button
                            className={`button btn-primary-outline d-flex align-items-center justify-content-center width-50 py-2 px-5`}
                            handler={handleHideFilter}>
                            <span>{t('text.cancel')}</span>
                        </Button>
                    </div>

                </div>
            </Modal>
        </>
    );
};

export default Notification;
