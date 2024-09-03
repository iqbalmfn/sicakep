import clsx from "clsx";

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
        <div className="relative border flex items-center rounded-lg w-full bg-white">
            {prefix && (
                <div
                    className={clsx(
                        "border-r flex items-center justify-center px-3 overflow-hidden",
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
                    "rounded-lg border-none border-gray-200 focus:border-primary outline-1 focus:outline-none text-sm",
                    prefix ? "pl-3 rounded-e-lg" : suffix ? "pe-3 rounded-s-lg" : "rounded-lg"
                )}
                {...props}
            >
                {children}
            </select>
        </div>
    );
};

export default FormSelectPrefix;
