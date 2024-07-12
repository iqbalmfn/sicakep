import AlertContent from "@/Components/Atoms/AlertContent";
import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import LaporanLuaran from "@/Pages/Proposal/LaporanAkhir/Edit/Partials/LaporanLuaran";
import LaporanPoster from "@/Pages/Proposal/LaporanAkhir/Edit/Partials/LaporanPoster";
import LaporanVideo from "@/Pages/Proposal/LaporanAkhir/Edit/Partials/LaporanVideo";
import { downloadFile, ucwords } from "@/Utils/GlobalFunction";

const DetailProposalMonev100 = ({ data, userRoles }) => {
    const tahun =
        data.tahun_pelaksanaan - data.kalender_name.tahun_pelaksanaan + 1;

    const luaranWajib = data.luaran_wajib.filter(
        (luaran) => luaran.tahun == tahun
    );
    const luaranTambahan = data.luaran_tambahan.filter(
        (luaran) => luaran.tahun == tahun
    );

    const substansiLaporanRender = () => {
        return data.laporan_akhir?.substansi ? (
            <div>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal_laporan_akhir/substansi/${data.laporan_akhir?.substansi?.file}`,
                            data.laporan_akhir?.substansi?.file
                        )
                    }
                    disabled={!data.laporan_akhir?.substansi?.file}
                >
                    <Icon icon="file-earmark-pdf-fill" me={2} /> Substansi
                    Laporan
                </Button>
            </div>
        ) : null;
    };

    const realisasiMitraRender = () => {
        return data.laporan_akhir?.mitra ? (
            <div>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal_laporan_akhir/mitra/${data.laporan_akhir?.mitra?.file}`,
                            data.laporan_akhir?.mitra?.file
                        )
                    }
                    disabled={!data.laporan_akhir?.mitra?.file}
                >
                    <Icon icon="file-earmark-pdf-fill" me={2} /> Realisasi
                    Keterlibatan Mitra
                </Button>
            </div>
        ) : null;
    };

    const posterRender = () => {
        return data.laporan_akhir?.poster ? (
            <div>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal_laporan_akhir/poster/${data.laporan_akhir?.poster?.file}`,
                            data.laporan_akhir?.poster?.file
                        )
                    }
                    disabled={!data.laporan_akhir?.poster?.file}
                >
                    <Icon icon="file-earmark-pdf-fill" me={2} /> Poster{" "}
                    {ucwords(data.jenis)}
                </Button>
            </div>
        ) : null;
    };

    const slideRender = () => {
        return data.laporan_akhir?.slide ? (
            <div>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal_laporan_akhir/slide/${data.laporan_akhir?.slide?.file}`,
                            data.laporan_akhir?.slide?.file
                        )
                    }
                    disabled={!data.laporan_akhir?.slide?.file}
                >
                    <Icon icon="file-earmark-pdf-fill" me={2} /> Slide{" "}
                    {ucwords(data.jenis)}
                </Button>
            </div>
        ) : null;
    };

    const penggunaanAnggaranRender = () => {
        return data.laporan_akhir?.anggaran ? (
            <div>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal_laporan_akhir/penggunaan_anggaran_submit/${data.laporan_akhir?.anggaran?.file}`,
                            data.laporan_akhir?.anggaran?.file
                        )
                    }
                    disabled={!data.laporan_akhir?.anggaran?.file}
                >
                    <Icon icon="file-earmark-pdf-fill" me={2} /> Penggunaan
                    Anggaran
                </Button>
            </div>
        ) : null;
    };

    const dataRender = () => {
        return (
            <div className="flex flex-col gap-10 mt-8 pb-5">
                <div className="flex flex-col gap-5">
                    <AlertContent title="Dokumen" color="--color-info" />
                    <div className="flex flex-col md:flex-row gap-3">
                        {substansiLaporanRender()}
                        {realisasiMitraRender()}
                        {posterRender()}
                        {slideRender()}
                        {penggunaanAnggaranRender()}
                    </div>
                </div>

                {data.laporan_akhir?.video ? (
                    <div className="flex flex-col gap-5">
                        <AlertContent
                            title={`Video Proses Pengembangan dan Hasil ${ucwords(
                                data.jenis
                            )}`}
                            color="--color-info"
                        />
                        <div className="mt-2">
                            <a
                                href={data.laporan_akhir?.video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary px-4 py-2 border border-primary rounded-lg hover:bg-primary hover:text-white transition-all ease-in-out duration-150"
                            >
                                {data.laporan_akhir?.video.url}
                            </a>
                        </div>
                    </div>
                ) : null}

                <div className="flex flex-col gap-5">
                    <AlertContent title="Luaran Wajib" color="--color-info" />
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full -mt-8">
                            <LaporanLuaran
                                datas={luaranWajib}
                                jenis={data.jenis}
                                laporanId={data.laporan_akhir?.id}
                                isView
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 -mt-5">
                    <AlertContent
                        title="Luaran Tambahan"
                        color="--color-info"
                    />
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full -mt-8">
                            <LaporanLuaran
                                datas={luaranTambahan}
                                jenis={data.jenis}
                                laporanId={data.laporan_akhir?.id}
                                isView
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 -mt-5">
                    <AlertContent
                        title="Luaran Tambahan"
                        color="--color-info"
                    />
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="w-full -mt-8">
                            <LaporanLuaran
                                datas={luaranTambahan}
                                jenis={data.jenis}
                                laporanId={data.laporan_akhir?.id}
                                isView
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-12">{dataRender()}</div>
        </div>
    );
};

export default DetailProposalMonev100;
