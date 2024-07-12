import { Tooltip } from "antd";
import Button from "../Atoms/Button";
import clsx from "clsx";

const ActionButton = ({ variant, icon, label, className, isOutline = false, ...props }) => {
    return (
        <Tooltip title={label}>
            <Button
                size="xs"
                outline={!isOutline}
                buttonIcon
                variant={variant}
                variantImportant
                className={clsx(className, "group ms-1")}
                {...props}
            >
                <i className={`bi bi-${icon} group-hover:text-white fs-4`}></i>
            </Button>
        </Tooltip>
    );
};

export default ActionButton;
