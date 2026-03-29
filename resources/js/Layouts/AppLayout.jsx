import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function AppLayout({ children }) {

    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center sm:pt-0 bg-slate-950 relative overflow-hidden"
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-info/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="w-[350px] sm:w-[450px] px-8 py-10 bg-slate-900/40 backdrop-blur-2xl shadow-2xl rounded-2xl border border-white/10 z-10 relative">
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none" />
                {children}
            </div>
            <ToastContainer theme="dark" />
        </div>
    );
}

export default AppLayout;
