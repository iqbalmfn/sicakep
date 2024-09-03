import { router, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const handleDelete = async (
    routeDelete,
    dataId,
    message,
    preserveScroll = false
) => {
    try {
        const result = await Swal.fire({
            title: "Konfirmasi Hapus",
            text: "Apakah Anda yakin ingin menghapus data ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "var(--color-danger)",
            cancelButtonColor: "var(--color-info)",
        });

        if (result.isConfirmed) {
            router.delete(route(routeDelete, dataId), {
                onSuccess: () => {
                    toast.success(message, {
                        isLoading: false,
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        closeButton: false,
                    });
                },
                preserveScroll: preserveScroll,
            });
        }
    } catch (error) {
        // Tangani kesalahan jika diperlukan
        console.error(error);
        Swal.fire("Error", "Terjadi kesalahan", "error");
    }
};

export const handleDeleteWithParams = async (
    routeDelete,
    params,
    message,
    preserveScroll = false
) => {
    try {
        const result = await Swal.fire({
            title: "Konfirmasi Hapus",
            text: "Apakah Anda yakin ingin menghapus data ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        });

        if (result.isConfirmed) {
            router.delete(route(routeDelete, params), {
                onSuccess: () => {
                    toast.success(message, {
                        isLoading: false,
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        closeButton: false,
                    });
                },
                preserveScroll: preserveScroll,
            });
        }
    } catch (error) {
        // Tangani kesalahan jika diperlukan
        console.error(error);
        Swal.fire("Error", "Terjadi kesalahan", "error");
    }
};

export const handleBayar = async (
    routeBayar,
    dataId,
    message,
    preserveScroll = false
) => {
    try {
        const result = await Swal.fire({
            title: "Konfirmasi Bayar",
            text: "Apakah Anda yakin akan telah membayar utang ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Bayar",
            cancelButtonText: "Batal",
            confirmButtonColor: "var(--color-success)",
            cancelButtonColor: "var(--color-info)",
        });

        if (result.isConfirmed) {
            router.put(
                route(routeBayar, dataId),
                {},
                {
                    onSuccess: () => {
                        toast.success(message, {
                            isLoading: false,
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            closeButton: false,
                        });
                    },
                    preserveScroll: preserveScroll,
                }
            );
        }
    } catch (error) {
        // Tangani kesalahan jika diperlukan
        console.error(error);
        Swal.fire("Error", "Terjadi kesalahan", "error");
    }
};

export const getSerialNumber = (currentPage, perPage, index) => {
    return (currentPage - 1) * perPage + index + 1;
};

export const capitalizeFirstLetter = (string) => {
    const letter = string.toLowerCase().split(" ");
    for (let i = 0; i < letter.length; i++) {
        letter[i] = letter[i].charAt(0).toUpperCase() + letter[i].slice(1);
    }
    return letter.join(" ");
};

export const truncate = (str, num) => {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
};

export function listYears(count = 10) {
    const { tahunPelaksanaan } = usePage().props;

    const currentYear = tahunPelaksanaan
        ? tahunPelaksanaan
        : new Date().getFullYear();
    const years = [];

    for (let i = 0; i <= count; i++) {
        years.push(currentYear - i);
    }

    return years;
}

export function listMonths() {
    const months = [
        { value: "01", label: "Januari" },
        { value: "02", label: "Februari" },
        { value: "03", label: "Maret" },
        { value: "04", label: "April" },
        { value: "05", label: "Mei" },
        { value: "06", label: "Juni" },
        { value: "07", label: "Juli" },
        { value: "08", label: "Agustus" },
        { value: "09", label: "September" },
        { value: "10", label: "Oktober" },
        { value: "11", label: "November" },
        { value: "12", label: "Desember" },
    ];

    return months;
}

export function monthNumberToIndonesian(monthNumber) {
    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    // Mengonversi string bulan ke angka dan menyesuaikan indeks (0-11)
    const index = parseInt(monthNumber, 10) - 1;

    // Pastikan indeks valid (0-11)
    if (index >= 0 && index < 12) {
        return months[index];
    } else {
        return "Bulan tidak valid";
    }
}

export function getCurrentMonthYear() {
    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    const now = new Date();
    const month = now.getMonth(); // Mendapatkan bulan saat ini (0-11)
    const year = now.getFullYear(); // Mendapatkan tahun saat ini (4-digit)

    return `${months[month]} ${year}`;
}

export function getCurrentMonth() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    return month;
}

export function getCurrentYear() {
    const now = new Date();
    const year = now.getFullYear();
    return year;
}

export const formatDate = (tanggal) => {
    let date = new Date(tanggal);

    let formattedDate = date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return formattedDate;
};

export const formatDateYear = (tanggal) => {
    let date = new Date(tanggal);

    let formattedDate = date.toLocaleDateString("id-ID", {
        year: "numeric",
    });

    return formattedDate;
};

export const formatDateWithDay = (tanggal) => {
    let date = new Date(tanggal);

    let formattedDate = date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return formattedDate;
};

export const formatDateTime = (tanggal) => {
    let date = new Date(tanggal);

    let formattedDate = date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    let formattedTime = date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return `${formattedDate}, ${formattedTime} WIB`;
};

export function formatRupiah(angka, isCurrency = false) {
    // Ubah semua input ke string, lalu ke number
    const number = Number(angka.toString().replace(/[^0-9.-]+/g, ""));
    if (isNaN(number)) {
        return ""; // Mengembalikan string kosong jika input bukan angka yang valid
    }
    return number
        .toLocaleString("id-ID", { style: "currency", currency: "IDR" })
        .replace(/\,00$/, isCurrency ? ",00" : "");
}

export const formatText = (text) => {
    const newText = text.split("\n").map((str, index, array) => (
        <span key={index}>
            {str}
            {index === array.length - 1 ? null : <br />}
        </span>
    ));

    return <>{newText}</>;
};

export function diffForHumans(date) {
    const now = new Date();
    const tanggal = new Date(date);
    const localTime = new Date(now.setHours(now.getHours()));
    const diffInSeconds = (tanggal - localTime) / 1000;

    let postfix = "lagi";
    let roundingFunction = Math.ceil;

    if (diffInSeconds < 0) {
        postfix = "yang lalu";
        roundingFunction = Math.floor;
    }

    const absDiffInSeconds = Math.abs(diffInSeconds);

    if (absDiffInSeconds < 60) {
        return `beberapa detik ${postfix}`;
    }

    const absDiffInMinutes = absDiffInSeconds / 60;
    if (absDiffInMinutes < 60) {
        return `${roundingFunction(absDiffInMinutes)} menit ${postfix}`;
    }

    const absDiffInHours = absDiffInMinutes / 60;
    if (absDiffInHours < 24) {
        return `${roundingFunction(absDiffInHours)} jam ${postfix}`;
    }

    const absDiffInDays = roundingFunction(absDiffInHours / 24);
    if (absDiffInDays < 30) {
        return `${absDiffInDays} hari ${postfix}`;
    }

    let absDiffInMonths = Math.floor(absDiffInDays / 30);
    if (absDiffInDays % 30 > 15) {
        absDiffInMonths += 1;
    }

    if (absDiffInMonths < 12) {
        return `${absDiffInMonths} bulan ${postfix}`;
    }

    const absDiffInYears = roundingFunction(absDiffInMonths / 12);
    return `${absDiffInYears} tahun ${postfix}`;
}

export function ucwords(str) {
    return str.replace(/(^|\s)\S/g, function (l) {
        return l.toUpperCase();
    });
}

export const backgroundLight = (color, opacity) => {
    function hexToRgbA(hex, alpha = 1) {
        let r, g, b;
        if (hex.length == 7) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        } else if (hex.length == 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        }
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const bgColorRaw = getComputedStyle(
        document.documentElement
    ).getPropertyValue(color);

    const bgColor = hexToRgbA(bgColorRaw.trim(), opacity);

    return bgColor;
};

export function makeSlug(str) {
    return str
        .toLowerCase() // Ubah semua karakter menjadi huruf kecil
        .replace(/[^a-z0-9]+/g, "-") // Ganti semua karakter non-alfanumerik dengan tanda "-"
        .replace(/^-+/, "") // Hapus tanda "-" dari awal string
        .replace(/-+$/, ""); // Hapus tanda "-" dari akhir string
}

export const downloadFile = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
};

export const numberFormat = (number) => {
    // Mengubah nilai menjadi 0 jika NaN
    if (isNaN(number)) {
        return 0;
    }

    const formatter = new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0, // Minimum 0 digit desimal
        maximumFractionDigits: 2, // Maksimum 2 digit desimal
    });

    return formatter.format(number);
};

export function calculateProposalDuration(
    tahunSkema,
    tahunPelaksanaanProposal,
    tahunPelaksanaanKalender
) {
    // Menghitung tahun ke berdasarkan tahun skema dan tahun saat ini
    const tahunKe = tahunPelaksanaanProposal - tahunPelaksanaanKalender + 1;

    // Membentuk label berdasarkan tahun ke dan tahun skema
    let label;
    if (tahunKe > tahunSkema) {
        label = null;
    } else {
        label = `Tahun ke-${tahunKe} dari ${tahunSkema} Tahun`;
    }

    return label;
}

export const yearsAt = (tahunPelaksanaanProposal, tahunPelaksanaanKalender) => {
    const tahunKe = tahunPelaksanaanProposal - tahunPelaksanaanKalender + 1;

    return tahunKe;
};

export function nl2br(str) {
    return str.replace(/(?:\r\n|\r|\n)/g, "<br>");
}

export const getFilterLabel = (params) => {
    const bulan = params.bulan;
    const tahun = params.tahun;

    if ((bulan && bulan != "all") && (tahun && tahun !== "all")) {
        return `[${monthNumberToIndonesian(bulan)} ${tahun}]`;
    } else if (!bulan && !tahun) {
        return `[${monthNumberToIndonesian(
            getCurrentMonth()
        )} ${getCurrentYear()}]`;
    } else if (bulan && bulan != "all" && !tahun) {
        return `[${monthNumberToIndonesian(bulan)} ${getCurrentYear()}]`;
    } else if (
        (!bulan && tahun) ||
        (bulan == "all" && !tahun) ||
        (bulan == "all" && tahun !== "all")
    ) {
        return `[Tahun ${tahun ? tahun : getCurrentYear()}]`;
    } else if (bulan === "all" && tahun === "all") {
        return "[Semua Data]";
    }
    return null;
};
