import clsx from "clsx";

const ContentWrapper = ({ children, className }) => {
    return (
        <div
            className={clsx(
                className,
                "bg-white rounded-lg h-auto py-4 px-5"
            )}
        >
            {children}
        </div>
    );
};

export default ContentWrapper;
