import ApplicationLogo from "@/Components/Atoms/ApplicationLogo";
import CalendarActive from "@/Components/Atoms/CalendarActive";
import Dropdown from "@/Components/Atoms/Dropdown";
import Icon from "@/Components/Atoms/Icon";
import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";

function Navbar({ auth, setting }) {
    const { calendarActive } = usePage().props;

    return (
        <div className="bg-white">
            <div className="h-[65px] flex justify-between items-center px-5 lg:px-0 container mx-auto lg:w-[1500px]">
                <ApplicationLogo setting={setting} />
                <div className="flex justify-start gap-5 items-center">
                    <CalendarActive active={calendarActive} />
                    {auth.user ? (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <div className="flex items-center justify-start gap-3 md:w-[165px] group cursor-pointer">
                                    <div>
                                        {auth.user.foto ? (
                                            <div className="rounded-full w-[40px] h-[40px] group-hover:bg-white transition duration-300 overflow-hidden">
                                                <img
                                                    src={`/images/${auth.user.foto}`}
                                                    alt={auth.user.name}
                                                    className="object-cover object-top"
                                                />
                                            </div>
                                        ) : (
                                            <div className="border border-white rounded-full w-[40px] h-[40px] flex justify-center items-center group-hover:bg-white transition duration-300 overflow-hidden">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${
                                                        auth.user.name
                                                    }&background=163826&color=fff`}
                                                    alt={auth.user.name}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <span className="hidden md:block">
                                        {auth.user.name}
                                    </span>
                                </div>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                {/* <Dropdown.Link
                                    href="/profil"
                                    className={clsx(
                                        auth.user.roles[0].name === "Dosen"
                                            ? null
                                            : "hidden",
                                        "flex items-center gap-2"
                                    )}
                                >
                                    <Icon
                                        icon="person"
                                        className="text-[15px]"
                                    />
                                    Profil
                                </Dropdown.Link> */}
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="flex items-center gap-2"
                                >
                                    <Icon
                                        icon="box-arrow-right"
                                        className="text-[15px]"
                                    />
                                    Log Out
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    ) : (
                        <Link href={route("login")}>
                            <div className="border border-white rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer hover:bg-white group transition duration-300">
                                <Icon
                                    icon="person"
                                    className="text-white group-hover:text-color-primary text-xl transition duration-300"
                                />
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
