import Icon from "@/Components/Atoms/Icon";
import Spinner from "@/Components/Atoms/Spinner";

const DetailCheckingAvailability = ({
    loadingSelect,
    messageSelect,
}) => {
    return loadingSelect ? (
        <span className="text-xs text-gray-400 flex items-center">
            <Spinner /> Checking availability...
        </span>
    ) : messageSelect.includes("Not Available") || messageSelect.includes("sudah maksimal") ? (
        <span className="text-danger text-xs">
            <Icon icon="x-circle" me={2} />
            {messageSelect}
        </span>
    ) : messageSelect.includes("Available") ? (
        <span className="text-success text-xs">
            <Icon icon="check-circle" me={2} />
            {messageSelect}
        </span>
    ) : null;
};

export default DetailCheckingAvailability;
