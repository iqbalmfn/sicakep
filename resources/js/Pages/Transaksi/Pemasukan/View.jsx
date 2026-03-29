import Breadcrumbs from "@/Components/Atoms/Breadcrumbs";
import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import {
    formatDateWithDay,
    formatRupiah,
    monthNumberToIndonesian,
} from "@/Utils/GlobalFunction";
import { Head, Link } from "@inertiajs/react";
import { Fragment } from "react";

const View = ({ title, breadcrumbs, datas }) => {
    return (
        <AppContentLayout>
            <Head title={title} />
            <Breadcrumbs title={title} breadcrumbs={breadcrumbs} />
            <ContentWrapper>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Link href={route("transaksi.pemasukan.index")}>
                            <Button size="sm" variant="danger">
                                <Icon icon="chevron-left" /> Kembali
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="border-t border-white/10 my-5 pt-3">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-100">
                            Laporan Pemasukan
                        </h3>
                        <h5 className="text-lg font-bold text-slate-100">
                            Bulan {monthNumberToIndonesian(datas.bulan)} Tahun{" "}
                            {datas.tahun}
                        </h5>
                    </div>
                    <div className="my-3 overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="bg-slate-800">
                                    <th
                                        className="border border-white/10 px-3 py-2 text-slate-300 text-center"
                                        width="3%"
                                    >
                                        No
                                    </th>
                                    <th className="border border-white/10 px-3 py-2 text-slate-300">
                                        Judul
                                    </th>
                                    <th className="border border-white/10 px-3 py-2 text-slate-300">
                                        Penerima Dana
                                    </th>
                                    <th className="border border-white/10 px-3 py-2 text-slate-300">
                                        Tanggal
                                    </th>
                                    <th className="border border-white/10 px-3 py-2 text-slate-300">
                                        Jenis
                                    </th>
                                    <th
                                        className="border border-white/10 px-3 py-2 text-slate-300 text-end"
                                        width="15%"
                                    >
                                        Nominal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.kategori_list.length > 0 ? (
                                    datas.kategori_list.map((kategori, i) => (
                                        <Fragment key={i}>
                                            <tr>
                                                <td
                                                    colSpan={6}
                                                    className="border border-white/10 px-3 py-1 text-info font-bold bg-info/20"
                                                >
                                                    {kategori.kategori}
                                                </td>
                                            </tr>
                                            {kategori.list.map((transaksi, idx) => (
                                                <tr key={idx} className="text-slate-300 hover:bg-white/5">
                                                    <td className="border border-white/10 px-3 py-1 text-center">
                                                        {idx + 1}
                                                    </td>
                                                    <td className="border border-white/10 px-3 py-1">
                                                        {transaksi.judul}
                                                    </td>
                                                    <td className="border border-white/10 px-3 py-1">
                                                        {transaksi.user.name}
                                                    </td>
                                                    <td className="border border-white/10 px-3 py-1">
                                                        {formatDateWithDay(transaksi.tanggal)}
                                                    </td>
                                                    <td className="border border-white/10 px-3 py-1">
                                                        {transaksi.jenis}
                                                    </td>
                                                    <td className="border border-white/10 px-3 py-1 text-end">
                                                        {formatRupiah(transaksi.nominal)}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="font-semibold text-slate-300 bg-white/5">
                                                <td
                                                    colSpan={5}
                                                    className="border border-white/10 px-3 py-1 text-right"
                                                >
                                                    Sub Total
                                                </td>
                                                <td className="border border-white/10 px-3 py-1 text-end">
                                                    {formatRupiah(kategori.sub_total)}
                                                </td>
                                            </tr>
                                        </Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-5 text-slate-400 border border-white/10">
                                            Tidak ada data pemasukan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr className="bg-success/20 text-success font-extrabold text-md">
                                    <td
                                        colSpan={5}
                                        className="border border-white/10 px-3 py-2 text-start"
                                    >
                                        Total Pemasukan
                                    </td>
                                    <td className="border border-white/10 px-3 py-2 text-end">
                                        {formatRupiah(datas.total)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </ContentWrapper>
        </AppContentLayout>
    );
};

export default View;
