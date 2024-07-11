import clsx from "clsx";

const FormFile = ({
    type = "file",
    size = "md",
    isError = false,
    className,
    ...props
}) => {
    let paddingY;
    if (size === "md") {
        paddingY = "h-[45px]";
    } else if (size === "sm") {
        paddingY = "h-[38px] pt-1 ps-2";
    } else {
        paddingY = "h-[55px]";
    }
    return (
        <input
            type={type}
            className={clsx(
                className,
                paddingY,
                isError ? "border-red-700 focus:border-red-700" : "border-gray-200",
                "rounded-lg border placeholder-gray-400 focus:border-primary outline-1 focus:outline-none text-sm w-full"
            )}
            {...props}
        />
    );
};

export default FormFile;
