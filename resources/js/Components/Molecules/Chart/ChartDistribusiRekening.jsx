import { formatRupiah } from "@/Utils/GlobalFunction";
import ReactApexChart from "react-apexcharts";

const ChartDistribusiRekening = ({ aset }) => {
    // Filter out accounts with 0 balance & prepare data
    const filtered = (aset || []).filter((r) => r.saldo > 0);

    const labels = filtered.map((r) => r.nama_rekening);
    const series = filtered.map((r) => r.saldo);

    // Generate neon-friendly palette
    const neonPalette = [
        "#22d3ee", // cyan
        "#a78bfa", // violet
        "#34d399", // emerald
        "#f472b6", // pink
        "#fbbf24", // amber
        "#60a5fa", // blue
        "#f87171", // red
        "#4ade80", // green
    ];

    const colors = filtered.map((_, i) => neonPalette[i % neonPalette.length]);

    const options = {
        theme: { mode: "dark" },
        chart: {
            type: "donut",
            height: 200,
            background: "transparent",
            sparkline: { enabled: false },
        },
        colors,
        labels,
        legend: {
            show: false,
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            y: {
                formatter: (val) => formatRupiah(val),
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "65%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total",
                            color: "#94a3b8",
                            fontSize: "11px",
                            formatter: (w) =>
                                formatRupiah(
                                    w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                                ),
                        },
                    },
                },
            },
        },
        stroke: {
            colors: ["transparent"],
        },
    };

    const totalSaldo = series.reduce((a, b) => a + b, 0);

    return (
        <div className="flex flex-col gap-4 py-4 px-5">
            {filtered.length > 0 ? (
                <>
                    <ReactApexChart
                        options={options}
                        series={series}
                        type="donut"
                        height={200}
                    />
                    {/* Legend List */}
                    <div className="flex flex-col gap-2">
                        {filtered.map((rek, i) => {
                            const pct =
                                totalSaldo > 0
                                    ? ((rek.saldo / totalSaldo) * 100).toFixed(1)
                                    : 0;
                            return (
                                <div
                                    key={rek.id}
                                    className="flex items-center justify-between text-xs"
                                >
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: colors[i] }}
                                        />
                                        <span className="text-slate-300 truncate max-w-[120px]">
                                            {rek.nama_rekening}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-slate-400">{pct}%</span>
                                        <span className="text-slate-200 font-medium">
                                            {formatRupiah(rek.saldo)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                    <span className="text-4xl">🏦</span>
                    <p className="text-slate-500 text-sm">Belum ada data rekening</p>
                </div>
            )}
        </div>
    );
};

export default ChartDistribusiRekening;
