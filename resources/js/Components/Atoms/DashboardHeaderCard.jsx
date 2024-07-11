import { Link } from "@inertiajs/react";
import Icon from "./Icon";

const DashboardHeaderCard = ({ link, icon, label }) => {
    return (
        <Link href={link}>
            <div className="bg-white px-5 py-5 md:px-16 md:py-9 rounded-lg shadow-lg z-50 hover:bg-gray-100">
                <div className="flex gap-4 text-primary md:text-xl">
                    <Icon icon={icon} />
                    <span className="font-extrabold">{label}</span>
                </div>
            </div>
        </Link>
    );
};

export default DashboardHeaderCard;
