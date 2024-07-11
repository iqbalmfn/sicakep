import Icon from "./Icon";

const ProfilScoreCard = ({ icon, label, value }) => {
    return (
        <div className="col-span-1 flex gap-3 p-3 border rounded-lg border-primary">
            <div className="w-[50px] h-[50px] rounded-full bg-primary flex justify-center items-center">
                <Icon icon={icon} className="text-white text-xl -mt-1" />
            </div>
            <div className="flex flex-col justify-between">
                <span className="text-2xl font-semibold text-primary">
                    {value}
                </span>
                <span className="font-normal text-xs">{label}</span>
            </div>
        </div>
    );
};

export default ProfilScoreCard;
