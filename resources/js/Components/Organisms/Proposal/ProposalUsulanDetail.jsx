import CatatanProposalPerbaikan from "@/Components/Molecules/Proposal/CatatanProposalPerbaikan";
import DetailAnggaran from "@/Components/Molecules/Proposal/Detail/DetailAnggaran";
import DetailAnggotaDosen from "@/Components/Molecules/Proposal/Detail/DetailAnggotaDosen";
import DetailAnggotaEksternal from "@/Components/Molecules/Proposal/Detail/DetailAnggotaEksternal";
import DetailAnggotaMahasiswa from "@/Components/Molecules/Proposal/Detail/DetailAnggotaMahasiswa";
import DetailInformasi from "@/Components/Molecules/Proposal/Detail/DetailInformasi";
import DetailKetua from "@/Components/Molecules/Proposal/Detail/DetailKetua";
import DetailLuaran from "@/Components/Molecules/Proposal/Detail/DetailLuaran";
import DetailMitra from "@/Components/Molecules/Proposal/Detail/DetailMitra";
import DetailSubstansi from "@/Components/Molecules/Proposal/Detail/DetailSubstansi";

const ProposalUsulanDetail = ({ data, isPerbaikan = false }) => {
    return (
        <div className="flex flex-col gap-10 mt-6">
            {!isPerbaikan ? (
                <>
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
                    />

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

                    <DetailAnggotaMahasiswa students={data.anggota_mahasiswa} />

                    <DetailAnggotaEksternal crews={data.anggota_eksternals} />

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
            {isPerbaikan ? <DetailSubstansi fileSubstansi={data.file} /> : null}

            {isPerbaikan ? (
                <div className="-mt-10 -mb-3">
                    <CatatanProposalPerbaikan
                        catatanAdministrasi={
                            data.konfirmasi_administrasi?.catatan
                        }
                        catatanReviewer={data.hasil_reviewer}
                        catatanHasil={data.catatan_hasil}
                    />
                </div>
            ) : null}

            <DetailAnggaran
                anggarans={data.anggaran}
                dana={data.dana}
                isPerbaikan={isPerbaikan}
            />

            <DetailMitra tahun={data.skema_name.tahun} mitras={data.mitra} />
        </div>
    );
};

export default ProposalUsulanDetail;
