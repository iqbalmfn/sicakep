import AlertContent from "@/Components/Atoms/AlertContent";
import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import { downloadFile } from "@/Utils/GlobalFunction";

const DetailSubstansi = ({ fileSubstansi }) => {
    return (
        <div className="flex flex-col">
            <AlertContent title="Substansi" color="--color-info" className="mb-5" />
            <div>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal_substansi/${fileSubstansi}`,
                            fileSubstansi
                        )
                    }
                    disabled={!fileSubstansi}
                >
                    <Icon icon="file-earmark-pdf-fill" me={2} /> Download
                    Substansi
                </Button>
            </div>
        </div>
    );
};

export default DetailSubstansi;
