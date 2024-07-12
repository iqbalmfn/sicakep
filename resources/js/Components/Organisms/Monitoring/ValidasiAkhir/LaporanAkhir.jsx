import SectionTitle from "@/Components/Atoms/SectionTitle";
import DetailProposalMonev100 from "../../Reviewer/DetailProposalMonev100";

const LaporanAkhir = ({ datas }) => {
    return (
        <div>
            <SectionTitle title="Laporan Akhir" />
            <DetailProposalMonev100 data={datas} isHideTimeline />
        </div>
    );
};

export default LaporanAkhir;
