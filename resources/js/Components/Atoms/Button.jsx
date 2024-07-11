import clsx from "clsx";
import Icon from "./Icon";
import { darken } from "polished";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

function Button({
    className,
    buttonIcon = false,
    size = "md",
    isCircle = false,
    variant = "primary",
    variantImportant = false,
    outline = false,
    children,
    disabled = false,
    warning = false,
    ...props
}) {
    const { setting } = usePage().props;
    const [isHovered, setIsHovered] = useState(false);
    const darkenedColor = darken(0.1, '#163826');

    let sizeButton;
    if (size == "md") {
        sizeButton = buttonIcon ? "px-4 py-3" : "px-5 py-3";
    } else if (size == "sm") {
        sizeButton = buttonIcon ? "px-3 py-2" : "px-4 py-2";
    } else if (size == "xs") {
        sizeButton = buttonIcon ? "px-2 py-1" : "px-3 py-1";
    }

    let variantButton;
    if (variant == "primary") {
        if (outline) {
            variantButton = clsx(
                variantImportant
                    ? "rounded-lg text-primary-important border-primary-important hover:bg-primary-important"
                    : "rounded-lg text-primary border-primary hover:bg-primary",
                "rounded-lg bg-transparent border group hover:text-white"
            );
        } else {
            variantButton = "rounded-lg text-white border border-primary";
        }
    } else if (variant == "danger") {
        if (outline) {
            variantButton =
                "rounded-lg bg-transparent text-danger border border-danger hover:bg-danger group hover:bg-danger hover:text-white";
        } else {
            variantButton =
                "rounded-lg bg-danger text-white border border-danger hover:bg-danger-hover hover:border-danger-hover";
        }
    } else if (variant == "success") {
        if (outline) {
            variantButton =
                "rounded-lg bg-transparent text-success border border-success hover:bg-success group hover:bg-success hover:text-white";
        } else {
            variantButton =
                "rounded-lg bg-success text-white border border-success hover:bg-success-hover hover:border-success-hover";
        }
    } else if (variant == "warning") {
        if (outline) {
            variantButton =
                "rounded-lg bg-transparent text-warning border border-warning hover:bg-warning group hover:bg-warning hover:text-white";
        } else {
            variantButton =
                "rounded-lg bg-warning text-white border border-warning hover:bg-warning-hover hover:border-warning-hover";
        }
    } else if (variant == "info") {
        if (outline) {
            variantButton =
                "rounded-lg bg-transparent text-info border border-info hover:bg-info group hover:bg-info hover:text-white";
        } else {
            variantButton =
                "rounded-lg bg-info text-white border border-info hover:bg-info-hover hover:border-info-hover";
        }
    } else if (variant == "gray") {
        if (outline) {
            variantButton =
                "rounded-lg bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-500 group hover:bg-gray-500 hover:text-white";
        } else {
            variantButton =
                "rounded-lg bg-gray-500 text-white border border-gray-500 hover:bg-gray-500 hover:border-gray-500";
        }
    }

    return (
        <button
            type="button"
            className={clsx(
                className,
                sizeButton,
                isCircle ? "rounded-full" : variantButton,
                disabled &&
                    (outline ? "opacity-75" : "opacity-75 cursor-not-allowed"),
                "transition-all duration-200"
            )}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={
                variant === "primary" && !outline && !variantImportant
                    ? {
                          backgroundColor: isHovered
                              ? darkenedColor
                              : "#163826",
                          borderColor: isHovered
                              ? darkenedColor
                              : "#163826",
                      }
                    : null
            }
            {...props}
        >
            {warning ? (
                <div className="absolute -top-2 -right-2 bg-red-500 w-[18px] h-[18px] rounded-full flex justify-center items-center">
                    <Icon icon="exclamation" className="text-lg text-white" />
                </div>
            ) : null}
            {children}
        </button>
    );
}

export default Button;
