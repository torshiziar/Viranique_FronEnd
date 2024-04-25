import React, { useEffect, useState, useRef } from "react";
import moment from "moment-jalaali";
import ReactSelect from '../../components/Select/Select';
import { DatePicker } from "react-persian-datepicker";
import { getChart, getDeviceType, getSensors } from "../../services/api";
import MultiSelect from "react-multi-select-component";
import { isMobile } from "react-device-detect";
import Button from "../../components/Button/Button";
import HighChart from "../../components/ChartView/HighChart";
import { sensorToList } from "../../utils/toList";
import GrafanaChart from "../../components/GrafanaChart/GrafanaChart";
import axios from 'axios';
import { generateNameGrafanaChart } from "../../utils/generateNameGrafanaChart";
import { generateChartGrafana } from "../../utils/generateChartGrafana";
import { useTranslation } from "react-i18next";
import DatePicker_ from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

let time = moment().utcOffset(0);
time.set({ hour: 0, minute: 0, second: 1, millisecond: 0 })


const HistoryData = () => {
    const { t } = useTranslation();
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedPrediction, setSelectedPrediction] = useState(null);
    const [sensors, setSensors] = useState([]);
    const [selectedSensor, setSelectedSensor] = useState([])
    const [dateFrom, setDateFrom] = useState(time);
    const [dateFromen, setDateFromen] = useState(new Date());
    const [dateTo, setDateTo] = useState(moment());
    const [dateToen, setDateToen] = useState(new Date());
    // const dateFromEl = useRef(null);gh comment
    // const dateToEl = useRef(null);gh
    const [dataChart, setDataChart] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isValidationForm, setIsValidationForm] = useState(false);
    const [unit, setUnit] = useState(null);
    const [counter, setCounter] = useState(0);
    const [key, setKey] = useState(1001);
    const [addChart, setAddChart] = useState([]);
    const [object_static, setObject_static] = useState([null]);
    const [chartOld, setChartOld] = useState(false); //for test mr kharazi
    const [buttonName, setButtonName] = useState('text.show')
    const [dataEditGrafana, setDataEditGrafana] = useState(null)

    const predictionList = [
        { value: 0, label: "بدون پیش بینی" },
        { value: 1, label: "1%" },
        { value: 2, label: "2%" },
        { value: 3, label: "3%" },
        { value: 4, label: "4%" },
        { value: 5, label: "5%" },
        { value: 6, label: "6%" },
        { value: 7, label: "7%" },
        { value: 8, label: "8%" },
        { value: 9, label: "9%" },
        { value: 10, label: "10%" }
    ]

    useEffect(() => {
        for (let i = 0; i <= 20; i++)
            localStorage.removeItem(`grafana${i}`)
    }, [])

    useEffect(() => {
        if (addChart.length == 0) {
            for (let i = 0; i <= 20; i++)
                localStorage.removeItem(`grafana${i}`)
        }
    }, [addChart])

    useEffect(() => {
        deviceType();
        setObject_static([
            { type_sensor: 'Air Humidity', select_sensor: 'VMN-A01-01-0003', panelId: 3, url: "http://185.252.28.42:3000/d-solo/pWV4-Y7Ik/vnm-a01-01-003?orgId=1" },
            { type_sensor: 'Air Temperature', select_sensor: 'VMN-A01-01-0003', panelId: 7, url: "http://185.252.28.42:3000/d-solo/pWV4-Y7Ik/vnm-a01-01-003?orgId=1" },
            { type_sensor: 'Light', select_sensor: 'VMN-A01-01-0003', panelId: 4, url: "http://185.252.28.42:3000/d-solo/pWV4-Y7Ik/vnm-a01-01-003?orgId=1" },
            { type_sensor: 'Soil Moisture', select_sensor: 'VMN-A01-01-0003', panelId: 5, url: "http://185.252.28.42:3000/d-solo/pWV4-Y7Ik/vnm-a01-01-003?orgId=1" },
            { type_sensor: 'Soil Temperature', select_sensor: 'VMN-A01-01-0003', panelId: 6, url: "http://185.252.28.42:3000/d-solo/pWV4-Y7Ik/vnm-a01-01-003?orgId=1" },
            { type_sensor: 'CO2', select_sensor: 'VMN-A01-01-0003', panelId: 2, url: "http://185.252.28.42:3000/d-solo/pWV4-Y7Ik/vnm-a01-01-003?orgId=1" },
            { type_sensor: 'Leaf Moisture', select_sensor: 'VMN-A01-01-0006', panelId: 2, url: "http://185.252.28.42:3000/d-solo/SXv5Y0nSk/vnm-a01-01-0006?orgId=1" },
            { type_sensor: 'Leaf Temperature', select_sensor: 'VMN-A01-01-0006', panelId: 3, url: "http://185.252.28.42:3000/d-solo/SXv5Y0nSk/vnm-a01-01-0006?orgId=1" },
            { type_sensor: 'WaterPH', select_sensor: 'VMN-A01-01-0012', panelId: 5, url: "http://185.252.28.42:3000/d-solo/QDWr8ZHSk/vmn-a01-01-0012?orgId=1" },
            { type_sensor: 'WaterTemperature', select_sensor: 'VMN-A01-01-0012', panelId: 6, url: "http://185.252.28.42:3000/d-solo/QDWr8ZHSk/vmn-a01-01-0012?orgId=1" },
            { type_sensor: 'Air Temperature', select_sensor: 'VMN-A01-01-0013', panelId: 6, url: "http://185.252.28.42:3000/d-solo/QDWr8ZHSk/vmn-a01-01-0012?orgId=1" },
            { type_sensor: 'Air Humidity', select_sensor: 'VMN-A01-01-0013', panelId: 6, url: "http://185.252.28.42:3000/d-solo/QDWr8ZHSk/vmn-a01-01-0012?orgId=1" },
            { type_sensor: 'Light', select_sensor: 'VMN-A01-01-0013', panelId: 6, url: "http://185.252.28.42:3000/d-solo/QDWr8ZHSk/vmn-a01-01-0012?orgId=1" },
            //در این آبجکت آیتم های پنل آی دی و یو آر ال دیگر کاربرد ندارد برای تست گذاشته بودم
            // فقط آیتم هایی که داخل این آبجکت است نمودارها آن ها را با گرافانا نمایش می دهد غیر از این موارد نمودارهای قبلی را نمایش میدهد.

        ])/////gh new
    }, []);

    useEffect(() => {
        setSensors([])
        setSelectedSensor([]);
        if (selectedDevice?.value) {
            getSensors(selectedDevice?.value).then(res => {
                setSensors(sensorToList(res))
                if (res[0].type?.default_unit) {
                    setUnit(res[0].type?.default_unit);
                }
            }).catch(err => console.log(err))
        }
    }, [selectedDevice]);


    useEffect(() => {
        if ((selectedDevice !== null && selectedSensor?.length > 0) || dataEditGrafana == ! null) {
            setIsValidationForm(true)
        } else {
            setIsValidationForm(false)
        }
    }, [selectedDevice, selectedSensor, dataEditGrafana])

    // useEffect(() => { //gh comment
    //     if (dateFromEl.current.refs.input.readOnly) {
    //         dateFromEl.current.refs.input.readOnly = true;
    //         dateFromEl.current.refs.input.style.backgroundColor = "unset";
    //     }
    // }, []) gh comment

    const deviceType = () => {
        getDeviceType().then(res => {
            setDevices(deviceToList(res));
        }).catch(err => {
            console.log(err)
        })
    }

    const ArrowRenderer = ({ expanded }) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9L12 15L18 9" stroke="#646464" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
        ;

    const deviceToList = res => {
        return res.map(item => {
            return { value: item.id, label: item.title }
        })
    }
    function getGrafana(data) {
        return axios.get('https://angizeh.iotstream.ir/dashboard/get_panel/',
            {
                headers: {
                    'data': JSON.stringify(data),
                    "API-Key": "Bearer glsa_ezsnxe4VvYfrblwtlzcE04tFIdMJ187k_d3f31b19"
                }
            }
        )
            .then(res => {
                return res;
            })
            .catch(err => {
                return Promise.reject(err);
            })
    }

    const loadChart = async () => {
        let dataGrafana = {};
        setIsLoading(true)
        const param = {
            sensor_type: selectedDevice.value,
            sensor_list: selectedSensor.map(item => item.value),
            start_time: dateFrom.format("YYYY-MM-DD HH:mm:ss"),
            stop_time: dateTo.format("YYYY-MM-DD HH:mm:ss")
        }
        await getChart(param).then(res => {
            setDataChart(res.data.responses)
            dataGrafana = { _measurement: res.data._measurement, gateway: res.data.gateway }
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
        let start_time_, stop_time_;
        stop_time_ = new Date(dateTo.format("YYYY-MM-DD 12:00:00")).getTime();
        if (localStorage.getItem("i18nextLng") == 'fa') { //for detect en or fa
            start_time_ = new Date(dateFrom.format("YYYY-MM-DD 00:00:00")).getTime();
            stop_time_ = new Date(dateTo.format("YYYY-MM-DD 12:00:00")).getTime();
        }
        else {
        start_time_ =(new Date(moment(dateFromen).locale('en').format('YYYY-MM-DD 00:00:00')).getTime())//gh
        stop_time_ =(new Date(moment(dateToen).locale('en').format('YYYY-MM-DD 12:00:00')).getTime())//gh
            // start_time_ = (dateFromen).getTime();gh
            // stop_time_ = (dateToen).getTime();gh
        }
        let sensor_type_ = selectedDevice.label;
        let selectedDevice_ = selectedSensor.map(item => item.item.part_number)
        let Name = selectedSensor.map(item => item.item.title)
        let paramGrafana = [{}];
        let step ,stop_time_prediction;
        if(selectedPrediction && selectedPrediction?.value !==0 ){
            let percent = parseInt(selectedPrediction.label)
            const diffTime = Math.abs(stop_time_ - start_time_);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            console.log("diffDays:",diffDays , diffDays*percent/100)
            console.log("jjjj",Math.ceil(diffDays*percent/100))

            // var myDate = "26-02-2012";
            // myDate = myDate.split("-");
            // var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
            // console.log(newDate.getTime());
            console.log("stop_time_:",stop_time_);
            step = (Math.ceil(diffDays*percent/100));
            stop_time_prediction =  (stop_time_ + ((step*3)*60 * 60 * 1000)) // این عدد سه رو بک اند گفت ثابت ضرب میکنیم برای پیش بینی تا سه برابره فعلا

        }
        const found = object_static.find(obj => {
            return (obj.type_sensor == sensor_type_ && obj.select_sensor == selectedDevice_)
        });
        console.log(selectedPrediction,"selectedPrediction")
        let resApiGrafana;

        if (dataEditGrafana == null) {
            paramGrafana = [{
                "title": `${selectedDevice_.toString()}`,
                "type": `${dataGrafana._measurement}`,
                "gateway": `${dataGrafana.gateway}`,
                "name": encodeURIComponent(Name.toString()), //generateNameGrafanaChart(Name.toString()), ارسال واحد اندازه گیری
                "prediction":(selectedPrediction !== null &&  selectedPrediction?.value !== 0) ? true : false, // برای محدوده پیش بینی این دو مورد رو ارسال کنم بعدا که بک اند تایید کرد
                "step":(selectedPrediction !== null &&  selectedPrediction?.value !== 0)? step :null

            }]

        }
        else {
            let data_ = localStorage.getItem(`grafana${dataEditGrafana.counter}`);
            paramGrafana = JSON.parse(data_).concat({
                "title": selectedDevice_.toString(),
                "type": `${dataGrafana._measurement}`,
                "gateway": `${dataGrafana.gateway}`,
                "name": encodeURIComponent(Name.toString()), // generateNameGrafanaChart(Name.toString()), ارسال واحد اندازه گیری

            });
        }
        await getGrafana(paramGrafana).then((res) => {
            resApiGrafana = res.data
        })
            .catch((err) => {
                console.log(err);
            });
        found ?
            (dataEditGrafana == null ? ((setAddChart(addChart.concat(<GrafanaChart start_time_={start_time_} stop_time_={stop_time_prediction ? stop_time_prediction : stop_time_} panelId={resApiGrafana?.panelId} uid={resApiGrafana?.uid} closeChart={handleCloseGrafanaChart} counter={counter} key={counter} sensor_type_={sensor_type_} selectedDevice_={selectedDevice_} editChart={handleEditGrafanaChart} gateway={dataGrafana.gateway} _measurement={dataGrafana._measurement} Name={Name} />)),
                setCounter(counter + 1))
            ) :
                // (addChart[dataEditGrafana.counter] = <GrafanaChart start_time_={start_time_} stop_time_={stop_time_} panelId={resApiGrafana?.panelId} uid={resApiGrafana?.uid} closeChart={handleCloseGrafanaChart} counter={dataEditGrafana.counter} key={key} sensor_type_={sensor_type_} selectedDevice_={selectedDevice_} editChart={handleEditGrafanaChart} gateway={dataGrafana.gateway} _measurement={dataGrafana._measurement} Name={Name} />,
                (addChart[generateChartGrafana(addChart, dataEditGrafana)] = <GrafanaChart start_time_={start_time_} stop_time_={stop_time_prediction ? stop_time_prediction :stop_time_} panelId={resApiGrafana?.panelId} uid={resApiGrafana?.uid} closeChart={handleCloseGrafanaChart} counter={dataEditGrafana.counter} key={key} sensor_type_={sensor_type_} selectedDevice_={selectedDevice_} editChart={handleEditGrafanaChart} gateway={dataGrafana.gateway} _measurement={dataGrafana._measurement} Name={Name} />,
                    setKey(key + 1),
                    setAddChart(addChart))
                , setChartOld(false))
            : setChartOld(true);  ///for api

        setButtonName("text.show");
        setDataEditGrafana(null);
        document.querySelector(".wrapChartGrafana").classList.remove('editable')


    }

    const handleCloseGrafanaChart = (data) => {
        setAddChart((addChart) => addChart.filter((item, index) => item.props.counter != data));
    }


    const handleEditGrafanaChart = (panelId, sensor_type_, selectedDevice_, Name, counter, gateway, _measurement, uid) => {
        let grafana = localStorage.getItem(`grafana${counter}`)
        if (grafana) {
            grafana = (JSON.parse(grafana)).concat({ type: _measurement, gateway, title: selectedDevice_.toString(), name: encodeURIComponent(Name.toString()) })
            localStorage.setItem(`grafana${counter}`, JSON.stringify(grafana))

        }
        else
            localStorage.setItem(`grafana${counter}`, JSON.stringify([{ type: _measurement, gateway, title: selectedDevice_.toString(), name: encodeURIComponent(Name.toString()) }]))
        setButtonName("text.add")

        setDataEditGrafana({
            panelId, sensor_type_, selectedDevice_, counter, uid
        })

    }

    const cancelAddChart = () => {
        for (let i = 0; i < document.querySelector(".wrapChartGrafana").childNodes.length; i++) {
            console.log(document.querySelector(".wrapChartGrafana").childNodes[i].childNodes[0].childNodes[0].classList.remove("bg-warning"))
            document.querySelector(".wrapChartGrafana").childNodes[i].childNodes[0].childNodes[0].classList.remove("disable");
        }
        document.querySelector(".wrapChartGrafana").classList.remove('editable');
        console.log(JSON.parse(localStorage.getItem(`grafana${dataEditGrafana.counter}`)))
        let a = JSON.parse(localStorage.getItem(`grafana${dataEditGrafana.counter}`));
        console.log(a.pop());
        localStorage.setItem(`grafana${dataEditGrafana.counter}`, JSON.stringify(a))
        setDataEditGrafana(null);
        setButtonName("text.show");
    }
    return (
        <div className={`overflow-auto height-user-custom px-30px mx--15px mt--15px pt-15px`}>
            <section className="row card card-box">
                <div className={`col-12 pt-4 pb-32px px-32px`}>
                    <div className={`row ${isMobile ? "flex-column" : "align-items-end"}`}>
                        <div className={`col-lg-12 col-md-12 col-xl-6 col-sm-12 d-flex ${isMobile ? "flex-column" : ""}`}>
                            <div className={`historyDateSelectBox form-group flex-grow-1 ${isMobile ? "" : "ml-4 mb-0"}`}>
                                <label htmlFor="provinceSelected" className="required mb-1">{t("text.sensortype")}</label>
                                <ReactSelect
                                    className="autoCompeletSelect "
                                    value={selectedDevice}
                                    onChange={setSelectedDevice}
                                    options={devices}
                                    mobileMode={true}
                                    placeholder={t("text.Select")} />
                            </div>
                            <div className={`form-group flex-grow-1 ${isMobile ? "mt-1" : "mb-0"}`}>
                                <label htmlFor="parameter" className="required mb-1">{t("text.Sensorselection")}</label>
                                <MultiSelect
                                    options={sensors}
                                    value={selectedSensor}
                                    hasSelectAll={false}
                                    disableSearch={true}
                                    ArrowRenderer={ArrowRenderer}
                                    onChange={setSelectedSensor}
                                    labelledBy={t("text.Select")}
                                    overrideStrings={{
                                        "noOptions": `${t("text.Thereisnodata")}`,
                                        "search": `${t("text.search")}`,
                                        "selectSomeItems": `${t("text.Select")}`,
                                        "allItemsAreSelected": `${t("text.Allitemsselected")}`
                                    }}
                                />
                            </div>
                        </div>
                        <div className={`col-lg-12 col-md-12 col-xl-2 col-sm-12 d-flex ${isMobile ? "flex-column" : ""}`}>
                            <div className={`historyDateSelectBox form-group flex-grow-1 ${isMobile ? "" : "ml-4 mb-0"}`}>
                                <label htmlFor="provinceSelected" className=" mb-1">{t("text.prediction")}</label>
                                <ReactSelect
                                    className="autoCompeletSelect "
                                    value={selectedPrediction}
                                    onChange={setSelectedPrediction}
                                    options={predictionList}
                                    mobileMode={true}
                                    placeholder={t("text.Select")} />
                            </div>
                            </div>
                        <div className={`col-lg-12 col-md-12 col-xl-4  col-sm-12 d-flex align-items-end ${isMobile ? "flex-wrap" : ""}`}>
                            <div className={`d-flex w-100 ${isMobile ? "col-12 mt-1 p-0" : ""}`}>
                                <div className={`form-group w-50 ${isMobile ? "ml-2" : "ml-3 mb-0"}`}>
                                    <label htmlFor="dateFrom" className="ml-3 mb-1">{t("text.startdate")}</label>
                                    {localStorage.getItem("i18nextLng") == 'fa' ? //for detect pertion or english
                                        <DatePicker
                                            calendarStyles={styles}
                                            inputFormat="jYYYY/jM/jD"
                                            className="report-calendar-Container form-control p-date-picker"
                                            value={dateFrom}
                                            closeOnSelect={true}
                                            max={tomorrowDate}
                                            // ref={dateFromEl} gh
                                            beforeShowDay={true}
                                            onChange={value => {
                                                // dateFromEl.current.state.isOpen = false; gh
                                                setDateFrom(value);
                                            }}
                                        /> :
                                        <DatePicker_
                                            selected={dateFromen}
                                            onChange={value => setDateFromen(value)
                                            }
                                            className="report-calendar-Container form-control p-date-picker"
                                        />
                                    }
                                    <i className="icon icon-24 icon-calendar  left-12px" />
                                </div>
                                <div className={`form-group w-50 ${isMobile ? "mr-2" : "ml-32px mb-0"}`}>
                                    <label htmlFor="dateTo" className="ml-3 mb-1">{t("text.enddate")}</label>
                                    {localStorage.getItem("i18nextLng") == 'fa' ? //for detect pertion or english
                                        <DatePicker
                                            calendarStyles={styles}
                                            inputFormat="jYYYY/jM/jD"
                                            className="report-calendar-Container form-control p-date-picker"
                                            value={dateTo}
                                            closeOnSelect={true}
                                            max={tomorrowDate}
                                            // ref={dateToEl}
                                            beforeShowDay={false}
                                            onChange={value => {
                                                // dateToEl.current.state.isOpen = false;  gh
                                                setDateTo(value);
                                            }}
                                        />
                                        :
                                        <DatePicker_
                                            selected={dateToen}
                                            onChange={value => setDateToen(value)
                                            }
                                            className="report-calendar-Container form-control p-date-picker"
                                        />
                                    }
                                    <i className="icon icon-24 icon-calendar left-12px" />
                                </div>
                            </div>
                           

                            <Button
                                className={`button btn-primary-fill d-flex align-items-center justify-content-center py-2 px-xl-5 px-lg-4 px-4 mr-auto ${!isValidationForm ? "disabled" : ""}`}
                                handler={loadChart}
                                isLoading={isLoading}
                            >
                                {t(buttonName)}
                                {/* {buttonName} */}
                            </Button>
                            {dataEditGrafana &&
                                <Button
                                    className={`button btn-primary-fill d-flex align-items-center justify-content-center py-2 px-xl-5 px-lg-4 px-4 mx-2 ${!isValidationForm ? "disabled" : ""}`}
                                    handler={cancelAddChart}
                                    isLoading={isLoading}
                                >
                                    {t('text.cancel')}
                                </Button>

                            }
                        </div>
                    </div>
                </div>

            </section>
            {!chartOld ?
                <section className="row mt-3 wrapChartGrafana" style={{ position: 'relative' }}>
                    {addChart}
                </section>
                : <section className="row card mt-3">
                    <div className="col-12">
                        {
                            dataChart && <HighChart data={dataChart} sensors={selectedSensor} unit={unit || ""} />
                        }

                    </div>
                </section>
            }
        </div>
    );
};

export default HistoryData;