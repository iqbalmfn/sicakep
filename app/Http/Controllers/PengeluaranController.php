<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\KategoriServices;
use App\Services\TransaksiServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PengeluaranController extends Controller
{
    protected $transaksiServices, $kategoriServices;

    public function __construct() {
        $this->transaksiServices = app(TransaksiServices::class);
        $this->kategoriServices = app(KategoriServices::class);
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

        $categories = $this->kategoriServices->getDataPengeluaran(
            null,
            null,
            null,
            100,
            'pengeluaran',
            null,
            true
        );

        $users = User::all();

        return Inertia::render('Transaksi/Pengeluaran/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "categories" => $categories,
            "users" => $users,
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
