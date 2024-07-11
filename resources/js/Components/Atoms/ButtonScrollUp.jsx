import clsx from "clsx";
import { useEffect, useState } from "react";
import Button from "./Button";
import Icon from "./Icon";

const ButtonScrollUp = () => {
    const [showScrollUpButton, setShowScrollUpButton] = useState(false);

    const checkScrollPosition = () => {
        if (window.pageYOffset > 200) {
            // Ubah angka 200 sesuai dengan batas yang Anda inginkan
            setShowScrollUpButton(true);
        } else {
            setShowScrollUpButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", checkScrollPosition);

        // Cleanup listener ketika komponen di-unmount
        return () => {
            window.removeEventListener("scroll", checkScrollPosition);
        };
    }, []);

    const scrollToTop = () => {
        const element = document.getElementById("up-page");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    
    return (
        <Button
            size="xs"
            variant="primary"
            className={clsx(
                showScrollUpButton ? "show" : null,
                "fixed bottom-14 right-10 fade"
            )}
            onClick={scrollToTop}
            isCircle
            buttonIcon
        >
            <Icon icon="arrow-up-short" className="text-2xl text-white" />
        </Button>
    );
};

export default ButtonScrollUp;
