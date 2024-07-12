import { Tooltip } from "antd";
import Button from "../Atoms/Button";

const TableButtonEdit = ({ ...props }) => {
    return (
        <Tooltip title="Edit">
            <Button
                size="xs"
                outline
                buttonIcon
                variant="primary"
                className="btn-outline btn-icon group me-2"
                {...props}
            >
                <i className="bi bi-pencil group-hover:text-white fs-4"></i>
            </Button>
        </Tooltip>
    );
};

export default TableButtonEdit;
