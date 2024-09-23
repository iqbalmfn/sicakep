<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Transaksi\PengeluaranController;
use App\Models\Rekening;
use App\Models\Transaksi;
use App\Models\UtangPiutang;
use App\Services\ChartServices;
use App\Services\UtangPiutangServices;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected $chartServices, $pengeluaranController, $perencanaanController, $utangPiutangServices;

    public function __construct()
    {
        $this->chartServices = app(ChartServices::class);
        $this->pengeluaranController = app(PengeluaranController::class);
        $this->perencanaanController = app(PerencanaanController::class);
        $this->utangPiutangServices = app(UtangPiutangServices::class);
    }

    public function __invoke(Request $request)
    {
        // chart
        $chartPengeluaranHarian = $this->chartServices->chartPengeluaranHarian($request->bulan, $request->tahun);
        $chartPengeluaranBulanan = $this->chartServices->chartPengeluaranBulanan($request->tahun);
        $chartPengeluaranKategori = $this->chartServices->chartPengeluaranKategori($request->bulan, $request->tahun);
        $chartPemasukanBulanan = $this->chartServices->chartPemasukanBulanan($request->tahun);

        $data = [
            "piutang" => $this->piutang(),
            "aset" => $this->aset(),
            "totalSaldo" => $this->totalSaldoFromRekening(),
            "totalPemasukan" => $this->totalTransaksi("pemasukan", $request->bulan, $request->tahun),
            "totalPengeluaran" => $this->totalTransaksi("pengeluaran", $request->bulan, $request->tahun),
            "saldoBulanan" => $this->saldoBulanan($request->bulan, $request->tahun),
            "danaTersedia" => $this->pengeluaranController->widget(null, $request->bulan, $request->tahun),
            "anggaran" => $this->perencanaanController->widget(null, $request->bulan, $request->tahun),
            "persentasePengeluaran" => $this->persentasePengeluaran($request->bulan, $request->tahun),
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

    public function piutang()
    {
        $total_piutang = 0;
        $total_dibayar = 0;

        // start : total utang
        $total_piutang_raw = $this->utangPiutangServices->getDataPiutangMaster(
            null,
            null,
            null,
            null,
            null,
            null,
            false
        );

        foreach ($total_piutang_raw as $utang) {
            $total_piutang += $utang->nominal;
        }
        // end : total utang

        // start : total utang dibayar
        $total_dibayar_raw = $this->utangPiutangServices->getData(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "piutang",
            1,
            false
        );

        foreach ($total_dibayar_raw as $utang) {
            $total_dibayar += $utang->nominal;
        }
        // end : total utang dibayar
        return $total_piutang - $total_dibayar;
    }

    public function aset()
    {
        $aset = Rekening::query()
            ->with(['bank'])
            ->orderByDesc('saldo')
            ->get();

        return $aset;
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

    public function totalSaldoFromRekening()
    {
        $saldo = Rekening::query()
            ->sum('saldo');

        $piutang = $this->piutang();

        return $saldo + $piutang;
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

    public function saldoBulanan($bulan, $tahun)
    {
        $today = Carbon::now();

        $pemasukan_raw = Transaksi::query()
            ->whereTipe('pemasukan');
        if ($bulan === 'all' && $tahun === 'all') {
            // Tidak ada filter, ambil semua data
        } elseif ($bulan === 'all') {
            $tahun = $tahun ?? $today->year;
            $pemasukan_raw->whereYear('tanggal', $tahun);
        } else {
            $bulan = $bulan ?? $today->month;
            $tahun = $tahun ?? $today->year;
            $pemasukan_raw->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun);
        }
        $pemasukan = $pemasukan_raw->sum('nominal');

        $pengeluaran_raw = Transaksi::query()
            ->whereTipe('pengeluaran');
        if ($bulan === 'all' && $tahun === 'all') {
            // Tidak ada filter, ambil semua data
        } elseif ($bulan === 'all') {
            $tahun = $tahun ?? $today->year;
            $pengeluaran_raw->whereYear('tanggal', $tahun);
        } else {
            $bulan = $bulan ?? $today->month;
            $tahun = $tahun ?? $today->year;
            $pengeluaran_raw->whereMonth('tanggal', $bulan)->whereYear('tanggal', $tahun);
        }
        $pengeluaran = $pengeluaran_raw->sum('nominal');

        return $pemasukan - $pengeluaran;
    }
    private function formatPersentase($nilai)
    {
        // Format angka menjadi string dengan dua angka di belakang koma
        $formatted = number_format($nilai, 2, '.', '');

        // Periksa jumlah angka di belakang koma
        $parts = explode('.', $formatted);
        if (count($parts) === 1) {
            // Tidak ada angka di belakang koma
            return $formatted; // Bulat
        } elseif (strlen($parts[1]) === 1) {
            // 1 angka di belakang koma
            return number_format($nilai, 1, '.', '');
        } else {
            // 2 angka atau lebih di belakang koma
            return number_format($nilai, 2, '.', '');
        }
    }

    public function persentasePengeluaran($bulan = null, $tahun = null)
    {
        $pemasukan = $this->totalTransaksi("pemasukan", $bulan, $tahun);
        $pengeluaran = $this->totalTransaksi("pengeluaran", $bulan, $tahun);

        if ($pemasukan == 0 || $pengeluaran == 0) {
            $persentase = 0;
        } else {
            $persentase = ($pengeluaran / $pemasukan) * 100;
        }

        return $this->formatPersentase($persentase);
    }
}
