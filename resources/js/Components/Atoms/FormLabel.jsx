import clsx from "clsx";
import React from "react";

const FormLabel = ({ htmlFor, name, required = false, className }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={clsx(required && "required-label", className)}
        >
            {name}
        </label>
    );
};

export default FormLabel;
