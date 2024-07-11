import Button from "./Button";
import Icon from "./Icon";

const CreateButton = ({ handleShowModal, disabled=false, ...props }) => {
    return (
        <div>
            <Button size="sm" variant="primary" className="w-full" disabled={disabled} {...props}>
                <div className="flex items-center gap-2">
                    <Icon icon="plus-lg" /> Tambah
                </div>
            </Button>
        </div>
    );
};

export default CreateButton;
