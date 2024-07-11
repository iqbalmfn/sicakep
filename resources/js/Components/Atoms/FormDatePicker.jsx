import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormDatePicker = ({
    defaultValue = null,
    name,
    placeholder,
    onChange,
}) => {
    const [startDate, setStartDate] = useState(defaultValue);

    useEffect(() => {
        onChange(name, startDate);
    }, [startDate]);
    return (
        <ReactDatePicker
            className="border-gray-200 placeholder-gray-400 focus:border-primary outline-1 focus:outline-none text-sm w-full pe-3 rounded-lg"
            placeholderText={placeholder}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
        />
    );
};

export default FormDatePicker;
