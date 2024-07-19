<?php

namespace App\Http\Controllers;

use App\Services\KategoriServices;
use App\Services\PerencanaanServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerencanaanController extends Controller
{
    protected $perencanaanServices, $kategoriServices;

    public function __construct(
        PerencanaanServices $perencanaanServices,
        KategoriServices $kategoriServices
    ) {
        $this->perencanaanServices = $perencanaanServices;
        $this->kategoriServices = $kategoriServices;
    }

    public function index(Request $request)
    {
        $title = "Perencanaan";
        $breadcrumbs = [
            ['name' => $title],
        ];

        $datas = $this->perencanaanServices->getData(
            $request->q,
            $request->orderBy,
            $request->orderDirection,
            $request->perPage,
            $request->kategori_id,
            $request->bulan,
            $request->tahun,
            $request->status,
            $request->select2
        );

        $categories = $this->kategoriServices->getData(
            null, 
            null,
            null, 
            100, 
            'pengeluaran', 
            null,
            true
        );

        return Inertia::render('Perencanaan/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "categories" => $categories,
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
        $res = $this->perencanaanServices->createData($request);

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

    public function show(string $id)
    {
        $res = $this->perencanaanServices->getDataById($id);

        $title = $res->judul;
        $breadcrumbs = [
            ['name' => $title],
        ];

        return Inertia::render('Perencanaan/Show', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "data" => $res,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $res = $this->perencanaanServices->updateData($request, $id);

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
        $res = $this->perencanaanServices->deleteData($id);

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

    public function confirm(Request $request, string $id)
    {
        $res = $this->perencanaanServices->confirmData($request, $id);

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
