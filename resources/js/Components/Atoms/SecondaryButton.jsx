export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex justify-center items-center px-4 py-2 bg-transparent border border-white/20 rounded-xl font-medium text-sm text-slate-300 hover:bg-white/5 hover:text-white hover:border-white/30 focus:outline-none disabled:opacity-25 transition-all duration-300 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
