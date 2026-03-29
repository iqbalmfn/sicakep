import clsx from "clsx";
import React from "react";

const FormTextarea = ({ isError = false, ...props }) => {
    return (
        <textarea
            className={clsx(
                isError
                    ? "border-red-700 focus:border-red-700 text-red-500"
                    : "border-white/20 text-slate-100",
                "placeholder-slate-500 bg-slate-900/40 backdrop-blur-xl shadow-lg focus:border-primary outline-1 focus:outline-none text-sm w-full disabled:bg-slate-800 disabled:text-slate-400 rounded-lg"
            )}
            {...props}
        />
    );
};

export default FormTextarea;
