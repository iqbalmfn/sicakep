import DetailAnggaran from "@/Components/Molecules/Proposal/Detail/DetailAnggaran";
import DetailAnggotaDosen from "@/Components/Molecules/Proposal/Detail/DetailAnggotaDosen";
import DetailAnggotaMahasiswa from "@/Components/Molecules/Proposal/Detail/DetailAnggotaMahasiswa";
import DetailInformasi from "@/Components/Molecules/Proposal/Detail/DetailInformasi";
import DetailKetua from "@/Components/Molecules/Proposal/Detail/DetailKetua";
import DetailLuaran from "@/Components/Molecules/Proposal/Detail/DetailLuaran";
import DetailMitra from "@/Components/Molecules/Proposal/Detail/DetailMitra";
import ProgressProposal from "@/Components/Molecules/Proposal/ProgressProposal";

const DetailProposal = ({ data, userRoles, isHideTimeline = false }) => {
    const dataRender = () => {
        return (
            <div className="flex flex-col gap-5 mt-8">
                <DetailInformasi
                    judul={data.judul}
                    jenis={data.jenis}
                    skema={data.skema_name.nama}
                    prodi={data.lecturer_name.studyprogram.name}
                    tahunAnggaran={data.kalender_name.tahun}
                    tahunKegiatan={data.skema_name.tahun}
                    tahunUsulan={data.created_at}
                    fileProposal={data.file_proposal}
                    fileSubstansi={data.file}
                    isHideFile={
                        !userRoles.includes("Operator") &&
                        !userRoles.includes("Super Admin")
                    }
                />

                {userRoles.includes("Operator") ||
                userRoles.includes("Super Admin") ? (
                    <>
                        <DetailKetua
                            nama={`${data.lecturer_name.nama_lengkap} (${data.lecturer_name.nidn})`}
                            jafung={data.lecturer_name.jafung}
                            prodi={data.lecturer_name.studyprogram.name}
                            email={data.lecturer_name.email}
                            publikasi={data.lecturer_name.publikasi}
                            hki={data.lecturer_name.hki}
                            buku={data.lecturer_name.buku}
                            sintaId={data.lecturer_name.id_sinta}
                            sintaScore={data.lecturer_name.sinta_score}
                        />

                        <DetailAnggotaDosen lecturers={data.anggota_dosen} />

                        <DetailAnggotaMahasiswa
                            students={data.anggota_mahasiswa}
                        />
                    </>
                ) : null}

                {userRoles.includes("Operator") ||
                userRoles.includes("Super Admin") ? (
                    <>
                        <DetailLuaran
                            title="Luaran Wajib"
                            luarans={data.luaran_wajib}
                        />

                        <DetailLuaran
                            title="Luaran Tambahan"
                            luarans={data.luaran_tambahan}
                        />
                    </>
                ) : null}

                <DetailAnggaran anggarans={data.anggaran} />

                <DetailMitra
                    tahun={data.skema_name.tahun}
                    mitras={data.mitra}
                    isHideFile={
                        !userRoles.includes("Operator") &&
                        !userRoles.includes("Super Admin")
                    }
                />
            </div>
        );
    };

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                {isHideTimeline ? (
                    <div className="col-span-12 md:col-span-12">
                        {dataRender()}
                    </div>
                ) : (
                    <>
                        <div className="col-span-12 md:col-span-3">
                            <ProgressProposal
                                status={data.status}
                                isPublished={data.is_published}
                                statusAdministrasi={data.konfirmasi_administrasi.is_approved}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-9">
                            {dataRender()}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default DetailProposal;
