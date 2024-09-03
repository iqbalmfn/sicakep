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
        $chartPengaluaranHarian = $this->chartServices->chartPengeluaranHarian($request->bulan, $request->tahun);
        $chartPengaluaranBulanan = $this->chartServices->chartPengeluaranBulanan($request->tahun);

        $data = [
            "totalSaldo" => $this->totalSaldo(),
            "totalPemasukan" => $this->totalTransaksi("pemasukan", $request->bulan, $request->tahun),
            "totalPengeluaran" => $this->totalTransaksi("pengeluaran", $request->bulan, $request->tahun),
            "totalUtang" => $this->totalUtang($request->bulan, $request->tahun),
            "listUtang" => $this->listUtang($request->bulan, $request->tahun),
            "ChartPengeluaranHarian" => $chartPengaluaranHarian,
            "ChartPengeluaranBulanan" => $chartPengaluaranBulanan,
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

    public function totalTransaksi($tipe, $bulan, $tahun)
    {
        $transaksi_raw = Transaksi::query()
            ->whereTipe($tipe);

        if (isset($bulan) && !isset($tahun)) {
            $transaksi_raw->whereMonth('tanggal', $bulan);
            $transaksi_raw->whereYear('tanggal', date('Y'));
        } elseif (isset($bulan) && isset($tahun)) {
            $transaksi_raw->whereMonth('tanggal', $bulan);
            $transaksi_raw->whereYear('tanggal', $tahun);
        } elseif (!isset($bulan) && isset($tahun)) {
            $transaksi_raw->whereYear('tanggal', $tahun);
        }

        return $transaksi_raw->sum('nominal');
    }

    public function totalUtang($bulan, $tahun)
    {
        $utang_raw = UtangPiutang::query()
            ->whereTipe("utang")
            ->whereStatus(0);

        if (isset($bulan) && !isset($tahun)) {
            $utang_raw->whereMonth('jatuh_tempo', $bulan);
            $utang_raw->whereYear('jatuh_tempo', date('Y'));
        } elseif (isset($bulan) && isset($tahun)) {
            $utang_raw->whereMonth('jatuh_tempo', $bulan);
            $utang_raw->whereYear('jatuh_tempo', $tahun);
        } elseif (!isset($bulan) && isset($tahun)) {
            $utang_raw->whereYear('jatuh_tempo', $tahun);
        }

        return $utang_raw->sum('nominal');
    }

    public function listUtang($bulan, $tahun)
    {
        $today = Carbon::now();
        $bulan = $bulan ?? $today->month;
        $tahun = $tahun ?? $today->year;

        $utang = UtangPiutang::query()
            ->whereTipe("utang")
            ->whereMonth('jatuh_tempo', $bulan)
            ->whereYear('jatuh_tempo', $tahun)
            ->orderByDesc('jatuh_tempo')
            ->get();

        return $utang;
    }
}
