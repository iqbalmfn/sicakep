const FloatingContent = ({ children, ...props }) => {
    return (
        <div className="container mx-auto lg:w-[1500px] lg:px-10 relative" {...props}>
            <div className="mx-5 md:mx-0 bg-white shadow-lg rounded-xl h-auto -mt-24 md:-mt-32 p-4 md:p-6 grid grid-cols-12 gap-5">
                {children}
            </div>
        </div>
    );
};

export default FloatingContent;
