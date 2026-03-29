import ButtonScrollUp from "@/Components/Atoms/ButtonScrollUp";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Partials/Footer";
import Navbar from "./Partials/Navbar";
import TopMenuDesktop from "./Partials/TopMenuDesktop";

function AppContentLayout({ children, title, active }) {
    const { auth, setting } = usePage().props;

    return (
        <div
            id="up-page"
            className="min-h-screen flex flex-col sm:pt-0 text-slate-200"
        >
            <div className="w-full h-auto overflow-hidden text-slate-300 text-sm mb-20 relative z-10">
                <Navbar
                    auth={auth}
                    title={title}
                    active={active}
                    setting={setting}
                />
                <TopMenuDesktop auth={auth.user} />
                <div className="container mx-auto lg:w-[1500px] h-auto md:h-auto px-2">
                    <main className="flex flex-col pt-7 pb-24 md:py-5">
                        {children}
                    </main>
                </div>
            </div>
            <Footer />
            <ButtonScrollUp />
            <ToastContainer />
        </div>
    );
}

export default AppContentLayout;
