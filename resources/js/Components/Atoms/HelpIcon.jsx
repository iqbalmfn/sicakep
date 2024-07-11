import { Tooltip } from "antd";
import Icon from "./Icon";

const HelpIcon = ({ title }) => {
    return (
        <Tooltip title={title} className="cursor-pointer">
            <Icon icon="question-circle-fill" />
        </Tooltip>
    );
};

export default HelpIcon;
