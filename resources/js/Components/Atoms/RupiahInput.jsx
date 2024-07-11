import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";

function RupiahInput(props) {
    const formatRupiah = (amount) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
        return formatter.format(amount || 0).split(',')[0];
    }
    const [displayValue, setDisplayValue] = useState(formatRupiah(props.value));

    useEffect(() => {
        setDisplayValue(formatRupiah(props.value));
    }, [props.value]);


    const handleInputChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // menghapus semua karakter selain angka
        props.onChange && props.onChange(value); // memanggil fungsi onChange yang dilewatkan sebagai props
        setDisplayValue(formatRupiah(value));
    }

    return (
        <FormInput
            type="text"
            size={props.size}
            name={props.name}
            value={displayValue}
            onChange={handleInputChange}
            required={props.required}
            readOnly={props.readOnly}
            isError={props.isError}
            disabled={props.disabled}
        />
    );
}

export default RupiahInput;
