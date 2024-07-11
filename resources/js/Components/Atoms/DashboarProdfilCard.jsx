import Icon from "./Icon";

const DashboarProdfilCard = ({ label, value, icon }) => {
    return (
        <div className="col-span-1 bg-white rounded-lg p-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <span>{label}</span>
                    <span className="font-semibold text-xl">{value}</span>
                </div>
                <div>
                    <div className="w-[45px] h-[45px] rounded-full bg-primary flex justify-center items-center">
                        <Icon icon={icon} className="text-white text-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboarProdfilCard;
