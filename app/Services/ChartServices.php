<?php

namespace App\Services;

use App\Models\Kategori;
use App\Models\Transaksi;
use Carbon\Carbon;

class ChartServices
{
    public function chartPengeluaranHarian($bulan = null, $tahun = null) {
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
    
    
    public function chartPengeluaranBulanan($tahun = null) {
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
    
        $categories = [];
        $data = [];
        $months = range(1, 12);
    
        foreach ($months as $month) {
            $categories[] = Carbon::create($today->year, $month)->format('M');
            $data[$month] = 0;
        }
    
        foreach ($pengeluaran_query as $pengeluaran) {
            $data[$pengeluaran->bulan] = $pengeluaran->total;
        }
    
        return [
            'categories' => $categories,
            'data' => array_values($data),
        ];
    }

    public function chartPemasukanBulanan($tahun = null) {
        $today = Carbon::now();
    
        if ($tahun === 'all') {
            // Jika tahun 'all', ambil semua data tanpa filter tahun
            $pemasukan_query = Transaksi::query()
                ->whereTipe('pemasukan')
                ->selectRaw('YEAR(tanggal) as tahun, MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('tahun', 'bulan')
                ->orderBy('tahun')
                ->orderBy('bulan')
                ->get();
        } else {
            // Jika tidak ada filter, defaultnya adalah tahun sekarang
            $tahun = $tahun ?? $today->year;
            $pemasukan_query = Transaksi::query()
                ->whereTipe('pemasukan')
                ->whereYear('tanggal', $tahun)
                ->selectRaw('MONTH(tanggal) as bulan, SUM(nominal) as total')
                ->groupBy('bulan')
                ->orderBy('bulan')
                ->get();
        }
    
        $categories = [];
        $data = [];
        $months = range(1, 12);
    
        foreach ($months as $month) {
            $categories[] = Carbon::create($today->year, $month)->format('M');
            $data[$month] = 0;
        }
    
        foreach ($pemasukan_query as $pemasukan) {
            $data[$pemasukan->bulan] = $pemasukan->total;
        }
    
        return [
            'categories' => $categories,
            'data' => array_values($data),
        ];
    }
    

    public function chartPengeluaranKategori($bulan = null, $tahun = null) {
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
