import MenuDesktopItem from "@/Components/Atoms/MenuDesktopItem";
import { menus } from "@/Dictionaries/MenuLists";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

const TopMenuDesktop = ({auth}) => {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [indexSubMenu, setIndexSubMenu] = useState("");

    const handleShowSubMenu = (i) => {
        setShowSubMenu(true);
        setIndexSubMenu(i);
    };

    const handleHideSubMenu = () => {
        setShowSubMenu(false);
        setIndexSubMenu("");
    }

    const props = usePage().props;
    const baseUrl = props.app.url;
    const currentUrl = props.ziggy.location;
    const activeUrl = currentUrl.split(baseUrl)[1];

    return (
        <div className="bg-primary">
            <div className="container mx-auto lg:w-[1500px] h-[55px] flex items-center gap-2">
                {menus.map((menu, i) => (
                    <MenuDesktopItem
                        key={i}
                        auth={auth}
                        index={i}
                        href={menu.href}
                        label={menu.label}
                        icon={menu.icon}
                        roles={menu.roles}
                        subMenus={menu.subMenus}
                        showSubMenu={showSubMenu}
                        indexSubMenu={indexSubMenu}
                        activeUrl={activeUrl}
                        onClick={() => indexSubMenu === i ? handleHideSubMenu() : handleShowSubMenu(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default TopMenuDesktop;
