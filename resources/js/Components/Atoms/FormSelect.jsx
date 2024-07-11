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
                isError ? "border-red-700" : null,
                "rounded-lg border-gray-200 focus:border-primary outline-1 focus:outline-none text-sm disabled:bg-gray-100"
            )}
            {...props}
        >
            {children}
        </select>
    );
};

export default FormSelect;
