<?php

namespace App\Services;

use App\Models\Transaksi;
use Carbon\Carbon;

class ChartServices
{
    public function chartPengeluaranHarian($bulan = null, $tahun = null) {
        // Default bulan dan tahun adalah bulan dan tahun saat ini
        $today = Carbon::now();
        $bulan = $bulan ?? $today->month;
        $tahun = $tahun ?? $today->year;
    
        // Buat query untuk mengambil pengeluaran per hari
        $pengeluaran_query = Transaksi::query()
            ->whereTipe('pengeluaran')
            ->whereMonth('tanggal', $bulan)
            ->whereYear('tanggal', $tahun)
            ->selectRaw('DATE(tanggal) as tanggal, nominal, judul') // Ambil nominal dan judul
            ->orderBy('tanggal')
            ->get();
    
        // Tentukan jumlah hari yang akan diambil
        if (is_null(request('bulan'))) {
            // Jika tidak ada filter bulan, ambil hingga hari ini
            $daysInMonth = $today->day;
        } else {
            // Jika ada filter bulan, ambil semua hari dalam bulan tersebut
            $daysInMonth = Carbon::create($tahun, $bulan)->daysInMonth;
        }
    
        // Inisialisasi arrays
        $categories = [];
        $data = [];
        $detail_pengeluaran = [];
    
        // Inisialisasi array dengan 0 pengeluaran untuk setiap hari
        for ($day = 1; $day <= $daysInMonth; $day++) {
            $date = Carbon::create($tahun, $bulan, $day)->format('d-m-Y');
            $categories[] = Carbon::create($tahun, $bulan, $day)->format('d-m-Y'); // Format d-m-Y
            $data[$date] = 0;
            $detail_pengeluaran[$date] = []; // Inisialisasi array untuk menyimpan detail pengeluaran
        }
    
        // Isi data pengeluaran sesuai hasil query
        foreach ($pengeluaran_query as $pengeluaran) {
            $tanggal = Carbon::parse($pengeluaran->tanggal)->format('d-m-Y');
            $data[$tanggal] += $pengeluaran->nominal;
            $detail_pengeluaran[$tanggal][] = [
                'judul' => $pengeluaran->judul,
                'nominal' => $pengeluaran->nominal,
            ];
        }
    
        // Mengembalikan response dalam format yang dibutuhkan untuk chart
        return [
            'categories' => $categories, // Tanggal lengkap (d-m-Y)
            'data' => array_values($data), // Total pengeluaran
            'details' => $detail_pengeluaran, // Detail pengeluaran per tanggal
        ];
    }    

    public function chartPengeluaranBulanan($tahun = null) {
        // Default tahun adalah tahun saat ini
        $today = Carbon::now();
        $tahun = $tahun ?? $today->year;
        
        // Buat query untuk mengambil pengeluaran per bulan
        $pengeluaran_query = Transaksi::query()
            ->whereTipe('pengeluaran')
            ->whereYear('tanggal', $tahun)
            ->selectRaw('MONTH(tanggal) as bulan, SUM(nominal) as total') // Total pengeluaran per bulan
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->get();
        
        // Buat array categories (bulan) dan data (pengeluaran)
        $months = range(1, 12); // 12 bulan
        $categories = [];
        $data = [];
    
        // Inisialisasi array dengan 0 pengeluaran untuk setiap bulan
        foreach ($months as $month) {
            $date = Carbon::create($tahun, $month)->format('M'); // Format nama bulan dan tahun
            $categories[] = $date;
            $data[$month] = 0;
        }
        
        // Isi data pengeluaran sesuai hasil query
        foreach ($pengeluaran_query as $pengeluaran) {
            $bulan = $pengeluaran->bulan;
            $data[$bulan] = $pengeluaran->total;
        }
    
        // Mengembalikan response dalam format yang dibutuhkan untuk chart
        return [
            'categories' => $categories, // Nama bulan dan tahun
            'data' => array_values($data), // Total pengeluaran per bulan
        ];
    }
    
}
