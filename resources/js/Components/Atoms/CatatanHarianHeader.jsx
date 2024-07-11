import { calculateProposalDuration, formatDateYear } from "@/Utils/GlobalFunction";

const CatatanHarianHeader = ({
    judul,
    tahunPelaksanaan,
    skemaName,
    skemaTahun,
    tahunPelaksanaanKalender,
}) => {
    return (
        <div className="bg-white px-5 py-3 rounded-lg flex flex-col gap-2">
            <div className="flex flex-col">
                <span className="text-[10px] -mb-1">Judul Kegiatan</span>
                <span className="text-primary font-semibold">{judul}</span>
            </div>
            <div className="flex gap-2">
                <span className="text-[10px] bg-success text-white px-2 rounded">
                    {skemaName}
                </span>
                <span className="text-[10px] bg-warning text-white px-2 rounded">
                    {`Tahun Pelaksanaan ${tahunPelaksanaan ? tahunPelaksanaan : formatDateYear(new Date())} (${
                        calculateProposalDuration(skemaTahun, tahunPelaksanaan,  tahunPelaksanaanKalender) ? (
                            calculateProposalDuration(skemaTahun, tahunPelaksanaan,  tahunPelaksanaanKalender)
                        ) : (
                            <span className="text-danger font-semibold italic">
                                Periode pelaksanaan telah berakhir
                            </span>
                        )
                    })`}
                </span>
            </div>
        </div>
    );
};

export default CatatanHarianHeader;
