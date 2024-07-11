import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormDateRangePicker = ({
    defaultValue = [null, null],
    name,
    placeholder,
    onChange,
}) => {
    const [dateRange, setDateRange] = useState(defaultValue);
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        onChange(name, dateRange);
    }, [dateRange]);
    return (
        <ReactDatePicker
            className="border-gray-200 placeholder-gray-400 focus:border-primary outline-1 focus:outline-none text-sm w-full pe-3 rounded-lg"
            placeholderText={placeholder}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
                setDateRange(update);
            }}
            isClearable={true}
        />
    );
};

export default FormDateRangePicker;
