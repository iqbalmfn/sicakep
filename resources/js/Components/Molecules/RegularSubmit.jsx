import { Link } from "@inertiajs/react";
import Button from "../Atoms/Button";
import Icon from "../Atoms/Icon";

const RegularSubmit = ({
    back,
    processing,
    processLoading,
    label,
    labelDraft = null,
    setData = () => {},
    ...props
}) => {
    return (
        <div className="flex justify-start gap-5">
            {back ? (
                <Link href={back}>
                    <Button size="sm" variant="danger" outline>
                        <Icon icon="chevron-left" me={2} />
                        Kembali
                    </Button>
                </Link>
            ) : null}
            {labelDraft ? (
                <Button
                    size="sm"
                    type="submit"
                    variant="primary"
                    disabled={processing || processLoading}
                    className="flex items-center"
                    {...props}
                >
                    <Icon icon="save" me={2} />
                    {labelDraft}
                </Button>
            ) : null}
            <Button
                size="sm"
                type="submit"
                variant="primary"
                disabled={processing || processLoading}
                className="flex items-center"
                {...props}
            >
                <Icon icon="save" me={2} />
                {label}
            </Button>
        </div>
    );
};

export default RegularSubmit;
