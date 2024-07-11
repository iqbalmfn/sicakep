import {
    calculateProposalDuration,
    downloadFile
} from "@/Utils/GlobalFunction";
import Icon from "./Icon";

const PerbaikanUsulanHeader = ({ judul, skema, tahunPelaksanaan, tahunPelaksanaanKalender, fileProposal }) => {
    return (
        <div className="bg-white py-5 px-10 rounded-lg mb-6 flex flex-col lg:flex-row gap-5">
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
                        {calculateProposalDuration(skema.tahun, tahunPelaksanaan, tahunPelaksanaanKalender) ? (
                            calculateProposalDuration(skema.tahun, tahunPelaksanaan, tahunPelaksanaanKalender)
                        ) : (
                            <span className="text-danger font-semibold italic">
                                Periode pelaksanaan telah berakhir
                            </span>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PerbaikanUsulanHeader;
