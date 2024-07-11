import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

function AppLayout({ children }) {

    return (
        <div
            className="min-h-screen flex flex-col justify-center items-center sm:pt-0 bg-gray-100 relative"
            style={{
                backgroundImage: `url('/data/setting/')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-primary opacity-75 mix-blend-multiply" />
            <div className="w-[350px] sm:w-[500px] px-6 py-4 bg-white shadow-md rounded-lg z-10">
                {children}
            </div>
            <ToastContainer />
        </div>
    );
}

export default AppLayout;
