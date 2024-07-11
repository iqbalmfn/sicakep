import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

const Footer = () => {
    const { props } = usePage();
    
    const [isEndOfPage, setIsEndOfPage] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
                setIsEndOfPage(true);
            } else {
                setIsEndOfPage(false);
            }
        };
    
        window.addEventListener("scroll", handleScroll);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return isEndOfPage && (
        <footer className="fixed bottom-0 w-full flex items-center h-[35px] bg-white shadow-top">
            <div className="container mx-auto text-center px-5 text-xs">
                Development{" "}
                <a
                    target="_blank"
                    href="https://santren.id"
                    className="text-primary hover:text-primary-hover "
                >
                    {props.app.name}
                </a>
                , All rights Reserved &copy; 2023 - v(1.0.0)
            </div>
        </footer>
    );
};

export default Footer;
