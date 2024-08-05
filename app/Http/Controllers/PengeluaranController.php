<?php

namespace App\Http\Controllers;

use App\Models\Perencanaan;
use App\Models\User;
use App\Services\KategoriServices;
use App\Services\PerencanaanServices;
use App\Services\TransaksiServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengeluaranController extends Controller
{
    protected $transaksiServices, $kategoriServices, $perencanaanServices;

    public function __construct() {
        $this->transaksiServices = app(TransaksiServices::class);
        $this->kategoriServices = app(KategoriServices::class);
        $this->perencanaanServices = app(PerencanaanServices::class);
    }

    public function index(Request $request)
    {
        $title = "Pengeluaran";
        $breadcrumbs = [
            ['name' => 'Transaksi', 'link' => '#'],
            ['name' => $title],
        ];

        $datas = $this->transaksiServices->getData(
            $request->q,
            $request->orderBy,
            $request->orderDirection,
            $request->perPage,
            $request->kategori_id,
            $request->bulan,
            $request->tahun,
            'pengeluaran',
            null
        );

        $dataAll = $this->transaksiServices->getDataAll(
            $request->q,
            $request->orderBy,
            $request->orderDirection,
            $request->kategori_id,
            $request->bulan,
            $request->tahun,
            'pengeluaran',
            null
        );

        $categories = $this->kategoriServices->getDataPengeluaran(
            null,
            null,
            null,
            100,
            'pengeluaran',
            null,
            true
        );

        $perencanaan_raw = $this->perencanaanServices->getDataAll(
            null, 
            null, 
            null, 
            null, 
            $request->bulan, 
            $request->tahun, 
            1, 
            null,
            null
        );
        $perencanaans = collect($perencanaan_raw    )->map(function ($item) {
            return [
                'id' => $item->id,
                'judul' => $item->judul,
                'nominal' => $item->nominal,
                'kategori_id' => $item->kategori_id
            ];
        });

        $users = User::all();

        $widget = $this->widget($request->kategori_id, $request->bulan, $request->tahun);

        return Inertia::render('Transaksi/Pengeluaran/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "dataAll" => $dataAll,
            "categories" => $categories,
            "users" => $users,
            "perencanaans" => $perencanaans,
            "widget" => $widget,
            'filtered' => $request ?? [
                'perPage' => $request->perPage ?? 10,
                'q' => $request->q ?? '',
                'page' => $request->page ?? 1,
                'orderBy' => $request->orderBy ?? 'id',
                'orderDirection' => $request->orderDirection ?? 'desc'
            ],
        ]);
    }

    public function widget($kategori_id, $bulan, $tahun) {
        // start : total pemasukan
        $pemasukan_raw = $this->transaksiServices->getDataAll(
            null,
            null,
            null,
            null,
            $bulan,
            $tahun,
            'pemasukan',
            null
        );

        $total_pemasukan = 0;
        foreach ($pemasukan_raw as $pemasukan) {
            $total_pemasukan += $pemasukan->nominal;
        }
        // end : total pemasukan

        // start : total pengeluaran
        $pengeluaran_raw = $this->transaksiServices->getDataAll(
            null,
            null,
            null,
            null,
            $bulan,
            $tahun,
            'pengeluaran',
            null
        );

        $total_pengeluaran = 0;
        foreach ($pengeluaran_raw as $pengeluaran) {
            $total_pengeluaran += $pengeluaran->nominal;
        }
        // end : total pengeluaran

        // start : anggaran tersedia
        $total_anggaran_raw = $this->perencanaanServices->getDataAll(
            null,
            null,
            null,
            $kategori_id,
            $bulan,
            $tahun,
            1,
            null,
            null
        );

        $total_anggaran = 0;
        foreach ($total_anggaran_raw as $anggaran) {
            $total_anggaran += $anggaran->nominal;
        }
        // end : anggaran tersedia

        return [
            'total_pemasukan'   => $total_pemasukan,
            'total_anggaran'    => $total_anggaran,
            'total_pengeluaran' => $total_pengeluaran,
            'dana_tersedia'     => $total_anggaran-$total_pengeluaran,
        ];
    }

    public function view(Request $request) {
        $title = "View Pengeluaran";
        $breadcrumbs = [
            ['name' => 'Transaksi', 'link' => '#'],
            ['name' => 'Pengeluaran', 'link' => '/transaksi/pengeluaran'],
            ['name' => $title],
        ];

        $datas = $this->transaksiServices->viewPengeluaranMode(
            $request->q,
            $request->orderBy,
            $request->orderDirection,
            $request->kategori_id,
            $request->bulan,
            $request->tahun,
            $request->status,
            $request->select2,
            $request->user_id
        );

        $pemasukan_raw = $this->transaksiServices->getDataAll(
            null,
            null,
            null,
            null,
            $request->bulan,
            $request->tahun,
            'pemasukan',
            $request->select2
        );

        $limit_anggaran = 0;
        foreach ($pemasukan_raw as $pemasukan) {
            $limit_anggaran += $pemasukan->nominal;
        }

        // return $datas;

        return Inertia::render('Transaksi/Pengeluaran/View', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "limit_anggaran" => $limit_anggaran,
            'filtered' => $request ?? [
                'perPage' => $request->perPage ?? 10,
                'q' => $request->q ?? '',
                'page' => $request->page ?? 1,
                'orderBy' => $request->orderBy ?? 'id',
                'orderDirection' => $request->orderDirection ?? 'desc'
            ],
        ]);
    }

    public function store(Request $request)
    {
        $res = $this->transaksiServices->createData($request, "Pengeluaran");

        if ($res['success']) {
            $session = [
                'flash' => 'success',
                'flash_message' => $res['message'],
            ];
        } else {
            $session = [
                'flash' => 'error',
                'flash_message' => $res['message'],
            ];
        }

        return redirect()->back()->with($session['flash'], $session['flash_message']);
    }

    public function update(Request $request, string $id)
    {
        $res = $this->transaksiServices->updateData($request, $id);

        if ($res['success']) {
            $session = [
                'flash' => 'success',
                'flash_message' => $res['message'],
            ];
        } else {
            $session = [
                'flash' => 'error',
                'flash_message' => $res['message'],
            ];
        }

        return redirect()->back()->with($session['flash'], $session['flash_message']);
    }

    public function destroy(string $id)
    {
        $res = $this->transaksiServices->deleteData($id);

        if ($res['success']) {
            $session = [
                'flash' => 'success',
                'flash_message' => $res['message'],
            ];
        } else {
            $session = [
                'flash' => 'error',
                'flash_message' => $res['message'],
            ];
        }

        return redirect()->back()->with($session['flash'], $session['flash_message']);
    }
}
