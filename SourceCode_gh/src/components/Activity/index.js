import React, { useEffect, useRef, useState } from "react";
import { getActivities, getActuatorsListAutomatic, getActuatorsListManual, getUsers, } from "../../services/api";
import ActivityItem from "./ActivityItem";
import MultiSelect from "react-multi-select-component";
import Button from "../Button/Button";
import Modal from "react-modal";
import moment from "moment-jalaali";
import { isMobile } from "react-device-detect";
import ReactSelect from "../Select/Select";
import { automaticToList, manualToList, usersToList } from "../../utils/toList";
import CustomDatePicker from "../CustomDatePicker";
import { useTranslation } from "react-i18next";
import DatePicker_ from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


Modal.setAppElement('#root');

const customStyles = {
    content: {
        height: 'max-content',
        // overflow: 'auto',
        marginRight: 'auto',
        padding: '0 15px',
        width: '365px',
    }
}

const customStylesMobile = {
    content: {
        height: 'max-content',
        // overflow: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
        inset: '15px',
        padding: '0 15px',
        width: '365px',
    }
}

const tomorrowDate = moment();

const notificationTypeNames = {
    MANUAL: 13,
    AUTOMATIC: 15,
}



const Activity = ({ handleCloseModal, userLoggedIn, activities, lastMessage }) => {

    const { t } = useTranslation();
    const automationTypes = [
        { value: notificationTypeNames.MANUAL, label: `${t("text.automation")}` },
        { value: notificationTypeNames.AUTOMATIC, label: `${t("text.Automaticautomation")}` },
    ]
    const dateFromEl = useRef(null);
    const [isShowFilter, setIsShowFilter] = useState(false);
    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);
    const [automations, setAutomations] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const [filterOptions, setFilterOptions] = useState({ selectedUsers: [], selectedAutomations: [], selectedAutomationType: null, dateFrom: null });
    const [prevFilterOptions, setPrevFilterOptions] = useState({ selectedUsers: [], selectedAutomations: [], selectedAutomationType: null, dateFrom: null });

    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const [isFilter, setIsFilter] = useState(false);


    const ArrowRenderer = ({ expanded }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="#646464" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

    useEffect(() => {
        setList(activities?.results);
        setNextPage(activities?.next ? activities?.next.replace('http', 'https') : null)
        setPrevPage(activities?.previous ? activities?.previous.replace('http', 'https') : null)
    }, [activities])

    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        if (filterOptions.selectedUsers.length === 0 && filterOptions.selectedAutomations.length === 0 && filterOptions.selectedAutomationType === null && filterOptions.dateFrom === null) {
            setIsFilter(false);
        } else {
            setIsFilter(true)
        }
    }, [filterOptions])

    useEffect(() => {
        if (lastMessage) {
            setList(prevState => [lastMessage].concat(prevState));
        }
    }, [lastMessage])


    useEffect(() => {
        setFilterOptions({ ...filterOptions, selectedAutomations: [] })
        if (filterOptions.selectedAutomationType) {
            if (filterOptions.selectedAutomationType.value === notificationTypeNames.MANUAL) {
                loadManualList()
            } else {
                loadAutomaticList()
            }
        }
    }, [filterOptions.selectedAutomationType])

    const loadManualList = () => {
        getActuatorsListManual().then(res => {
            setAutomations(manualToList(res));
        }).catch(err => {
            console.log(err)
        })
    }

    const loadAutomaticList = () => {
        getActuatorsListAutomatic().then(res => {
            setAutomations(automaticToList(res));
        }).catch(err => {
            console.log(err)
        })
    }

    const handleShowFilter = () => {
        setIsShowFilter(true);
    }

    const handleScroll = () => {
        const element = document.querySelector(".notification-list")
        if (Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight || Math.ceil(element.scrollHeight - element.scrollTop) - 1 === element.clientHeight) {
            if (nextPage && !isLoading) {
                getNextPageActivities()
            }
        }
    }

    const handleHideFilter = () => {
        setIsShowFilter(false);
    }

    const loadUsers = () => {
        getUsers().then(res => {
            setUsers(usersToList(res))
        }).catch(err => console.log(err))
    }

    const getNextPageActivities = () => {
        setIsLoading(true)
        getActivities(null, null, null, null, null, nextPage).then(res => {
            setList(prev => [...prev, ...res.results]);
            setNextPage(res?.next ? res?.next.replace('http', 'https') : null);
            setPrevPage(res?.previous ? res?.previous.replace('http', 'https') : null)

            setIsLoading(false)
        }).catch(err => setIsLoading(false))
    }

    const getPrevPageActivities = () => {
        setIsLoading(true)
        getActivities(null, null, null, null, null, prevPage).then(res => {
            setList(prev => [...res.results, ...prev]);
            setNextPage(res?.next ? res?.next.replace('http', 'https') : null);
            setPrevPage(res?.previous ? res?.previous.replace('http', 'https') : null)

            setIsLoading(false)
        }).catch(err => setIsLoading(false))
    }

    const handleFilter = () => {
        const usersId = filterOptions.selectedUsers.map(item => item.value).toString()
        const automationsId = filterOptions.selectedAutomations.map(item => item.value).toString();
        const date = filterOptions.dateFrom ?
            localStorage.getItem("lang") == 'fa' ?
                filterOptions.dateFrom.format('YYYY-MM-DD')
                : moment(filterOptions.dateFrom).locale("en").format("YYYY-MM-DD")
            : null;
        const notificationType = filterOptions.selectedAutomationType ? filterOptions.selectedAutomationType.value : null

        setPrevFilterOptions(filterOptions);

        getActivities(null, notificationType, automationsId, date, usersId, null)
            .then(res => {
                setList(res.results)
                setNextPage(res?.next ? res?.next.replace('http', 'https') : null)
                setPrevPage(res?.previous ? res?.previous.replace('http', 'https') : null)
                setIsShowFilter(false)
            }).catch(err => console.log(err))
    }

    const handleChangeUser = items => {
        setFilterOptions({ ...filterOptions, selectedUsers: items })
    }

    const handleChangeAutomationType = item => {
        setFilterOptions({ ...filterOptions, selectedAutomationType: item })
    }

    const handleChangeAutomations = items => {
        setFilterOptions({ ...filterOptions, selectedAutomations: items })
    }

    const checkAutomationItems = () => {
        let result = false;
        let filterAutomationItemsIds = filterOptions.selectedAutomations.map(item => item.value)
        if (prevFilterOptions.selectedAutomations.length !== filterOptions.selectedAutomations.length) {
            result = false
        } else {
            result = handleCheckAutomation(filterAutomationItemsIds)
        }
        return result;
    }

    const handleCheckAutomation = (filterAutomationItemsIds) => {
        const res = prevFilterOptions.selectedAutomations.map(item => filterAutomationItemsIds.some(el => item.value === el))
        return !res.some(item => item === false);
    }

    const isFilterOptionsChanged = () => {
        if (filterOptions.selectedAutomationType === null && filterOptions.selectedUsers.length === 0 && filterOptions.selectedAutomations.length === 0 && filterOptions.dateFrom === null && prevFilterOptions.selectedAutomationType === null && prevFilterOptions.selectedUsers.length === 0 && prevFilterOptions.selectedAutomations.length === 0 && prevFilterOptions.dateFrom === null) {
            return false
        } else return !(prevFilterOptions.selectedAutomationType?.value !== filterOptions.selectedAutomationType?.value || prevFilterOptions.dateFrom !== filterOptions.dateFrom || !checkAutomationItems() || !checkSelectedUser());
    }

    const checkSelectedUser = () => {
        let result = false;
        let filterSelectedUserIds = filterOptions.selectedUsers.map(item => item.value);
        if (prevFilterOptions?.selectedUsers.length !== filterOptions.selectedUsers.length) {
            result = false;
        } else {
            result = handleCheckUser(filterSelectedUserIds)
        }

        return result;
    }

    const handleCheckUser = (filterSelectedUserIds) => {
        const res = prevFilterOptions.selectedUsers.map(item => filterSelectedUserIds.some(el => item.value === el))
        return !res.some(item => item === false);
    }

    const resetFilter = () => {
        setFilterOptions({ selectedUsers: [], selectedAutomations: [], selectedAutomationType: null, dateFrom: null })
        setPrevFilterOptions({ selectedUsers: [], selectedAutomations: [], selectedAutomationType: null, dateFrom: null })
        loadActivities()
        setIsShowFilter(false);
    }
    return (
        <>
            <div className={`row px-2 border-bottom ${isMobile ? "pb-4 pt-2" : "py-4"}`}>
                <div className="col-12 d-flex justify-content-between  align-items-center">
                    <div className="d-flex  align-items-center font-weight-bold text-dark">
                        {t("text.activities")}
                    </div>
                    <div className="d-flex align-items-center">
                        <i className={`icon icon-24 icon-filter cursor-pointer ml-3 ${isFilter ? "circle-filter" : ""}`} onClick={handleShowFilter} />
                        <i
                            className="icon icon-24 icon-close cursor-pointer"
                            onClick={handleCloseModal}
                        />
                    </div>
                </div>
            </div>
            <div className="notification-list" onScroll={handleScroll}>

                {list?.map((item) => (
                    <ActivityItem key={item?.id} item={item} />
                ))}


                {isLoading && <p className="text-center text-primary font-weight-bold mt-3"><span className="indicator-left indicator-right">{t("text.communicate")}</span></p>}

                {/*{error && <p className="text-center text-primary font-weight-bold mt-3"><span className="indicator-left indicator-right">خطا در برقراری ارتباط با سرور</span></p>}*/}

                {
                    !nextPage && <div className="d-flex justify-content-center text-primary font-weight-bold mt-3">
                        <span className="end-notification-list font-400 font-size-12 indicator-left indicator-right">{t("text.Endactivities")}</span>
                    </div>
                }
            </div>

            <Modal
                isOpen={isShowFilter}
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
                    {
                        userLoggedIn?.can_control && (
                            <div className="form-group">
                                <label htmlFor="name">{t("text.User")}</label>
                                <MultiSelect
                                    options={users}
                                    value={filterOptions.selectedUsers}
                                    hasSelectAll={false}
                                    disableSearch={true}
                                    ArrowRenderer={ArrowRenderer}
                                    onChange={handleChangeUser}
                                    labelledBy={t("text.Select")}
                                    overrideStrings={{
                                        "noOptions": `${t("text.Thereisnodata")}`,
                                        "search": `${t("text.search")}`,
                                        "selectSomeItems": `${t("text.Select")}`,
                                        "allItemsAreSelected": `${t("text.Allitemsselected")}`
                                    }}
                                />
                            </div>
                        )
                    }
                    <div className="form-group mt-12px">
                        <label htmlFor="name">{t("text.Typeautomation")}</label>
                        <ReactSelect
                            options={automationTypes}
                            value={filterOptions.selectedAutomationType}
                            onChange={handleChangeAutomationType}
                            placeholder={t("text.Select")}
                            mobileMode={true}
                            className="autoCompeletSelect "
                        />
                    </div>

                    <div className="form-group mt-12px">
                        <label htmlFor="name">{t("text.automation")}</label>
                        <MultiSelect
                            options={automations}
                            value={filterOptions.selectedAutomations}
                            hasSelectAll={false}
                            disableSearch={true}
                            ArrowRenderer={ArrowRenderer}
                            onChange={handleChangeAutomations}
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
                                    setFilterOptions({ ...filterOptions, dateFrom: value })
                                }}
                                refDatePicker={dateFromEl}
                                value={filterOptions.dateFrom}
                            />
                            :
                            <DatePicker_
                                selected={filterOptions.dateFrom}
                                onChange={value => setFilterOptions({ ...filterOptions, dateFrom: value })
                                }
                                className="report-calendar-Container form-control p-date-picker"
                            />
                        }
                    </div>

                    <div className="d-flex form-group my-4 ">
                        {
                            isFilterOptionsChanged() ? <Button
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
    )
}

export default Activity