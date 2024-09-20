<?php

namespace App\Http\Controllers\Aset;

use App\Http\Controllers\Controller;
use App\Models\Rekening;
use App\Services\TransaksiAsetServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PemindahanAsetController extends Controller
{
    protected $transaksiAsetServices;

    public function __construct()
    {
        $this->transaksiAsetServices = app(TransaksiAsetServices::class);
    }

    public function index(Request $request)
    {
        $title = "Pemindahan Aset";
        $breadcrumbs = [
            ['name' => "Aset", "link" => "#"],
            ['name' => $title],
        ];

        $datas = $this->transaksiAsetServices->getData(
            $request->q,
            $request->orderBy,
            $request->orderDirection,
            $request->perPage,
            $request->user_id,
            $request->bulan,
            $request->tahun
        );

        $rekenings = Rekening::all();

        return Inertia::render('Aset/PemindahanAset/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "rekenings" => $rekenings,
            'filtered' => $request ?? [
                'perPage' => $request->perPage ?? 10,
                'q' => $request->q ?? '',
                'page' => $request->page ?? 1,
                'orderBy' => $request->orderBy ?? 'id',
                'request' => $request->jenis,
                'orderDirection' => $request->orderDirection ?? 'desc'
            ],
        ]);
    }

    public function store(Request $request)
    {
        $res = $this->transaksiAsetServices->createData($request);

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
        $res = $this->transaksiAsetServices->updateData($request, $id);

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
        $res = $this->transaksiAsetServices->deleteData($id);

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
