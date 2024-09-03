import FormSelectPrefix from "@/Components/Atoms/FormSelectPrefix";
import Icon from "@/Components/Atoms/Icon";
import ChartPengeluaranBulanan from "@/Components/Molecules/Chart/ChartPengeluaranBulanan";
import ChartPengeluaranHarian from "@/Components/Molecules/Chart/ChartPengeluaranHarian";
import UseDashboard from "@/Hooks/UseDashboard";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import {
    formatDateWithDay,
    formatRupiah,
    getCurrentMonth,
    getCurrentYear,
    listMonths,
    listYears,
    monthNumberToIndonesian,
} from "@/Utils/GlobalFunction";
import { Head } from "@inertiajs/react";
import clsx from "clsx";

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
            <div className="flex gap-3">
                <div>
                    <FormSelectPrefix
                        prefix={<Icon icon="calendar-month" />}
                        size="sm"
                        name="bulan"
                        value={
                            params.bulan != ""
                                ? params.bulan
                                    ? params.bulan
                                    : getCurrentMonth()
                                : ""
                        }
                        onChange={onHandleFilter}
                        className="w-[150px]"
                    >
                        <option value="">Semua Bulan</option>
                        {listMonths().map((month) => (
                            <option key={month.value} value={month.value}>
                                {month.label}
                            </option>
                        ))}
                    </FormSelectPrefix>
                </div>
                <div>
                    <FormSelectPrefix
                        prefix={<Icon icon="calendar-check" />}
                        size="sm"
                        name="tahun"
                        value={
                            params.tahun != ""
                                ? params.tahun
                                    ? params.tahun
                                    : getCurrentYear()
                                : ""
                        }
                        onChange={onHandleFilter}
                        className="w-[150px]"
                    >
                        <option value="">Semua Tahun</option>
                        {listYears().map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </FormSelectPrefix>
                </div>
            </div>
            <div className="py-5">
                <div className="grid grid-cols-10 gap-5 mb-5">
                    <div className="col-span-10 lg:col-span-8">
                        <div className="grid grid-cols-4 gap-5 mb-5">
                            <div className="col-span-4 lg:col-span-1">
                                <ContentWrapper className="flex flex-col gap-2 pb-6 text-info border border-2 border-info">
                                    <span className="text-xl font-semibold">
                                        Saldo
                                    </span>
                                    <span className="text-3xl font-bold">
                                        {formatRupiah(data.totalSaldo)}
                                    </span>
                                </ContentWrapper>
                            </div>
                            <div className="col-span-4 lg:col-span-1">
                                <ContentWrapper className="flex flex-col gap-2 pb-6 text-success border border-2 border-success">
                                    <span className="text-xl font-semibold">
                                        Total Pemasukan{" "}
                                        <span className="text-xs">
                                            {params.bulan
                                                ? `[${monthNumberToIndonesian(
                                                      params.bulan
                                                  )}]`
                                                : null}
                                        </span>
                                    </span>
                                    <span className="text-3xl font-bold">
                                        {formatRupiah(data.totalPemasukan)}
                                    </span>
                                </ContentWrapper>
                            </div>
                            <div className="col-span-4 lg:col-span-1">
                                <ContentWrapper className="flex flex-col gap-2 pb-6 text-danger border border-2 border-danger">
                                    <span className="text-xl font-semibold">
                                        Total Pengeluaran{" "}
                                        <span className="text-xs">
                                            {params.bulan
                                                ? `[${monthNumberToIndonesian(
                                                      params.bulan
                                                  )}]`
                                                : null}
                                        </span>
                                    </span>
                                    <span className="text-3xl font-bold">
                                        {formatRupiah(data.totalPengeluaran)}
                                    </span>
                                </ContentWrapper>
                            </div>
                            <div className="col-span-4 lg:col-span-1">
                                <ContentWrapper className="flex flex-col gap-2 pb-6 text-warning border border-2 border-warning">
                                    <span className="text-xl font-semibold">
                                        Total Utang{" "}
                                        <span className="text-xs">
                                            {params.bulan
                                                ? `[${monthNumberToIndonesian(
                                                      params.bulan
                                                  )}]`
                                                : null}
                                        </span>
                                    </span>
                                    <span className="text-3xl font-bold">
                                        {formatRupiah(data.totalUtang)}
                                    </span>
                                </ContentWrapper>
                            </div>
                        </div>
                        {/* Chart */}
                        <div className="grid grid-cols-8 gap-5 mb-5">
                            <div className="col-span-8 lg:col-span-5">
                                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <div className="border-b py-4 px-5">
                                        <span className="text-lg font-bold">
                                            Pengeluaran Harian{" "}
                                            {params.bulan
                                                ? `Bulan ${monthNumberToIndonesian(
                                                      params.bulan
                                                  )}`
                                                : `Bulan ${monthNumberToIndonesian(
                                                      getCurrentMonth()
                                                  )}`}
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
                                            {params.tahun
                                                ? `Tahun ${params.tahun}`
                                                : `Tahun ${getCurrentYear()}`}
                                        </span>
                                    </div>
                                    <ChartPengeluaranBulanan
                                        chartData={data.ChartPengeluaranBulanan}
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
                                        Utang Bulan{" "}
                                        {params.bulan
                                            ? `${monthNumberToIndonesian(
                                                  params.bulan
                                              )}`
                                            : `${monthNumberToIndonesian(
                                                  getCurrentMonth()
                                              )}`}
                                    </span>
                                    {data.listUtang.length > 0 ? (
                                        <span>[{data.listUtang.length}]</span>
                                    ) : null}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 py-4 px-3">
                                {data.listUtang.length > 0 ? (
                                    data.listUtang.map((utang) => (
                                        <div
                                            className={clsx(
                                                utang.status == 1
                                                    ? "border-success"
                                                    : "border-danger",
                                                "border rounded"
                                            )}
                                            key={utang.id}
                                        >
                                            <div
                                                className={clsx(
                                                    utang.status == 1
                                                        ? "bg-success"
                                                        : "bg-danger",
                                                    "text-white text-center py-1"
                                                )}
                                            >
                                                {utang.status == 1
                                                    ? "Lunas"
                                                    : "Belum Lunas"}
                                            </div>
                                            <div
                                                className={clsx(
                                                    utang.status == 1
                                                        ? "text-success"
                                                        : "text-danger",
                                                    "flex flex-col text-[13px]  px-3 py-2"
                                                )}
                                            >
                                                <div className="font-bold">
                                                    <i className="bi bi-info-circle me-3"></i>
                                                    <span>{utang.judul}</span>
                                                </div>
                                                <div>
                                                    <i className="bi bi-calendar me-3"></i>
                                                    <span>
                                                        {formatDateWithDay(
                                                            utang.jatuh_tempo
                                                        )}
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="bi bi-currency-dollar me-3"></i>
                                                    <span>
                                                        {formatRupiah(
                                                            utang.nominal
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded bg-success text-white text-center p-5">
                                        Tidak Ada Utang
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppContentLayout>
    );
}
