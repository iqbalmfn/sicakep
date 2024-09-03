import { formatRupiah } from "@/Utils/GlobalFunction";
import ReactApexChart from "react-apexcharts";

const ChartPengeluaranBulanan = ({ chartData }) => {
    console.log(chartData.details);

    const series = [
        {
            name: "Pengeluaran",
            data: chartData.data,
        },
    ];

    const options = {
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
        colors: ['#125fa3'],
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
            row: {
                colors: ["#f3f3f3", "transparent"],
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
