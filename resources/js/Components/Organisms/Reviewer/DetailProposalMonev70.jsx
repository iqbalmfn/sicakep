import AlertContent from "@/Components/Atoms/AlertContent";
import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import LaporanLuaran from "@/Pages/Proposal/LaporanKemajuan/Edit/Partials/LaporanLuaran";
import { downloadFile, ucwords } from "@/Utils/GlobalFunction";

const DetailProposalMonev70 = ({ data, userRoles }) => {
    const tahun =
        data.tahun_pelaksanaan - data.kalender_name.tahun_pelaksanaan + 1;

    const luaranWajib = data.luaran_wajib.filter(
        (luaran) => luaran.tahun == tahun
    );
    const luaranTambahan = data.luaran_tambahan.filter(
        (luaran) => luaran.tahun == tahun
    );

    const substansiLaporanRender = () => {
        return data.laporan?.substansi ? (
            <div>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal_laporan/substansi/${data.laporan?.substansi?.file}`,
                            data.laporan?.substansi?.file
                        )
                    }
                    disabled={!data.laporan?.substansi?.file}
                >
                    <Icon icon="file-earmark-pdf-fill" me={2} /> Substansi
                    Laporan
                </Button>
            </div>
        ) : null;
    };

    const realisasiMitraRender = () => {
        return data.laporan?.mitra ? (
            <div>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal_laporan/mitra/${data.laporan?.mitra?.file}`,
                            data.laporan?.mitra?.file
                        )
                    }
                    disabled={!data.laporan?.mitra?.file}
                >
                    <Icon icon="file-earmark-pdf-fill" me={2} /> Realisasi
                    Keterlibatan Mitra
                </Button>
            </div>
        ) : null;
    };

    const posterRender = () => {
        return data.laporan?.poster ? (
            <div>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal_laporan/poster/${data.laporan?.poster?.file}`,
                            data.laporan?.poster?.file
                        )
                    }
                    disabled={!data.laporan?.poster?.file}
                >
                    <Icon icon="file-earmark-pdf-fill" me={2} /> Poster{" "}
                    {ucwords(data.jenis)}
                </Button>
            </div>
        ) : null;
    };

    const slideRender = () => {
        return data.laporan?.slide ? (
            <div>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal_laporan/slide/${data.laporan?.slide?.file}`,
                            data.laporan?.slide?.file
                        )
                    }
                    disabled={!data.laporan?.slide?.file}
                >
                    <Icon icon="file-earmark-pdf-fill" me={2} /> Slide{" "}
                    {ucwords(data.jenis)}
                </Button>
            </div>
        ) : null;
    };

    const penggunaanAnggaranRender = () => {
        return data.laporan?.anggaran ? (
            <div>
                <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                        downloadFile(
                            `/storage/proposal_laporan/penggunaan_anggaran_submit/${data.laporan?.anggaran?.file}`,
                            data.laporan?.anggaran?.file
                        )
                    }
                    disabled={!data.laporan?.anggaran?.file}
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
                    <div className="flex flex-col gap-2 -mt-2">
                        <div className="flex gap-2">
                            {!substansiLaporanRender() ? (
                                <span className="border border-warning rounded bg-warning text-white text-xs px-2">
                                    <i className="bi bi-exclamation-triangle me-1"></i>{" "}
                                    Belum upload substansi
                                </span>
                            ) : null}
                            {!posterRender() ? (
                                <span className="border border-warning rounded bg-warning text-white text-xs px-2">
                                    <i className="bi bi-exclamation-triangle me-1"></i>{" "}
                                    Belum upload poster
                                </span>
                            ) : null}
                            {!slideRender() ? (
                                <span className="border border-warning rounded bg-warning text-white text-xs px-2">
                                    <i className="bi bi-exclamation-triangle me-1"></i>{" "}
                                    Belum upload slide
                                </span>
                            ) : null}
                            {!penggunaanAnggaranRender() ? (
                                <span className="border border-warning rounded bg-warning text-white text-xs px-2">
                                    <i className="bi bi-exclamation-triangle me-1"></i>{" "}
                                    Belum upload penggunaan anggaran
                                </span>
                            ) : null}
                        </div>
                        <div className="flex flex-col md:flex-row gap-3">
                            {substansiLaporanRender()}
                            {realisasiMitraRender()}
                            {posterRender()}
                            {slideRender()}
                            {penggunaanAnggaranRender()}
                        </div>
                    </div>
                </div>

                {data.laporan?.video ? (
                    <div className="flex flex-col gap-5">
                        <AlertContent
                            title={`Video Proses Pengembangan dan Hasil ${ucwords(
                                data.jenis
                            )}`}
                            color="--color-info"
                        />
                        <div className="mt-2">
                            <a
                                href={data.laporan?.video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary px-4 py-2 border border-primary rounded-lg hover:bg-primary hover:text-white transition-all ease-in-out duration-150"
                            >
                                {data.laporan?.video.url}
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
                                laporanId={data.laporan?.id}
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
                                laporanId={data.laporan?.id}
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

export default DetailProposalMonev70;
