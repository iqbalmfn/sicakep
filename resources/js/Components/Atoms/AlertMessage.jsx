import { backgroundLight } from "@/Utils/GlobalFunction";
import clsx from "clsx";

const AlertMessage = ({ color, message, align = "center", className }) => {
    return (
        <div
            className={clsx(className, "border p-3 rounded-lg mb-0")}
            style={{
                backgroundColor: backgroundLight(color, 0.2),
                borderColor: backgroundLight(color, 0.5),
            }}
        >
            <div className="flex flex-col gap-1">
                {message ? (
                    <span
                        style={{
                            color: backgroundLight(color, 1),
                        }}
                        className={`text-${align}`}
                    >
                        {message}
                    </span>
                ) : null}
            </div>
        </div>
    );
};

export default AlertMessage;
