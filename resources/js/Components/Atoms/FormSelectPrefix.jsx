import clsx from "clsx";
import React from "react";

const FormSelectPrefix = ({
    type = "text",
    size = "md",
    isError = false,
    className,
    children,
    prefix = null,
    suffix = null,
    ...props
}) => {
    let paddingY;
    if (size === "md") {
        paddingY = "h-[45px]";
    } else if (size === "sm") {
        paddingY = "h-[38px] pt-2";
    } else {
        paddingY = "h-[55px]";
    }
    return (
        <div className="relative border border-white/20 flex items-center rounded-lg w-full bg-slate-900/40 backdrop-blur-xl text-slate-100 shadow-lg">
            {prefix && (
                <div
                    className={clsx(
                        "border-r border-white/20 flex items-center justify-center px-3 overflow-hidden text-slate-300",
                        size === "md" ? "pb-2" : "pb-2",
                        paddingY
                    )}
                >
                    {prefix}
                </div>
            )}
            <select
                type={type}
                className={clsx(
                    className,
                    paddingY,
                    isError ? "border-red-700" : null,
                    "rounded-lg border-none bg-transparent focus:border-primary outline-1 focus:outline-none text-sm text-slate-100",
                    prefix ? "pl-3 rounded-e-lg" : suffix ? "pe-3 rounded-s-lg" : "rounded-lg"
                )}
                {...props}
            >
                {/* Setting fallback text styles inside options so it's readable when expanded by browser */}
                {React.Children.map(children, child => {
                    if (React.isValidElement(child) && child.type === "option") {
                        return React.cloneElement(child, { className: "text-slate-800 bg-white" });
                    }
                    return child;
                })}
            </select>
        </div>
    );
};

export default FormSelectPrefix;
