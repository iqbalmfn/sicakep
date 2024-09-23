import Button from "../Atoms/Button";
import Icon from "../Atoms/Icon";

const RegularSubmitModal = ({
    label,
    closeModal,
    icon = "save",
    disabled = false
}) => {
    return (
        <div className="flex justify-end gap-5">
            <Button size="sm" variant="danger" outline onClick={closeModal}>
                <Icon icon="x-lg" me={2} />
                Batal
            </Button>
            <Button
                size="sm"
                type="submit"
                variant="primary"
                disabled={disabled}
                className="flex items-center"
            >
                <Icon icon={icon} me={2} />
                {label}
            </Button>
        </div>
    );
};

export default RegularSubmitModal;
