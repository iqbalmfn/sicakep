import AlertContent from "@/Components/Atoms/AlertContent";
import { usePage } from "@inertiajs/react";

const DetailKetua = ({
    nama,
    jafung,
    prodi,
    email,
    publikasi,
    hki,
    buku,
    sintaId,
    sintaScore,
}) => {
    const { universitas } = usePage().props;

    const countScopus = publikasi.filter(
        (item) => item.sumber === "SCOPUS"
    ).length;
    const countWos = publikasi.filter((item) => item.sumber === "WOS").length;
    const countGaruda = publikasi.filter(
        (item) => item.sumber === "GARUDA"
    ).length;
    const countScholar = publikasi.filter(
        (item) => item.sumber === "SCHOLAR"
    ).length;
    const countHki = hki.length;
    const countBuku = buku.length;

    return (
        <div className="flex flex-col">
            <AlertContent
                title="Identitas Pengusul Ketua"
                color="--color-info"
                className="mb-5"
            />
            <div className="grid grid-cols-2 gap-5 -mt-1">
                <div className="flex flex-col gap-1">
                    <span className="uppercase font-semibold">{nama}</span>
                    <span>
                        {universitas.nm_lemb} ({prodi})
                    </span>
                    <span>Jabatan Fungsional : {jafung}</span>
                    <span>Alamat Surel : {email}</span>
                    <span>ID Sinta : {sintaId}</span>
                    <span>Sinta Score : {sintaScore}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span>Publikasi Artikel Terindex WOS ({countWos})</span>
                    <span>Publikasi Artikel Terindex Scopus ({countScopus})</span>
                    <span>Publikasi Artikel Terindex Garuda ({countGaruda})</span>
                    <span>
                        Publikasi Artikel Terindex Google Scholar ({countScholar})
                    </span>
                    <span>Kekayaan Intelektual ({countHki})</span>
                    <span>Buku ({countBuku})</span>
                </div>
            </div>
        </div>
    );
};

export default DetailKetua;
