import clsx from "clsx";

const ContentWrapper = ({ children, className }) => {
    return (
        <div
            className={clsx(
                className,
                "bg-white rounded-lg lg:h-auto py-3 lg:py-4 px-3 lg:px-5"
            )}
        >
            {children}
        </div>
    );
};

export default ContentWrapper;
