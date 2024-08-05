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

        $dataAll = $this->transaksiServices->getData(
            $request->q,
            $request->orderBy,
            $request->orderDirection,
            1000,
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

        $perencanaan_raw = $this->perencanaanServices->getData(
            null, 
            null, 
            null, 
            100, 
            null, 
            $request->bulan, 
            $request->tahun, 
            1, 
            null,
            null
        );
        $perencanaans = collect($perencanaan_raw->items())->map(function ($item) {
            return [
                'id' => $item->id,
                'judul' => $item->judul,
                'nominal' => $item->nominal,
                'kategori_id' => $item->kategori_id
            ];
        });

        $users = User::all();

        return Inertia::render('Transaksi/Pengeluaran/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "dataAll" => $dataAll,
            "categories" => $categories,
            "users" => $users,
            "perencanaans" => $perencanaans,
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
