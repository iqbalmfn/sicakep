import { Link } from "@inertiajs/react";
import clsx from "clsx";
import Icon from "./Icon";
import { diffForHumans } from "@/Utils/GlobalFunction";

const NotificationListItem = ({
    link,
    avatar,
    title,
    message,
    createdAt,
    isRead = false,
    ...props
}) => {
    return (
        <Link
            href={link}
            className={clsx(
                !isRead ? "bg-gray-100" : null,
                "border rounded-lg px-4 py-2  hover:bg-gray-200 overflow-hidden relative"
            )}
            {...props}
        >
            <div className="absolute top-0 right-2">
                <Icon
                    icon={!isRead ? "envelope-exclamation" : "envelope-check"}
                    className={clsx(
                        !isRead ? "text-danger" : "text-success",
                        "text-lg"
                    )}
                />
            </div>
            <div className="flex items-center gap-4">
                <div className="sm:w-[5%] hidden sm:block">
                    <img
                        src={avatar}
                        alt="avatar"
                        className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full object-cover object-top hidden sm:block"
                    />
                </div>
                <div className="flex flex-col gap-1 sm:w-[95%] w-full">
                    <span className="font-semibold text-base">{title}</span>
                    <p>{message}</p>
                    <span className="text-[11px] text-gray-400">
                        {diffForHumans(createdAt)}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default NotificationListItem;
