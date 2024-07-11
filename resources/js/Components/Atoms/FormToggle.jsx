import clsx from "clsx";

const FormToggle = ({
    notCheck = "gray-200",
    variant = "primary",
    className,
    disabled = false,
    ...props
}) => {
    return (
        <label
            className={clsx(
                disabled ? "disabled" : null,
                "relative inline-flex items-center cursor-pointer"
            )}
        >
            <input
                type="checkbox"
                className="sr-only peer"
                disabled={disabled}
                {...props}
            />
            <div
                className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success bg-${notCheck}`}
            />
        </label>
    );
};

export default FormToggle;
