import clsx from "clsx";

const Label = ({ children, variant = "primary", ...props }) => {
    let variantLabel;
    if (variant == "primary") {
        variantLabel = "text-primary border-primary";
    }
    return (
        <span
            className={clsx(
                `border border-${variant} text-${variant} uppercase rounded text-xs px-2`
            )}
            {...props}
        >
            {children}
        </span>
    );
};

export default Label;
