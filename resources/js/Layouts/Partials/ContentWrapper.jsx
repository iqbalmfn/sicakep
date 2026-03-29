import clsx from "clsx";

const ContentWrapper = ({ children, className }) => {
    return (
        <div
            className={clsx(
                className,
                "bg-slate-900/40 backdrop-blur-xl shadow-xl rounded-2xl lg:h-auto py-3 lg:py-4 px-3 lg:px-5 hover:bg-white/5 transition-all"
            )}
        >
            {children}
        </div>
    );
};

export default ContentWrapper;
