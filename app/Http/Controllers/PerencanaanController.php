<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\KategoriServices;
use App\Services\PerencanaanServices;
use App\Services\TransaksiServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerencanaanController extends Controller
{
    protected $perencanaanServices, $kategoriServices, $transaksiServices;

    public function __construct(
        PerencanaanServices $perencanaanServices,
        KategoriServices $kategoriServices
    ) {
        $this->perencanaanServices = $perencanaanServices;
        $this->kategoriServices = $kategoriServices;
        $this->transaksiServices = app(TransaksiServices::class);
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

        $users = User::all();

        return Inertia::render('Perencanaan/Index', [
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

    public function view(Request $request)
    {
        $title = "View Perencanaan";
        $breadcrumbs = [
            ['name' => 'Perencanaan', 'link' => '/perencanaan'],
            ['name' => $title],
        ];

        $datas = $this->perencanaanServices->viewMode(
            $request->q,
            $request->orderBy,
            'asc',
            $request->perPage,
            $request->kategori_id,
            $request->bulan,
            $request->tahun,
            $request->status,
            $request->select2
        );

        $pemasukan_raw = $this->transaksiServices->getData(
            null,
            null,
            null,
            null,
            null,
            $request->bulan,
            $request->tahun,
            null,
            $request->select2
        ); //

        $limit_anggaran = 0;
        foreach ($pemasukan_raw as $pemasukan) {
            $limit_anggaran += $pemasukan->nominal;
        }

        return Inertia::render('Perencanaan/View', [
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

    public function printPdf(Request $request)
    {
        return $this->perencanaanServices->generatePdf($request);
    }
}
