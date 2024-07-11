import { backgroundLight } from "@/Utils/GlobalFunction";
import React from "react";
import Icon from "./Icon";
import clsx from "clsx";

const AlertContent = ({ color, icon, title, message, className }) => {
    return (
        <div
            className={clsx(className, "border p-3 rounded-lg mb-0")}
            style={{
                backgroundColor: backgroundLight(color, 0.2),
                borderColor: backgroundLight(color, 0.5),
            }}
        >
            <div className="flex flex-col gap-1">
                {title || icon ? (
                    <div className="flex gap-2">
                        {icon ? (
                            <Icon
                                icon={icon}
                                style={{
                                    color: backgroundLight(color, 1),
                                }}
                            />
                        ) : null}
                        <span
                            className="font-extrabold"
                            style={{
                                color: backgroundLight(color, 1),
                            }}
                        >
                            {title}
                        </span>
                    </div>
                ) : null}
                {message ? (
                    <span
                        style={{
                            color: backgroundLight(color, 1),
                        }}
                    >
                        {message}
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default AlertContent;
