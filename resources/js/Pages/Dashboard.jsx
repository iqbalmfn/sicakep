import ChartPemasukanBulanan from "@/Components/Molecules/Chart/ChartPemasukanBulanan";
import ChartPengeluaranBulanan from "@/Components/Molecules/Chart/ChartPengeluaranBulanan";
import ChartPengeluaranHarian from "@/Components/Molecules/Chart/ChartPengeluaranHarian";
import ChartPengeluaranKategori from "@/Components/Molecules/Chart/ChartPengeluaranKategori";
import UseDashboard from "@/Hooks/UseDashboard";
import AppContentLayout from "@/Layouts/AppContentLayout";
import {
    formatRupiah,
    getCurrentYear,
    getFilterLabel,
    numberFormat,
    removeMinusSymbol,
} from "@/Utils/GlobalFunction";
import { Head } from "@inertiajs/react";
import DashboardAset from "./DashboardPartial/DashboardAset";
import Filter from "./DashboardPartial/Filter";
import ListKategoriPengeluaran from "./DashboardPartial/ListKategoriPengeluaran";
import ListUtang from "./DashboardPartial/ListUtang";
import Widget from "./DashboardPartial/Widget";
import Icon from "@/Components/Atoms/Icon";
import clsx from "clsx";
import ChartPengeluaranPemasukanBulanan from "@/Components/Molecules/Chart/ChartPengeluaranPemasukanBulanan";
import Table from "@/Components/Organisms/Table";

export default function Dashboard({ auth, data, filtered }) {
    const { params, onHandleFilter } = UseDashboard(filtered);

    console.log(data.ChartPengeluaranBulanan.percentage_changes[11]);

    return (
        <AppContentLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <Filter params={params} onHandleFilter={onHandleFilter} />
            <div className="py-5">
                <div className="grid grid-cols-10 gap-5 mb-5">
                    <div className="col-span-10">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                            <Widget data={data} params={params} />
                            <DashboardAset data={data} />
                            <div className="col-span-5 lg:col-span-1">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="border-b py-4 px-5">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold">
                                                Utang {getFilterLabel(params)}
                                            </span>
                                            {data.listUtang.length > 0 ? (
                                                <span>
                                                    [{data.listUtang.length}]
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <ListUtang data={data.listUtang} />
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="grid grid-cols-8 gap-5 mb-5 mt-5 lg:mt-0">
                            <div className="col-span-8 lg:col-span-5">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="border-b py-4 px-5">
                                        <span className="text-lg font-bold">
                                            Pengeluaran Harian{" "}
                                            {getFilterLabel(params)}
                                        </span>
                                    </div>
                                    <ChartPengeluaranHarian
                                        chartData={data.ChartPengeluaranHarian}
                                    />
                                </div>
                            </div>
                            <div className="col-span-8 lg:col-span-3">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="border-b py-4 px-5 flex justify-between items-center">
                                        <span className="text-lg font-bold">
                                            Pengeluaran Bulanan{" "}
                                            {params.tahun &&
                                            params.tahun != "all"
                                                ? `[Tahun ${params.tahun}]`
                                                : `[Tahun ${getCurrentYear()}]`}
                                        </span>
                                        {data.ChartPengeluaranBulanan
                                            .percentage_changes[
                                            params.bulan - 1
                                        ] != null ? (
                                            <span
                                                className={clsx(
                                                    data.ChartPengeluaranBulanan
                                                        .percentage_changes[
                                                        params.bulan - 1
                                                    ] > 0
                                                        ? "text-danger"
                                                        : "text-success"
                                                )}
                                            >
                                                <Icon
                                                    icon={clsx(
                                                        data
                                                            .ChartPengeluaranBulanan
                                                            .percentage_changes[
                                                            params.bulan - 1
                                                        ] > 0
                                                            ? "arrow-up-circle-fill"
                                                            : "arrow-down-circle-fill"
                                                    )}
                                                    className="me-1"
                                                />
                                                {numberFormat(
                                                    removeMinusSymbol(
                                                        data
                                                            .ChartPengeluaranBulanan
                                                            .percentage_changes[
                                                            params.bulan - 1
                                                        ]
                                                    )
                                                )}
                                                % - {getFilterLabel(params)}
                                            </span>
                                        ) : null}
                                    </div>
                                    <ChartPengeluaranBulanan
                                        chartData={data.ChartPengeluaranBulanan}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-5 mb-5">
                            <div className="col-span-8 lg:col-span-5">
                                <div className="bg-white shadow-sm sm:rounded-lg h-[400px]">
                                    <div className="border-b py-4 px-5">
                                        <span className="text-lg font-bold">
                                            Kategori Pengeluaran{" "}
                                            {getFilterLabel(params)}
                                        </span>
                                    </div>
                                    <div className="flex">
                                        <div className="w-full mt-5">
                                            <ChartPengeluaranKategori
                                                chartData={
                                                    data.ChartPengeluaranKategori
                                                }
                                            />
                                        </div>
                                        <div className="pe-5 py-3 w-full">
                                            <ListKategoriPengeluaran
                                                data={
                                                    data.ChartPengeluaranKategori
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-8 lg:col-span-3">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="border-b py-4 px-5 flex justify-between items-center">
                                        <span className="text-lg font-bold">
                                            Pemasukan Bulanan{" "}
                                            {params.tahun &&
                                            params.tahun != "all"
                                                ? `[Tahun ${params.tahun}]`
                                                : `[Tahun ${getCurrentYear()}]`}
                                        </span>
                                        {data.ChartPemasukanBulanan
                                            .percentage_changes[
                                            params.bulan - 1
                                        ] != null ? (
                                            <span
                                                className={clsx(
                                                    data.ChartPemasukanBulanan
                                                        .percentage_changes[
                                                        params.bulan - 1
                                                    ] > 0
                                                        ? "text-success"
                                                        : "text-danger"
                                                )}
                                            >
                                                <Icon
                                                    icon={clsx(
                                                        data
                                                            .ChartPemasukanBulanan
                                                            .percentage_changes[
                                                            params.bulan - 1
                                                        ] > 0
                                                            ? "arrow-up-circle-fill"
                                                            : "arrow-down-circle-fill"
                                                    )}
                                                    className="me-1"
                                                />
                                                {numberFormat(
                                                    removeMinusSymbol(
                                                        data
                                                            .ChartPemasukanBulanan
                                                            .percentage_changes[
                                                            params.bulan - 1
                                                        ]
                                                    )
                                                )}
                                                % - {getFilterLabel(params)}
                                            </span>
                                        ) : null}
                                    </div>
                                    <ChartPemasukanBulanan
                                        chartData={data.ChartPemasukanBulanan}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-5 mb-5">
                            <div className="col-span-8 lg:col-span-5">
                                <div className="bg-white shadow-sm sm:rounded-lg h-[600px]">
                                    <div className="border-b py-4 px-5">
                                        <span className="text-lg font-bold">
                                            Penggunaan Anggaran{" "}
                                            {params.tahun &&
                                            params.tahun != "all"
                                                ? `[Tahun ${params.tahun}]`
                                                : `[Tahun ${getCurrentYear()}]`}
                                        </span>
                                    </div>
                                    <div className="w-100 p-5">
                                        <Table>
                                            <Table.Thead>
                                                <Table.TrHead>
                                                    <Table.Th width={5}>
                                                        No
                                                    </Table.Th>
                                                    <Table.Th width={15}>
                                                        Bulan
                                                    </Table.Th>
                                                    <Table.Th width={15}>
                                                        Alokasi Anggaran
                                                    </Table.Th>
                                                    <Table.Th width={15}>
                                                        Realisasi
                                                    </Table.Th>
                                                    <Table.Th>
                                                        Progres Penggunaan
                                                        Anggaran
                                                    </Table.Th>
                                                    <Table.Th width={5}>
                                                        Persentase
                                                    </Table.Th>
                                                </Table.TrHead>
                                            </Table.Thead>
                                            <Table.Tbody>
                                                {data.penggunaanAnggaranBulanan.map(
                                                    (data, i) => (
                                                        <Table.TrBody>
                                                            <Table.Td>
                                                                {i + 1}
                                                            </Table.Td>
                                                            <Table.Td>
                                                                {data.bulan}
                                                            </Table.Td>
                                                            <Table.Td>
                                                                {data.anggaran
                                                                    ? formatRupiah(
                                                                          data.anggaran
                                                                      )
                                                                    : "-"}
                                                            </Table.Td>
                                                            <Table.Td>
                                                                {data.pengeluaran
                                                                    ? formatRupiah(
                                                                          data.pengeluaran
                                                                      )
                                                                    : "-"}
                                                            </Table.Td>
                                                            <Table.Td>
                                                                <div
                                                                    className={clsx(
                                                                        "h-[20px] rounded transition-all duration-300", // Tambahkan animasi dan gaya default
                                                                        {
                                                                            "bg-success":
                                                                                data.realisasi <
                                                                                70,
                                                                            "bg-yellow":
                                                                                data.realisasi >=
                                                                                    70 &&
                                                                                data.realisasi <=
                                                                                    100,
                                                                            "bg-danger":
                                                                                data.realisasi >
                                                                                100,
                                                                        }
                                                                    )}
                                                                    style={{
                                                                        width: `${
                                                                            data.realisasi >=
                                                                            100
                                                                                ? 100
                                                                                : data.realisasi ||
                                                                                  0
                                                                        }%`, // Lebar dinamis dengan fallback ke 0 jika `data.realisasi` kosong
                                                                    }}
                                                                ></div>
                                                            </Table.Td>
                                                            <Table.Td
                                                                align="center"
                                                                className={clsx(
                                                                    ``,
                                                                    {
                                                                        "text-success":
                                                                            data.realisasi <
                                                                            70,
                                                                        "text-yellow":
                                                                            data.realisasi >=
                                                                                70 &&
                                                                            data.realisasi <=
                                                                                100,
                                                                        "text-danger font-bold":
                                                                            data.realisasi >
                                                                            100,
                                                                    }
                                                                )}
                                                            >
                                                                {numberFormat(
                                                                    data.realisasi
                                                                )}{" "}
                                                                %
                                                            </Table.Td>
                                                        </Table.TrBody>
                                                    )
                                                )}
                                            </Table.Tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-8 lg:col-span-3">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="border-b py-4 px-5 flex justify-between items-center">
                                        <span className="text-lg font-bold">
                                            Rasio Pengeluaran & Pemasukan
                                            Bulanan{" "}
                                            {params.tahun &&
                                            params.tahun != "all"
                                                ? `[Tahun ${params.tahun}]`
                                                : `[Tahun ${getCurrentYear()}]`}
                                        </span>
                                    </div>
                                    <ChartPengeluaranPemasukanBulanan
                                        chartData={
                                            data.ChartPengeluaranPemasukanBulanan
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppContentLayout>
    );
}
