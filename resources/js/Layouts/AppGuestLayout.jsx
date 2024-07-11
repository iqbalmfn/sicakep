import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Footer from "./Partials/Footer";
import NavbarGuestDesktop from "./Partials/NavbarGuestDesktop";

const AppGuestLayout = ({ children }) => {
    const { setting } = usePage().props;
    const [outsideHero, setOutsideHero] = useState(false);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--color-primary",
            setting.warna
        );
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Dapatkan posisi bawah dari div dengan id "hero"
            const heroBottom = document
                .getElementById("hero-content")
                .getBoundingClientRect().bottom;

            // Cek apakah posisi scroll saat ini lebih dari posisi bawah div "hero"
            if (heroBottom < 0) {
                setOutsideHero(true);
            } else {
                setOutsideHero(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Bersihkan event listener saat komponen dilepaskan
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <Head title="Beranda" />

            <NavbarGuestDesktop replaceBackground={outsideHero} />
            <main className="mb-20">{children}</main>
            <Footer />
        </div>
    );
};

export default AppGuestLayout;
