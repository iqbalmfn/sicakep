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

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--color-primary",
            "#163826"
        );
    }, []);

    return (
        <div
            id="up-page"
            className="min-h-screen flex flex-col sm:pt-0 bg-gray-200"
        >
            <div className="w-full h-auto bg-gray-200 overflow-hidden text-gray-500 text-sm mb-20">
                <Navbar
                    auth={auth}
                    title={title}
                    active={active}
                    setting={setting}
                />
                <TopMenuDesktop auth={auth.user} />
                <div className=" bg-gray-200 container mx-auto lg:w-[1500px] h-auto md:h-auto px-2">
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
