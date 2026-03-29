import { formatRupiah } from "@/Utils/GlobalFunction";
import ReactApexChart from "react-apexcharts";

const ChartPengeluaranPemasukanBulanan = ({ chartData }) => {
    const series = [
        {
            name: "Pengeluaran",
            data: chartData.pengeluaran_data,
        },
        {
            name: "Pemasukan",
            data: chartData.pemasukan_data,
        },
    ];

    const options = {
        theme: { mode: 'dark' },
        chart: {
            height: 325,
            type: "area",  // Ganti tipe chart menjadi 'line'
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
        colors: ['#ff0055', '#00ff88'],  // Warna untuk Pengeluaran dan Pemasukan (neon)
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',  // Menambahkan curve untuk garis halus
            width: [4,4],
        },
        fill: {
            opacity: 0.2,  // Atur opacity area menjadi 0.2
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
            min: 0,
        },
        tooltip: {
            shared: true,
            intersect: false,
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
            type="area"  // Ganti tipe chart menjadi 'line'
            height={325}
        />
    );
};

export default ChartPengeluaranPemasukanBulanan;
