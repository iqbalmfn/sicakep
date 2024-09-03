import { formatRupiah } from "@/Utils/GlobalFunction";
import ReactApexChart from "react-apexcharts";

const ChartPengeluaranHarian = ({ chartData }) => {
    // Validasi data untuk memastikan tidak ada nilai 0 di akhir yang tidak diinginkan
    const validatedData = chartData.data.map((value, index) => {
        // Anda bisa menambahkan logika validasi khusus di sini, misalnya:
        // return value === 0 && index === chartData.data.length - 1 ? previousValue : value;
        return value; // Memastikan nilainya sesuai
    });

    const series = [
        {
            name: "Pengeluaran",
            data: validatedData,
        },
    ];

    const options = {
        chart: {
            height: 325,
            type: "area",
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
        colors: ['#c79324'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: "smooth",
        },
        fill: {
            type: "solid",
            opacity: 0.2, // Opacity untuk area
        },
        grid: {
            row: {
                colors: ["#f3f3f3", "transparent"],
                opacity: 0.5,
            },
        },
        yaxis: {
            title: {
                text: "Nominal",
            },
            min: 0
        },
        xaxis: {
            title: {
                text: "Tanggal",
            },
            categories: chartData.categories,
        },
        tooltip: {
            custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                const selectedCategory = chartData.categories[dataPointIndex];
                const details = chartData.details[selectedCategory] || [];
                let tooltipContent = `<b>Total: ${formatRupiah(
                    series[seriesIndex][dataPointIndex]
                )}</b><br><br>Rincian Pengeluaran:<br>`;

                if (details.length === 0) {
                    tooltipContent += "- Tidak ada rincian pengeluaran<br>";
                } else {
                    details.forEach((detail) => {
                        tooltipContent += `-  <b>${detail.judul}</b> : ${formatRupiah(
                            detail.nominal
                        )}<br>`;
                    });
                }

                return `<div class="custom-tooltip" style="padding:10px;max-width:450px;">${tooltipContent}</div>`;
            },
        },
    };

    return (
        <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={325}
        />
    );
};

export default ChartPengeluaranHarian;
