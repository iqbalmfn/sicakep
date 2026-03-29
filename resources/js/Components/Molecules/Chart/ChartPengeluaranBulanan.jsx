import { formatRupiah } from "@/Utils/GlobalFunction";
import ReactApexChart from "react-apexcharts";

const ChartPengeluaranBulanan = ({ chartData }) => {
    const series = [
        {
            name: "Pengeluaran",
            data: chartData.data,
        },
    ];

    const options = {
        theme: { mode: 'dark' },
        chart: {
            height: 325,
            type: "bar",
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: true,
                tools: {
                    download: false,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true,
                },
            },
        },
        colors: ['#ff0055'], // neon red/pink
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'rounded'
            },
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        grid: {
            borderColor: "rgba(255,255,255,0.1)",
            row: {
                colors: ["transparent", "transparent"],
                opacity: 0.5,
            },
        },
        xaxis: {
            categories: chartData.categories,
            title: {
                text: "Bulan",
            },
        },
        yaxis: {
            title: {
                text: "Nominal",
            },
            min: 0
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return `${formatRupiah(val)}`;
                },
            },
        },
    };

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={325}
        />
    );
};

export default ChartPengeluaranBulanan;
