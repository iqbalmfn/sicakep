<?php

namespace App\Http\Controllers\Transaksi;

use App\Http\Controllers\Controller;
use App\Models\Rekening;
use App\Models\User;
use App\Services\KategoriServices;
use App\Services\TransaksiServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PemasukanController extends Controller
{
    protected $transaksiServices, $kategoriServices;

    public function __construct() {
        $this->transaksiServices = app(TransaksiServices::class);
        $this->kategoriServices = app(KategoriServices::class);
    }

    public function index(Request $request)
    {
        $title = "Pemasukan";
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
            'pemasukan',
            null
        );

        $categories = $this->kategoriServices->getDataNonUtangPiutang(
            null,
            null,
            null,
            100,
            'pemasukan',
            null,
            true
        );

        $users = User::all();
        $rekenings = Rekening::all();

        return Inertia::render('Transaksi/Pemasukan/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "categories" => $categories,
            "users" => $users,
            "rekenings" => $rekenings,
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
        $res = $this->transaksiServices->createData($request, "pemasukan");

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
