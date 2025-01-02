import { formatRupiah } from "@/Utils/GlobalFunction";
import ReactApexChart from "react-apexcharts";

const ChartPengeluaranKategori = ({ chartData }) => {
    const series = chartData.data; // Data pengeluaran tiap kategori

    const options = {
        chart: {
            type: "donut",
            height: 330,
        },
        labels: chartData.categories,
        legend: {
            show: false, // Menyembunyikan legend
        },
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                const percent = chartData.persentase[opts.seriesIndex];
                return `${percent.toFixed(1)}%`;
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return `${formatRupiah(val)}`;
                },
            },
        },
        colors: chartData.colors,
        plotOptions: {
            pie: {
                donut: {
                    size: "50%",
                },
            },
        },
    };

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="donut"
            height={330}
        />
    );
};

export default ChartPengeluaranKategori;
