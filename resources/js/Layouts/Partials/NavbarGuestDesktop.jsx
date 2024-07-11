import Icon from "@/Components/Atoms/Icon";
import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";

const NavbarGuestDesktop = ({ replaceBackground = false }) => {
    const { setting } = usePage().props;
    return (
        <div
            className={clsx(
                replaceBackground
                    ? "bg-white bg-opacity-100 shadow"
                    : "bg-white bg-opacity-50 backdrop-blur-lg",
                "fixed w-full z-50 top-0 hover:bg-white transition-all duration-300 group"
            )}
        >
            <div className="container mx-auto lg:w-[1500px] px-2 h-20 flex justify-between items-center">
                <div className="px-5 flex justify-between items-center w-full">
                    <Link
                        href="/"
                        style={{
                            position: "relative",
                            width: "190px",
                            height: "75px",
                        }}
                    >
                        <img
                            src={`/data/setting/${setting.logo}`}
                            alt="logo"
                            className="mt-3"
                        />
                    </Link>
                    <div className="flex">
                        <Link
                            href="/login"
                            className={clsx(
                                replaceBackground
                                    ? "bg-primary text-white"
                                    : "bg-primary text-white",
                                "group-hover:bg-primary py-2 px-4 rounded-lg flex items-center gap-3 shadow-lg"
                            )}
                        >
                            <Icon icon="box-arrow-in-right" />
                            <span className="font-semibold">Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarGuestDesktop;
