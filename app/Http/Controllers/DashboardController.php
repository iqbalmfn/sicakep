<?php

namespace App\Http\Controllers;

use App\Models\Transaksi;
use App\Services\ChartServices;
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
        //widget

        // chart
        $chartPengaluaranHarian = $this->chartServices->chartPengeluaranHarian($request->bulan, $request->tahun);
        $chartPengaluaranBulanan = $this->chartServices->chartPengeluaranBulanan($request->tahun);

        $data = [
            "totalSaldo" => $this->totalSaldo(),
            "ChartPengeluaranHarian" => $chartPengaluaranHarian,
            "ChartPengeluaranBulanan" => $chartPengaluaranBulanan,
        ];

        return Inertia::render('Dashboard', [
            "title" => "Dashboard",
            "data" => $data
        ]);
    }

    public function totalSaldo() {
        $saldo = Transaksi::query()
            ->whereTipe('pemasukan')
            ->sum('nominal');

        $totalPengeluaran = Transaksi::query()
            ->whereTipe('pengeluaran')
            ->sum('nominal');

        return $saldo-$totalPengeluaran;
    }
}
