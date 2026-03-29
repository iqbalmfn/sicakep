export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex justify-center items-center px-4 py-2 bg-info/80 border border-info shadow-[0_0_15px_rgba(0,250,255,0.3)] rounded-xl font-semibold text-sm text-slate-900 tracking-wide hover:bg-info hover:shadow-[0_0_25px_rgba(0,250,255,0.5)] focus:outline-none disabled:opacity-25 transition-all duration-300 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
