<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Models\UtangPiutang;
use App\Services\ChartServices;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $chartServices;

    public function __construct()
    {
        $this->chartServices = app(ChartServices::class);
    }

    public function __invoke(Request $request)
    {
        // chart
        $chartPengeluaranHarian = $this->chartServices->chartPengeluaranHarian($request->bulan, $request->tahun);
        $chartPengeluaranBulanan = $this->chartServices->chartPengeluaranBulanan($request->tahun);
        $chartPengeluaranKategori = $this->chartServices->chartPengeluaranKategori($request->bulan, $request->tahun);
        $chartPemasukanBulanan = $this->chartServices->chartPemasukanBulanan($request->tahun);

        $data = [
            "totalSaldo" => $this->totalSaldo(),
            "totalPemasukan" => $this->totalTransaksi("pemasukan", $request->bulan, $request->tahun),
            "totalPengeluaran" => $this->totalTransaksi("pengeluaran", $request->bulan, $request->tahun),
            "totalUtang" => $this->totalUtang($request->bulan, $request->tahun),
            "listUtang" => $this->listUtang($request->bulan, $request->tahun),
            "ChartPengeluaranHarian" => $chartPengeluaranHarian,
            "ChartPengeluaranBulanan" => $chartPengeluaranBulanan,
            "ChartPengeluaranKategori" => $chartPengeluaranKategori,
            "ChartPemasukanBulanan" => $chartPemasukanBulanan,
        ];

        return Inertia::render('Dashboard', [
            "title" => "Dashboard",
            "data" => $data,
            "filtered" => $request ?? [
                'bulan' => $request->bulan ?? date('m'),
                'tahun' => $request->tahun ?? date('Y'),
            ],
        ]);
    }

    public function totalSaldo()
    {
        $saldo = Transaksi::query()
            ->whereTipe('pemasukan')
            ->sum('nominal');

        $totalPengeluaran = Transaksi::query()
            ->whereTipe('pengeluaran')
            ->sum('nominal');

        return $saldo - $totalPengeluaran;
    }

    public function totalTransaksi($tipe, $bulan = null, $tahun = null)
    {
        $today = Carbon::now();
        $transaksi_raw = Transaksi::query()->whereTipe($tipe);

        if ($bulan === 'all' && $tahun === 'all') {
            // Tidak ada filter, ambil semua data
        } elseif ($bulan === 'all') {
            $tahun = $tahun ?? $today->year;
            $transaksi_raw->whereYear('tanggal', $tahun);
        } else {
            $bulan = $bulan ?? $today->month;
            $tahun = $tahun ?? $today->year;
            $transaksi_raw->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun);
        }

        return $transaksi_raw->sum('nominal');
    }


    public function totalUtang($bulan = null, $tahun = null)
    {
        $today = Carbon::now();
        $utang_raw = UtangPiutang::query()
            ->whereTipe("utang")
            ->whereStatus(0);


        if ($bulan === 'all' && $tahun === 'all') {
            // Tidak ada filter, ambil semua data
        } elseif ($bulan === 'all') {
            $tahun = $tahun ?? $today->year;
            $utang_raw->whereYear('jatuh_tempo', $tahun);
        } else {
            $bulan = $bulan ?? $today->month;
            $tahun = $tahun ?? $today->year;
            $utang_raw->whereMonth('jatuh_tempo', $bulan)->whereYear('jatuh_tempo', $tahun);
        }

        return $utang_raw->sum('nominal');
    }


    public function listUtang($bulan = null, $tahun = null)
    {
        $today = Carbon::now();
        $utang_raw = UtangPiutang::query()
            ->whereTipe("utang");

        if ($bulan === 'all' && $tahun === 'all') {
            // Tidak ada filter, ambil semua data
        } elseif ($bulan === 'all') {
            $tahun = $tahun ?? $today->year;
            $utang_raw->whereYear('jatuh_tempo', $tahun);
        } else {
            $bulan = $bulan ?? $today->month;
            $tahun = $tahun ?? $today->year;
            $utang_raw->whereMonth('jatuh_tempo', $bulan)->whereYear('jatuh_tempo', $tahun);
        }

        $utang = $utang_raw->orderBy('jatuh_tempo')->get();

        return $utang;
    }
}
