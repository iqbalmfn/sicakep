import clsx from "clsx";

const FormInput = ({
    type = "text",
    size = "md",
    isError = false,
    prefix = null,
    suffix = null,
    className,
    ...props
}) => {
    let paddingY;
    let fontSize = "text-sm";
    if (size === "xs") {
        paddingY = "h-[32px]";
        fontSize = "text-xs";
    } else if (size === "md") {
        paddingY = "h-[45px]";
    } else if (size === "sm") {
        paddingY = "h-[38px] pt-2";
    } else {
        paddingY = "h-[55px]";
    }

    return (
        <div className="relative flex items-center border border-white/20 rounded-lg w-full bg-slate-900/40 backdrop-blur-xl shadow-lg">
            {prefix && (
                <div
                    className={clsx(
                        "border-r border-white/20 flex items-center justify-center px-3 text-slate-300",
                        size === "sm" ? "pb-2" : "pb-0",
                        paddingY
                    )}
                >
                    {prefix}
                </div>
            )}
            <input
                type={type}
                className={clsx(
                    className,
                    paddingY,
                    fontSize,
                    isError
                        ? "border-red-700 focus:border-red-700 text-red-500"
                        : "border-transparent text-slate-100",
                    "placeholder-slate-500 bg-transparent focus:border-primary outline-1 focus:outline-none w-full disabled:bg-slate-800 disabled:text-slate-400 disabled:border-white/10",
                    prefix ? "pl-3 rounded-e-lg" : suffix ? "pe-3 rounded-s-lg" : "rounded-lg"
                )}
                {...props}
            />
            {suffix && (
                <div
                    className={clsx(
                        size == "sm" ? "pb-2" : "pb-0",
                        "border-l border-white/20 flex items-center justify-center px-3 text-slate-300",
                        paddingY
                    )}
                >
                    {suffix}
                </div>
            )}
        </div>
    );
};

export default FormInput;
