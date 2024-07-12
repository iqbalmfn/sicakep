import FormToggle from "@/Components/Atoms/FormToggle";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";

const ToggleStatus = ({
    dataId,
    initialStatus,
    handleToggleSetStatus,
    isError = null,
}) => {
    const [localStatus, setLocalStatus] = useState(initialStatus);

    useEffect(() => {
        setLocalStatus(initialStatus);
    }, [initialStatus, isError]);

    const handleToggleChange = () => {
        const newStatus = !localStatus;
        setLocalStatus(newStatus);
        handleToggleSetStatus(dataId, newStatus ? 1 : 0);
    };

    return (
        <Tooltip title={localStatus ? "Aktif" : "Tidak Aktif"}>
            <div className="mt-1">
                <FormToggle
                    checked={isError ? initialStatus : localStatus}
                    notCheck="danger"
                    onChange={handleToggleChange}
                    disabled={localStatus == 1}
                />
            </div>
        </Tooltip>
    );
};

export default ToggleStatus;
