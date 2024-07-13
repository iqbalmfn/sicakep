const Divider = ({ children, className, ...props }) => {
    return (
        <div
            className={`relative my-4 flex items-center ${className}`}
            {...props}
        >
            <div className="flex-1 bg-gray-300 h-[1px]"></div>
            <div className="bg-white px-2 text-center mx-4">{children}</div>
            <div className="flex-1 bg-gray-300 h-[1px]"></div>
        </div>
    );
};

export default Divider;
