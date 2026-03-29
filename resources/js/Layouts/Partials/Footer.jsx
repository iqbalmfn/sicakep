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
        <footer className="fixed bottom-0 w-full flex items-center h-[40px] bg-slate-950/40 backdrop-blur-xl border-t border-white/5 z-[999]">
            <div className="container mx-auto text-center px-5 text-[10px] tracking-wider text-slate-500">
                Development{" "}
                <a
                    target="_blank"
                    href="https://iqbalmfn.com"
                    className="text-info/80 hover:text-info transition-colors duration-300 font-medium"
                >
                    {props.app.name}
                </a>
                {" "}• All Rights Reserved &copy; 2024 - v(3.0.0)
            </div>
        </footer>
    );
};

export default Footer;
