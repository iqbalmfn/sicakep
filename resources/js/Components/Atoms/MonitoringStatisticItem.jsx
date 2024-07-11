import { Link } from "@inertiajs/react";
import Icon from "./Icon";

const MonitoringStatisticItem = ({ title, value, icon, color, params }) => {
    return (
        <Link href={route("monitoring.usulan.list", params)}>
            <div className="flex justify-between items-center p-5 border rounded-lg bg-white hover:bg-gray-100">
                <div className="flex flex-col gap-2">
                    <span>{title}</span>
                    <span className="font-semibold text-xl">{value}</span>
                </div>
                <div
                    className={`flex justify-center items-center w-[45px] h-[45px] rounded-full bg-${color}`}
                >
                    <Icon icon={icon} className="text-white text-xl" />
                </div>
            </div>
        </Link>
    );
};

export default MonitoringStatisticItem;
