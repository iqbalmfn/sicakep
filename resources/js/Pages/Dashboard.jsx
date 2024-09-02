import ChartPengeluaranBulanan from "@/Components/Molecules/Chart/ChartPengeluaranBulanan";
import ChartPengeluaranHarian from "@/Components/Molecules/Chart/ChartPengeluaranHarian";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import { formatRupiah } from "@/Utils/GlobalFunction";
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, data }) {
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

            <div className="py-5">
                <div className="grid grid-cols-4 gap-5 mb-5">
                    <div className="col-span-4 lg:col-span-1">
                        <ContentWrapper className="flex flex-col gap-2 pb-6 text-info border border-2 border-info">
                            <span className="text-xl font-semibold">
                                Saldo
                            </span>
                            <span className="text-4xl font-bold">
                                {formatRupiah(data.totalSaldo)}
                            </span>
                        </ContentWrapper>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-5 mb-5">
                    <div className="col-span-3 lg:col-span-2">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="border-b py-4 px-5">
                                <span className="text-lg font-bold">
                                    Pengeluaran Harian
                                </span>
                            </div>
                            <ChartPengeluaranHarian
                                chartData={data.ChartPengeluaranHarian}
                            />
                        </div>
                    </div>
                    <div className="col-span-3 lg:col-span-1">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="border-b py-4 px-5">
                                <span className="text-lg font-bold">
                                    Pengeluaran Bulanan
                                </span>
                            </div>
                            <ChartPengeluaranBulanan
                                chartData={data.ChartPengeluaranBulanan}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppContentLayout>
    );
}
