import clsx from "clsx";

function Icon({ icon, ms, me, className, ...props }) {
    return (
        <i
            className={clsx(
                ms && `ms-${ms}`,
                me && `me-${me}`,
                className,
                `bi bi-${icon}`
            )}
            {...props}
        ></i>
    );
}

export default Icon;
