import Icon from "./Icon";

const BiodataItem = ({ icon, label }) => {
    return (
        <div className="flex items-center gap-3 text-md">
            <Icon icon={icon} />
            <span>{label}</span>
        </div>
    );
};

export default BiodataItem;
