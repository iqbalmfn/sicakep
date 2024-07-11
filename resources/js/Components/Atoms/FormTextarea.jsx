import clsx from "clsx";
import React from "react";

const FormTextarea = ({ isError = false, ...props }) => {
    return (
        <textarea
            className={clsx(
                isError
                    ? "border-red-700 focus:border-red-700"
                    : "border-gray-200",
                "placeholder-gray-400 focus:border-primary outline-1 focus:outline-none text-sm w-full disabled:bg-gray-100 rounded-lg"
            )}
            {...props}
        />
    );
};

export default FormTextarea;
