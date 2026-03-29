import clsx from "clsx";

const FormSelect = ({
    type = "text",
    size = "md",
    isError = false,
    className,
    children,
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
        <select
            type={type}
            className={clsx(
                className,
                paddingY,
                isError ? "border-red-700 text-red-500" : "border-white/20 text-slate-100",
                "rounded-lg bg-slate-900/40 backdrop-blur-xl shadow-lg focus:border-primary outline-1 focus:outline-none text-sm disabled:bg-slate-800 disabled:text-slate-400 disabled:border-white/10 w-full [&>option]:bg-slate-800 [&>option]:text-slate-200"
            )}
            {...props}
        >
            {children}
        </select>
    );
};

export default FormSelect;
