import React from "react";
import {DatePicker} from "react-persian-datepicker";

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

const CustomDatePicker = ({value, max, refDatePicker, onChange}) => {

    const handleChange = (value) => {
        onChange && onChange(value)
    }

    return (
        <div className="position-relative">
            <DatePicker
                calendarStyles={styles}
                inputFormat="jYYYY/jM/jD"
                className="report-calendar-Container form-control "
                value={value}
                closeOnSelect={true}
                max={max}
                ref={refDatePicker}
                beforeShowDay={true}
                onChange={value => handleChange(value)}
            />

            <div class="position-absolute datepicker-input-clear cursor-pointer" onClick={() => handleChange(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px">
                    <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
                </svg>
            </div>
        </div>
    )
}

export default CustomDatePicker;