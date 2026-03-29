import clsx from "clsx";
import Icon from "./Icon";
import { darken } from "polished";
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
                    ? "rounded-xl text-info border-info hover:bg-info/20 shadow-[0_0_10px_rgba(0,250,255,0.2)]"
                    : "rounded-xl text-info border-info hover:bg-info/20 shadow-[0_0_10px_rgba(0,250,255,0.2)]",
                "bg-transparent border group hover:text-white"
            );
        } else {
            variantButton = "rounded-xl text-info hover:text-gray-800 bg-info/90 border border-info hover:bg-info shadow-[0_0_15px_rgba(0,250,255,0.3)] font-semibold";
        }
    } else if (variant == "danger") {
        if (outline) {
            variantButton =
                "rounded-xl bg-transparent text-danger border border-danger hover:bg-danger/20 shadow-[0_0_10px_rgba(255,0,85,0.2)] group hover:text-white";
        } else {
            variantButton =
                "rounded-xl bg-danger/80 text-white border border-danger hover:bg-danger shadow-[0_0_15px_rgba(255,0,85,0.3)]";
        }
    } else if (variant == "success") {
        if (outline) {
            variantButton =
                "rounded-xl bg-transparent text-success border border-success hover:bg-success/20 shadow-[0_0_10px_rgba(0,255,136,0.2)] group hover:text-white";
        } else {
            variantButton =
                "rounded-xl bg-success/80 text-slate-900 font-semibold border border-success hover:bg-success shadow-[0_0_15px_rgba(0,255,136,0.3)]";
        }
    } else if (variant == "warning") {
        if (outline) {
            variantButton =
                "rounded-xl bg-transparent text-warning border border-warning hover:bg-warning/20 shadow-[0_0_10px_rgba(255,200,0,0.2)] group hover:text-white";
        } else {
            variantButton =
                "rounded-xl bg-warning/80 text-slate-900 font-semibold border border-warning hover:bg-warning shadow-[0_0_15px_rgba(255,200,0,0.3)]";
        }
    } else if (variant == "info") {
        if (outline) {
            variantButton =
                "rounded-xl bg-transparent text-info border border-info hover:bg-info/20 shadow-[0_0_10px_rgba(0,250,255,0.2)] group hover:text-white";
        } else {
            variantButton =
                "rounded-xl bg-info/80 text-slate-900 font-semibold border border-info hover:bg-info shadow-[0_0_15px_rgba(0,250,255,0.3)]";
        }
    } else if (variant == "gray") {
        if (outline) {
            variantButton =
                "rounded-xl bg-transparent text-slate-400 border border-slate-500 hover:bg-slate-700 group hover:text-white";
        } else {
            variantButton =
                "rounded-xl bg-slate-700 text-white border border-slate-600 hover:bg-slate-600 shadow-md";
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
                    (outline ? "opacity-50" : "opacity-50 cursor-not-allowed"),
                "transition-all duration-300 ease-out"
            )}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
