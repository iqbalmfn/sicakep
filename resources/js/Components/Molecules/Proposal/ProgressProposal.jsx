import TimelineDetailProposalItem from "@/Components/Atoms/TimelineDetailProposalItem";

const ProgressProposal = ({
    status,
    isPublished = false,
    statusAdministrasi = false,
}) => {
    return (
        <div className="flex flex-col gap-3 mt-4 ms-3">
            <TimelineDetailProposalItem
                status={status}
                title="Proposal Terkirim"
                message="Proposal telah dikirim kepada pihak yang berwenang"
                key="Proposal Terkirim"
            />
            <TimelineDetailProposalItem
                status={status}
                title="Persetujuan Dekan"
                message="Menunggu persetujuan Dekan"
                key="Persetujuan Dekan"
            />
            <TimelineDetailProposalItem
                status={status}
                title="Persetujuan LPPM"
                message="Menunggu persetujuan Kepala LPPM"
                key="Persetujuan LPPM"
            />
            <TimelineDetailProposalItem
                status={status}
                statusAdministrasi={statusAdministrasi}
                isPublished={isPublished}
                title="Seleksi Administrasi"
                message="Proposal dalam proses seleksi administrasi"
                key="Seleksi Administrasi"
            />
            <TimelineDetailProposalItem
                status={status}
                isPublished={isPublished}
                title="Seleksi Substansi"
                message="Proposal dalam proses pemeriksaan substansi"
                key="Seleksi Substansi"
            />
            <TimelineDetailProposalItem
                status={status}
                isPublished={isPublished}
                title="Penetapan Hasil"
                message="Penetapan hasil seleksi administrasi dan substansi"
                key="Penetapan Hasil"
            />
        </div>
    );
};

export default ProgressProposal;
