<?php

namespace App\Services;

use App\Models\Kategori;
use App\Models\Transaksi;
use Carbon\Carbon;

class ChartServices
{
    public function chartPengeluaranHarian($bulan = null, $tahun = null)
    {
        // Default bulan dan tahun adalah bulan dan tahun saat ini
        $today = Carbon::now();

        if ($bulan === 'all' && $tahun === 'all') {
            // Jika bulan dan tahun adalah 'all', ambil semua data tanpa filter
            $pengeluaran_query = Transaksi::query()
                ->whereTipe('pengeluaran')
                ->selectRaw('DATE(tanggal) as tanggal, nominal, judul') // Ambil nominal dan judul
                ->orderBy('tanggal')
                ->get();
        } elseif ($bulan === 'all') {
            // Jika bulan 'all', ambil semua bulan pada tahun tertentu
            $tahun = $tahun ?? $today->year;
            $pengeluaran_query = Transaksi::query()
                ->whereTipe('pengeluaran')
                ->whereYear('tanggal', $tahun)
                ->selectRaw('DATE(tanggal) as tanggal, nominal, judul') // Ambil nominal dan judul
                ->orderBy('tanggal')
                ->get();
        } else {
            // Jika tidak ada filter atau filter bulan spesifik, gunakan bulan dan tahun saat ini sebagai default
            $bulan = $bulan ?? $today->month;
            $tahun = $tahun ?? $today->year;

            // Batasi query hingga tanggal hari ini jika tidak ada filter yang diberikan
            if (is_null($bulan) && is_null($tahun)) {
                $pengeluaran_query = Transaksi::query()
                    ->whereTipe('pengeluaran')
                    ->whereMonth('tanggal', $bulan)
                    ->whereYear('tanggal', $tahun)
                    ->whereDate('tanggal', '<=', $today)
                    ->selectRaw('DATE(tanggal) as tanggal, nominal, judul') // Ambil nominal dan judul
                    ->orderBy('tanggal')
                    ->get();
            } else {
                // Ambil data untuk bulan dan tahun tertentu
                $pengeluaran_query = Transaksi::query()
                    ->whereTipe('pengeluaran')
                    ->whereMonth('tanggal', $bulan)
                    ->whereYear('tanggal', $tahun)
                    ->selectRaw('DATE(tanggal) as tanggal, nominal, judul') // Ambil nominal dan judul
                    ->orderBy('tanggal')
                    ->get();
            }
        }

        // Inisialisasi array $categories dan $data
        $categories = [];
        $data = [];
        $detail_pengeluaran = [];

        if ($bulan !== 'all' && $tahun !== 'all') {
            // Jika bulan spesifik dan tidak 'all', batasi tanggal hingga hari ini jika bulan dan tahun saat ini
            $daysInMonth = ($bulan == $today->month && $tahun == $today->year) ? $today->day : Carbon::create($tahun, $bulan)->daysInMonth;

            // Inisialisasi hari di bulan ini hingga hari ini atau akhir bulan jika di masa lalu
            for ($day = 1; $day <= $daysInMonth; $day++) {
                $date = Carbon::create($tahun, $bulan, $day)->format('d-m-Y');
                $categories[] = $date;
                $data[$date] = 0; // Inisialisasi dengan nominal 0
                $detail_pengeluaran[$date] = []; // Inisialisasi detail kosong
            }
        } else {
            // Jika "all", maka hanya inisialisasi berdasarkan tanggal yang ada di query
            foreach ($pengeluaran_query as $pengeluaran) {
                $tanggal = Carbon::parse($pengeluaran->tanggal)->format('d-m-Y');
                if (!in_array($tanggal, $categories)) {
                    $categories[] = $tanggal;
                    $data[$tanggal] = 0; // Inisialisasi dengan nominal 0
                    $detail_pengeluaran[$tanggal] = []; // Inisialisasi detail kosong
                }
            }
        }

        // Mengisi data pengeluaran sesuai tanggalnya
        foreach ($pengeluaran_query as $pengeluaran) {
            $tanggal = Carbon::parse($pengeluaran->tanggal)->format('d-m-Y');
            $data[$tanggal] += $pengeluaran->nominal; // Tambahkan nominal ke tanggal terkait
            $detail_pengeluaran[$tanggal][] = [
                'judul' => $pengeluaran->judul,
                'nominal' => $pengeluaran->nominal,
            ];
        }

        // Mengembalikan response dalam format yang dibutuhkan untuk chart
        return [
            'categories' => $categories,
            'data' => array_values($data), // Ambil nilai array tanpa kunci
            'details' => $detail_pengeluaran, // Detail pengeluaran per tanggal
        ];
    }


    public function chartPengeluaranBulanan($tahun = null)
    {
        $today = Carbon::now();

        if ($tahun === 'all') {
            // Jika tahun 'all', ambil semua data tanpa filter tahun
            $pengeluaran_query = Transaksi::query()
                ->whereTipe('pengeluaran')
                ->selectRaw('YEAR(tanggal) as tahun, MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('tahun', 'bulan')
                ->orderBy('tahun')
                ->orderBy('bulan')
                ->get();
        } else {
            // Jika tidak ada filter, defaultnya adalah tahun sekarang
            $tahun = $tahun ?? $today->year;
            $pengeluaran_query = Transaksi::query()
                ->whereTipe('pengeluaran')
                ->whereYear('tanggal', $tahun)
                ->selectRaw('MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('bulan')
                ->orderBy('bulan')
                ->get();
        }

        // Cek apakah tahun bukan 'all' sebelum menghitung bulan terakhir tahun sebelumnya
        $lastMonthLastYear = null;
        if ($tahun !== 'all') {
            // Ambil data bulan terakhir tahun sebelumnya
            $lastMonthLastYear = Transaksi::query()
                ->whereTipe('pengeluaran')
                ->whereYear('tanggal', (int)$tahun - 1)  // Pastikan $tahun menjadi integer
                ->selectRaw('MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('bulan')
                ->orderByDesc('bulan')
                ->first();
        }

        $categories = [];
        $data = [];
        $percentage_changes = [];
        $months = range(1, 12);

        foreach ($months as $month) {
            $categories[] = Carbon::create($today->year, $month)->format('M');
            $data[$month] = 0;
            $percentage_changes[$month] = null; // Default untuk perubahan persentase adalah null
        }

        foreach ($pengeluaran_query as $pengeluaran) {
            $data[$pengeluaran->bulan] = $pengeluaran->total;
        }

        // Hitung persentase perubahan
        $previousMonthValue = $lastMonthLastYear ? $lastMonthLastYear->total : null;
        foreach ($months as $month) {
            if ($data[$month] > 0) {
                if ($previousMonthValue !== null && $previousMonthValue != 0) {
                    // Hanya hitung persentase jika previousMonthValue tidak nol
                    $percentageChange = ($data[$month] - $previousMonthValue) / $previousMonthValue * 100;
                    $percentage_changes[$month] = round($percentageChange, 2);
                } else {
                    $percentage_changes[$month] = null; // Hindari pembagian dengan nol
                }

                // Update nilai bulan sebelumnya
                $previousMonthValue = $data[$month];
            } else {
                $percentage_changes[$month] = null; // Tidak ada data untuk bulan ini
            }

            // Reset previousMonthValue untuk bulan pertama
            if ($month === 1) {
                $previousMonthValue = $data[$month];
            }
        }

        return [
            'categories' => $categories,
            'data' => array_values($data),
            'percentage_changes' => array_values($percentage_changes),
        ];
    }

    public function chartPemasukanBulanan($tahun = null)
    {
        $today = Carbon::now();

        if ($tahun === 'all') {
            $pemasukan_query = Transaksi::query()
                ->whereTipe('pemasukan')
                ->selectRaw('YEAR(tanggal) as tahun, MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('tahun', 'bulan')
                ->orderBy('tahun')
                ->orderBy('bulan')
                ->get();
        } else {
            $tahun = $tahun ?? $today->year;
            $pemasukan_query = Transaksi::query()
                ->whereTipe('pemasukan')
                ->whereYear('tanggal', $tahun)
                ->selectRaw('MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('bulan')
                ->orderBy('bulan')
                ->get();
        }

        // Cek apakah tahun bukan 'all' sebelum menghitung bulan terakhir tahun sebelumnya
        $lastMonthLastYear = null;
        if ($tahun !== 'all') {
            // Ambil data bulan terakhir tahun sebelumnya
            $lastMonthLastYear = Transaksi::query()
                ->whereTipe('pemasukan')
                ->whereYear('tanggal', (int)$tahun - 1)  // Pastikan $tahun menjadi integer
                ->selectRaw('MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('bulan')
                ->orderByDesc('bulan')
                ->first();
        }

        $categories = [];
        $data = [];
        $percentageChanges = [];
        $months = range(1, 12);

        foreach ($months as $month) {
            $categories[] = Carbon::create($today->year, $month)->format('M');
            $data[$month] = 0;
        }

        foreach ($pemasukan_query as $pemasukan) {
            $data[$pemasukan->bulan] = $pemasukan->total;
        }

        // Hitung persentase perubahan
        $previousMonthValue = $lastMonthLastYear ? $lastMonthLastYear->total : null;
        foreach ($months as $month) {
            if ($data[$month] > 0) {
                if ($previousMonthValue !== null) {
                    $percentageChange = ($data[$month] - $previousMonthValue) / $previousMonthValue * 100;
                    $percentageChanges[] = round($percentageChange, 2);
                } else {
                    $percentageChanges[] = null; // Tidak ada data sebelumnya
                }
                $previousMonthValue = $data[$month]; // Update nilai bulan sebelumnya
            } else {
                $percentageChanges[] = null; // Tidak ada data untuk bulan ini
            }
        }

        return [
            'categories' => $categories,
            'data' => array_values($data),
            'percentage_changes' => $percentageChanges,
        ];
    }


    public function chartPengeluaranPemasukanBulanan($tahun = null)
    {
        $today = Carbon::now();

        // Query Pengeluaran
        if ($tahun === 'all') {
            $pengeluaran_query = Transaksi::query()
                ->whereTipe('pengeluaran')
                ->selectRaw('YEAR(tanggal) as tahun, MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('tahun', 'bulan')
                ->orderBy('tahun')
                ->orderBy('bulan')
                ->get();
        } else {
            $tahun = $tahun ?? $today->year;
            $pengeluaran_query = Transaksi::query()
                ->whereTipe('pengeluaran')
                ->whereYear('tanggal', $tahun)
                ->selectRaw('MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('bulan')
                ->orderBy('bulan')
                ->get();
        }

        // Query Pemasukan
        if ($tahun === 'all') {
            $pemasukan_query = Transaksi::query()
                ->whereTipe('pemasukan')
                ->selectRaw('YEAR(tanggal) as tahun, MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('tahun', 'bulan')
                ->orderBy('tahun')
                ->orderBy('bulan')
                ->get();
        } else {
            $pemasukan_query = Transaksi::query()
                ->whereTipe('pemasukan')
                ->whereYear('tanggal', $tahun)
                ->selectRaw('MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('bulan')
                ->orderBy('bulan')
                ->get();
        }

        // Cek apakah tahun bukan 'all' sebelum menghitung bulan terakhir tahun sebelumnya
        $lastMonthLastYearPengeluaran = null;
        $lastMonthLastYearPemasukan = null;
        if ($tahun !== 'all') {
            // Ambil data bulan terakhir tahun sebelumnya untuk pengeluaran dan pemasukan
            $lastMonthLastYearPengeluaran = Transaksi::query()
                ->whereTipe('pengeluaran')
                ->whereYear('tanggal', (int)$tahun - 1)  // Pastikan $tahun menjadi integer
                ->selectRaw('MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('bulan')
                ->orderByDesc('bulan')
                ->first();

            $lastMonthLastYearPemasukan = Transaksi::query()
                ->whereTipe('pemasukan')
                ->whereYear('tanggal', (int)$tahun - 1)  // Pastikan $tahun menjadi integer
                ->selectRaw('MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('bulan')
                ->orderByDesc('bulan')
                ->first();
        }

        // Persiapan untuk kategori bulan
        $categories = [];
        $pengeluaran_data = [];
        $pemasukan_data = [];
        $pengeluaran_percentage_changes = [];
        $pemasukan_percentage_changes = [];
        $months = range(1, 12);

        // Initialisasi array bulan, data dan perubahan persentase
        foreach ($months as $month) {
            $categories[] = Carbon::create($today->year, $month)->format('M');
            $pengeluaran_data[$month] = 0;
            $pemasukan_data[$month] = 0;
            $pengeluaran_percentage_changes[$month] = null;
            $pemasukan_percentage_changes[$month] = null;
        }

        // Menyimpan nilai pengeluaran dan pemasukan per bulan
        foreach ($pengeluaran_query as $pengeluaran) {
            $pengeluaran_data[$pengeluaran->bulan] = $pengeluaran->total;
        }

        foreach ($pemasukan_query as $pemasukan) {
            $pemasukan_data[$pemasukan->bulan] = $pemasukan->total;
        }

        // Menghitung perubahan persentase untuk pengeluaran
        $previousMonthValuePengeluaran = $lastMonthLastYearPengeluaran ? $lastMonthLastYearPengeluaran->total : null;
        foreach ($months as $month) {
            if ($pengeluaran_data[$month] > 0) {
                if ($previousMonthValuePengeluaran !== null && $previousMonthValuePengeluaran != 0) {
                    $percentageChange = ($pengeluaran_data[$month] - $previousMonthValuePengeluaran) / $previousMonthValuePengeluaran * 100;
                    $pengeluaran_percentage_changes[$month] = round($percentageChange, 2);
                } else {
                    $pengeluaran_percentage_changes[$month] = null;
                }
                $previousMonthValuePengeluaran = $pengeluaran_data[$month];
            } else {
                $pengeluaran_percentage_changes[$month] = null;
            }

            if ($month === 1) {
                $previousMonthValuePengeluaran = $pengeluaran_data[$month];
            }
        }

        // Menghitung perubahan persentase untuk pemasukan
        $previousMonthValuePemasukan = $lastMonthLastYearPemasukan ? $lastMonthLastYearPemasukan->total : null;
        foreach ($months as $month) {
            if ($pemasukan_data[$month] > 0) {
                if ($previousMonthValuePemasukan !== null && $previousMonthValuePemasukan != 0) {
                    $percentageChange = ($pemasukan_data[$month] - $previousMonthValuePemasukan) / $previousMonthValuePemasukan * 100;
                    $pemasukan_percentage_changes[$month] = round($percentageChange, 2);
                } else {
                    $pemasukan_percentage_changes[$month] = null;
                }
                $previousMonthValuePemasukan = $pemasukan_data[$month];
            } else {
                $pemasukan_percentage_changes[$month] = null;
            }

            if ($month === 1) {
                $previousMonthValuePemasukan = $pemasukan_data[$month];
            }
        }

        // Return data pengeluaran dan pemasukan beserta perubahan persentase
        return [
            'categories' => $categories,
            'pengeluaran_data' => array_values($pengeluaran_data),
            'pemasukan_data' => array_values($pemasukan_data),
            'pengeluaran_percentage_changes' => array_values($pengeluaran_percentage_changes),
            'pemasukan_percentage_changes' => array_values($pemasukan_percentage_changes),
        ];
    }

    public function chartPengeluaranKategori($bulan = null, $tahun = null)
    {
        $today = Carbon::now();

        if ($bulan === 'all' && $tahun === 'all') {
            // Jika bulan dan tahun adalah 'all', ambil semua data tanpa filter
            $pengeluaran_query = Transaksi::query()
                ->whereTipe('pengeluaran')
                ->selectRaw('kategori_id, SUM(nominal) as total_pengeluaran')
                ->groupBy('kategori_id')
                ->orderBy('total_pengeluaran', 'desc')
                ->get();
        } elseif ($bulan === 'all') {
            // Jika bulan 'all', ambil semua data dalam tahun tertentu
            $tahun = $tahun ?? $today->year;
            $pengeluaran_query = Transaksi::query()
                ->whereTipe('pengeluaran')
                ->whereYear('tanggal', $tahun)
                ->selectRaw('kategori_id, SUM(nominal) as total_pengeluaran')
                ->groupBy('kategori_id')
                ->orderBy('total_pengeluaran', 'desc')
                ->get();
        } else {
            // Jika tidak ada filter atau filter bulan spesifik, gunakan bulan dan tahun saat ini sebagai default
            $bulan = $bulan ?? $today->month;
            $tahun = $tahun ?? $today->year;
            $pengeluaran_query = Transaksi::query()
                ->whereTipe('pengeluaran')
                ->whereMonth('tanggal', $bulan)
                ->whereYear('tanggal', $tahun)
                ->selectRaw('kategori_id, SUM(nominal) as total_pengeluaran')
                ->groupBy('kategori_id')
                ->orderBy('total_pengeluaran', 'desc')
                ->get();
        }

        $categories = [];
        $data = [];
        $persentase = [];
        $colors = [];

        $total_pengeluaran_bulan = $pengeluaran_query->sum('total_pengeluaran');

        foreach ($pengeluaran_query as $pengeluaran) {
            $kategori = Kategori::find($pengeluaran->kategori_id)->nama;
            $categories[] = $kategori;
            $data[] = intval($pengeluaran->total_pengeluaran);
            $persentase[] = ($pengeluaran->total_pengeluaran / $total_pengeluaran_bulan) * 100;
            $colors[] = '#' . str_pad(dechex(mt_rand(0, 0xFFFFFF)), 6, '0', STR_PAD_LEFT);
        }

        return [
            'categories' => $categories,
            'data' => $data,
            'persentase' => $persentase,
            'colors' => $colors,
        ];
    }
}
