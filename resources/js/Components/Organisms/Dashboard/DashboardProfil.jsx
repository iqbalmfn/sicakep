import DashboarProdfilCard from "@/Components/Atoms/DashboarProdfilCard";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import IdentitasKanan from "@/Components/Molecules/Dashboard/DashboardProfil/IdentitasKanan";
import IdentitasKiri from "@/Components/Molecules/Dashboard/DashboardProfil/IdentitasKiri";
import ProfilHeader from "@/Components/Molecules/Dashboard/DashboardProfil/ProfilHeader";

const DashboardProfil = ({ lecturer }) => {
    const countScopus = lecturer.publikasi.filter(
        (item) => item.sumber === "SCOPUS"
    ).length;
    const countWos = lecturer.publikasi.filter((item) => item.sumber === "WOS").length;
    const countGaruda = lecturer.publikasi.filter(
        (item) => item.sumber === "GARUDA"
    ).length;
    const countScholar = lecturer.publikasi.filter(
        (item) => item.sumber === "SCHOLAR"
    ).length;
    const countHki = lecturer.hki.length;
    const countBuku = lecturer.buku.length;

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
                <SectionTitle title="Profil" />
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-5">
                    <DashboarProdfilCard
                        label="Identitas"
                        value={lecturer.nama_lengkap}
                        icon="person"
                    />
                    <DashboarProdfilCard
                        label="Artikel Terindex WOS"
                        value={countWos}
                        icon="journal-text"
                    />
                    <DashboarProdfilCard
                        label="Artikel Terindex Scopus"
                        value={countScopus}
                        icon="journal-text"
                    />
                    <DashboarProdfilCard
                        label="Artikel Terindex Garuda"
                        value={countGaruda}
                        icon="journal-text"
                    />
                    <DashboarProdfilCard
                        label="Artikel Terindex Google Scholar"
                        value={countScholar}
                        icon="journal-text"
                    />
                    <DashboarProdfilCard
                        label="HKI"
                        value={countHki}
                        icon="bookmark-check"
                    />
                    <DashboarProdfilCard
                        label="Buku"
                        value={countBuku}
                        icon="book"
                    />
                    <DashboarProdfilCard
                        label="Sinta Score Overall"
                        value={lecturer.sinta_score ? lecturer.sinta_score : 0}
                        icon="star"
                    />
                    <DashboarProdfilCard
                        label="Sinta Score 3yr"
                        value={lecturer.sinta_score_3yr ? lecturer.sinta_score_3yr : 0}
                        icon="star"
                    />
                </div>
                <div className="rounded-lg overflow-hidden mt-3">
                    <ProfilHeader lecturer={lecturer} />
                    <div className="p-5 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <IdentitasKiri lecturer={lecturer} />
                            <IdentitasKanan lecturer={lecturer} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardProfil;
