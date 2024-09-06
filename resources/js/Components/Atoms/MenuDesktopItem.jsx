import { Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import clsx from "clsx";
import { Fragment } from "react";
import Icon from "./Icon";
import { makeSlug } from "@/Utils/GlobalFunction";

const MenuDesktopItem = ({
    index,
    auth,
    href,
    label,
    icon,
    roles,
    subMenus,
    showSubMenu,
    indexSubMenu,
    activeUrl,
    ...props
}) => {
    const authRoles = auth.roles.map((item) => item.id);
    const withSubMenu = () => {
        return (
            <div
                {...props}
                className={clsx(
                    roles.length === 0 ||
                        roles.some((element) => authRoles.includes(element))
                        ? null
                        : "hidden",
                    activeUrl.slice(1).includes(makeSlug(label.toLowerCase()))
                        ? "bg-black/10 font-semibold"
                        : null,
                    "flex items-center gap-3 text-white cursor-pointer hover:bg-black/10 py-[5px] px-[10px] transition-all duration-150 rounded !font-medium"
                )}
            >
                <div className="flex items-center gap-2">
                    <Icon icon={icon} />
                    <span
                        className={clsx(
                            activeUrl
                                .slice(1)
                                .includes(makeSlug(label.toLowerCase()))
                                ? "font-semibold"
                                : null
                        )}
                    >
                        {label}
                    </span>
                </div>
                {subMenus.length > 0 ? (
                    <Icon icon="chevron-down" className="text-xs" />
                ) : null}

                {/* sub menu */}
                <Transition
                    as={Fragment}
                    show={showSubMenu && indexSubMenu == index}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <div className="absolute bg-white top-[123px] z-20 min-w-[175px] shadow-lg rounded h-auto border-danger overflow-hidden">
                        <div className="flex flex-col">
                            {subMenus.map((subMenu, i) => (
                                <Link
                                    key={i}
                                    href={subMenu.href}
                                    className={clsx(
                                        subMenu.roles.length === 0 ||
                                            subMenu.roles.some((element) =>
                                                authRoles.includes(element)
                                            )
                                            ? null
                                            : "hidden",
                                        activeUrl.includes(subMenu.href)
                                            ? "bg-gray-100 font-semibold"
                                            : null,
                                        "text-standard hover:bg-gray-100 px-4 py-3"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon icon={subMenu.icon} />
                                        <span>{subMenu.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </Transition>
            </div>
        );
    };

    const withoutSubMenu = () => {
        return (
            <Link
                href={href}
                className={clsx(
                    roles.length === 0 ||
                        roles.some((element) => authRoles.includes(element))
                        ? null
                        : "hidden",
                    activeUrl.slice(1).includes(makeSlug(label.toLowerCase()))
                        ? "bg-black/10 font-semibold"
                        : null,
                    "text-white hover:bg-black/10 py-[5px] px-[10px] rounded"
                )}
            >
                <div className="flex items-center gap-2">
                    <Icon icon={icon} />
                    <span>{label}</span>
                </div>
            </Link>
        );
    };
    return href ? withoutSubMenu() : withSubMenu();
};

export default MenuDesktopItem;
