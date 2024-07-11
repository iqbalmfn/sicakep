import clsx from "clsx";

const FormCheckbox = ({
    type = "checkbox",
    size = "md",
    isError = false,
    className,
    ...props
}) => {
    let paddingY;
    if (size === "md") {
        paddingY = "w-[20px] h-[20px]";
    } else if (size === "sm") {
        paddingY = "h-[15px] h-[15px]";
    } else {
        paddingY = "w-[25px] h-[25px]";
    }
    return (
        <input
            type={type}
            className={clsx(
                className,
                paddingY,
                isError ? "border-red-700 focus:border-red-700" : null,
                "rounded border-gray-300 placeholder-gray-400 focus:ring-0 checked:text-primary text-sm disabled:disabled disabled:border-gray-200 cursor-pointer"
            )}
            {...props}
        />
    );
};

export default FormCheckbox;
