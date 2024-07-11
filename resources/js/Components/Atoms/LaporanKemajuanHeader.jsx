import {
    calculateProposalDuration,
    downloadFile,
    formatDateTime,
} from "@/Utils/GlobalFunction";
import Icon from "./Icon";

const LaporanKemajuanHeader = ({
    judul,
    skema,
    tahunPelaksanaan,
    tahunPelaksanaanKalender,
    fileProposal,
    isFinished = false,
    updatedAt = new Date(),
}) => {
    const statusLabel = () => {
        return isFinished ? (
            <span className="bg-success text-white rounded py-1 px-2 text-xs">
                <Icon icon="check-lg" me={2} />
                Sudah Unggah
            </span>
        ) : (
            <span className="bg-warning text-white rounded py-1 px-2 text-xs">
                <Icon icon="exclamation-circle" me={2} />
                Belum Unggah
            </span>
        );
    };

    return (
        <div className="bg-white py-5 px-10 rounded-lg mb-6 flex flex-col lg:flex-row lg:justify-between gap-10">
            <div className="flex gap-5">
                <button
                    type="button"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal/${fileProposal}`,
                            fileProposal
                        )
                    }
                >
                    <Icon
                        icon="file-earmark-pdf-fill"
                        className="text-danger hover:text-danger-hover text-4xl"
                    />
                </button>
                <div className="flex flex-col gap-1">
                    <span className="text-primary font-semibold">{judul}</span>
                    <div className="flex gap-2">
                        <span className="border-e border-gray-400 px-2 -ms-2">
                            {skema.nama}
                        </span>
                        <span className="border-e border-gray-400 px-2 -ms-2">
                            Tahun Pelaksanaan {tahunPelaksanaan}
                        </span>
                        <span className="px-2 -ms-2">
                            {calculateProposalDuration(
                                skema.tahun,
                                tahunPelaksanaan,
                                tahunPelaksanaanKalender,
                            ) ? (
                                calculateProposalDuration(
                                    skema.tahun,
                                    tahunPelaksanaan,
                                    tahunPelaksanaanKalender,
                                )
                            ) : (
                                <span className="text-danger font-semibold italic">
                                    Periode pelaksanaan telah berakhir
                                </span>
                            )}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
                <div>{statusLabel()}</div>
                <div>
                    <span className="bg-info text-white rounded py-1 px-2 text-xs">
                        Tgl Update: {formatDateTime(updatedAt)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LaporanKemajuanHeader;
