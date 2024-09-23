import ChartPemasukanBulanan from "@/Components/Molecules/Chart/ChartPemasukanBulanan";
import ChartPengeluaranBulanan from "@/Components/Molecules/Chart/ChartPengeluaranBulanan";
import ChartPengeluaranHarian from "@/Components/Molecules/Chart/ChartPengeluaranHarian";
import ChartPengeluaranKategori from "@/Components/Molecules/Chart/ChartPengeluaranKategori";
import UseDashboard from "@/Hooks/UseDashboard";
import AppContentLayout from "@/Layouts/AppContentLayout";
import {
    getCurrentYear,
    getFilterLabel
} from "@/Utils/GlobalFunction";
import { Head } from "@inertiajs/react";
import DashboardAset from "./DashboardPartial/DashboardAset";
import Filter from "./DashboardPartial/Filter";
import ListKategoriPengeluaran from "./DashboardPartial/ListKategoriPengeluaran";
import ListUtang from "./DashboardPartial/ListUtang";
import Widget from "./DashboardPartial/Widget";

export default function Dashboard({ auth, data, filtered }) {
    const { params, onHandleFilter } = UseDashboard(filtered);

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
                    <div className="col-span-10 lg:col-span-8">
                        <div className="grid grid-cols-2 gap-5 mb-5">
                            <Widget data={data} params={params} />
                            <DashboardAset data={data} />
                        </div>
                        {/* Chart */}
                        <div className="grid grid-cols-8 gap-5 mb-5">
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
                                    <div className="border-b py-4 px-5">
                                        <span className="text-lg font-bold">
                                            Pengeluaran Bulanan{" "}
                                            {params.tahun &&
                                            params.tahun != "all"
                                                ? `[Tahun ${params.tahun}]`
                                                : `[Tahun ${getCurrentYear()}]`}
                                        </span>
                                    </div>
                                    <ChartPengeluaranBulanan
                                        chartData={data.ChartPengeluaranBulanan}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-5 mb-5">
                            <div className="col-span-8 lg:col-span-5">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
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
                                    <div className="border-b py-4 px-5">
                                        <span className="text-lg font-bold">
                                            Pemasukan Bulanan{" "}
                                            {params.tahun &&
                                            params.tahun != "all"
                                                ? `[Tahun ${params.tahun}]`
                                                : `[Tahun ${getCurrentYear()}]`}
                                        </span>
                                    </div>
                                    <ChartPemasukanBulanan
                                        chartData={data.ChartPemasukanBulanan}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-10 lg:col-span-2">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="border-b py-4 px-5">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold">
                                        Utang {getFilterLabel(params)}
                                    </span>
                                    {data.listUtang.length > 0 ? (
                                        <span>[{data.listUtang.length}]</span>
                                    ) : null}
                                </div>
                            </div>
                            <ListUtang data={data.listUtang} />
                        </div>
                    </div>
                </div>
            </div>
        </AppContentLayout>
    );
}
