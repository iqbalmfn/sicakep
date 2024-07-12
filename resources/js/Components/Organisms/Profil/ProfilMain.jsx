import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import Overlay from "@/Components/Atoms/Overlay";
import ProfilScoreCard from "@/Components/Atoms/ProfilScoreCard";
import ProfilData from "@/Components/Molecules/Profil/ProfilData";
import ProfilMainBiodata from "@/Components/Molecules/Profil/ProfilMainBiodata";
import UseProfil from "@/Hooks/Profil/UseProfil";
import { Link, usePage } from "@inertiajs/react";

const ProfilMain = ({ profil, flash }) => {
    const {
        sintaCategories,
        activeTab,
        handleSwitchTab,
        synchronizeSinta,
        synchronizePddikti,
        resetSinta,
        syncLoading,
    } = UseProfil(flash);

    const { auth } = usePage().props;

    return (
        <div className="col-span-12 lg:col-span-9">
            <div className="flex justify-between mb-5">
                <ProfilMainBiodata
                    foto={profil.foto}
                    nama_lengkap={profil.nama_lengkap}
                    jurusan={profil.studyprogram}
                    jafung={profil.jafung}
                    nidn={profil.nidn}
                    roles={profil.user.roles}
                    is_scraping_sinta={profil.is_scraping_sinta}
                    is_scraping_pddikti={profil.is_scraping_pddikti}
                />
            </div>
            <div className="flex flex-col w-[150px] sm:flex-row sm:w-auto gap-2 mb-3">
                <Link href={route("profil.edit", { profil: profil.id })}>
                    <Button variant="primary" size="sm" className="w-full">
                        <div className="flex justify-start gap-3">
                            <Icon icon="pencil-square" />
                            Edit Profil
                        </div>
                    </Button>
                </Link>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => synchronizePddikti(profil.nidn)}
                    disabled={!profil.nidn}
                >
                    <div className="flex justify-start gap-3">
                        <Icon icon="arrow-repeat" />
                        Sync PDDIKTI
                    </div>
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => synchronizeSinta(profil.id)}
                    disabled={!profil.id_sinta}
                >
                    <div className="flex justify-start gap-3">
                        <Icon icon="arrow-repeat" />
                        Sync SINTA
                    </div>
                </Button>
                <Button
                    variant="primary"
                    size="sm"
                    onClick={() => resetSinta(profil.id)}
                    disabled={!profil.is_scraping_sinta}
                >
                    <div className="flex justify-start gap-3">
                        <Icon icon="trash" />
                        Reset SINTA
                    </div>
                </Button>
                {syncLoading ? <Overlay /> : null}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                <ProfilScoreCard
                    icon="person"
                    label="SINTA Score Overall"
                    value={profil.sinta_score ? profil.sinta_score : 0}
                />
                <ProfilScoreCard
                    icon="mortarboard"
                    label="SINTA Score 3yr"
                    value={profil.sinta_score_3yr ? profil.sinta_score_3yr : 0}
                />
                <ProfilScoreCard
                    icon="folder"
                    label="Affil Score"
                    value={
                        profil.sinta_score_affil ? profil.sinta_score_affil : 0
                    }
                />
                <ProfilScoreCard
                    icon="bar-chart-line"
                    label="Affil Score 3yr"
                    value={
                        profil.sinta_score_affil_3yr
                            ? profil.sinta_score_affil_3yr
                            : 0
                    }
                />
            </div>
            <ProfilData
                sintaCategories={sintaCategories}
                activeTab={activeTab}
                handleSwitchTab={handleSwitchTab}
                data={{
                    penelitian: profil.penelitian,
                    pengabdian: profil.pengabdian,
                    publikasi: profil.publikasi,
                    hki: profil.hki,
                    buku: profil.buku,
                }}
            />
        </div>
    );
};

export default ProfilMain;
