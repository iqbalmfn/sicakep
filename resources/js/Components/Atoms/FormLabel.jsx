import clsx from "clsx";
import React from "react";

const FormLabel = ({ htmlFor, name, required = false, className }) => {
    return (
        <label
            htmlFor={htmlFor}
            className={clsx(required && "required-label", "text-slate-300 font-medium text-sm tracking-wide mb-1 inline-block", className)}
        >
            {name}
        </label>
    );
};

export default FormLabel;
