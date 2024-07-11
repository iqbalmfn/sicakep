import React from "react";
import NameWithAvatar from "./NameWithAvatar";
import { truncate } from "@/Utils/GlobalFunction";
import { Link, usePage } from "@inertiajs/react";

const NotificationItem = ({ avatar, name, title, message, link, ...props }) => {
    const { universitas } = usePage().props;
    return (
        <Link
            href={link}
            className="flex items-start gap-3 hover:bg-gray-100 p-3"
            {...props}
        >
            {avatar ? (
                <NameWithAvatar
                    avatar={avatar}
                    name={name}
                    isShowName={false}
                />
            ) : (
                <div className="flex gap-2 items-center">
                    <div className="border border-white rounded-full w-[35px] h-[35px] flex justify-center items-center group-hover:bg-white transition duration-300 overflow-hidden">
                        <img
                            src={universitas.logo}
                            alt="logo universitas"
                        />
                    </div>
                </div>
            )}
            <div className="flex flex-col">
                <span className="font-semibold">{title}</span>
                <span className="text-xs">{truncate(message, 75)}</span>
            </div>
        </Link>
    );
};

export default NotificationItem;
