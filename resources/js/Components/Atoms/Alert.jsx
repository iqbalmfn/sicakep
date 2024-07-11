import { backgroundLight } from "@/Utils/GlobalFunction";
import Icon from "./Icon";

const Alert = ({ color, icon, message }) => {
    return (
        <div
            className={`border-2 p-5 rounded-lg text-center`}
            style={{
                backgroundColor: backgroundLight(color, 0.2),
                borderColor: backgroundLight(color, 1),
            }}
        >
            <div className="flex flex-col gap-2">
                <Icon
                    icon={icon}
                    className="text-[50px]"
                    style={{
                        color: backgroundLight(color, 1),
                    }}
                />
                <span
                    className="font-semibold"
                    style={{
                        color: backgroundLight(color, 1),
                    }}
                >
                    {message}
                </span>
            </div>
        </div>
    );
};

export default Alert;
