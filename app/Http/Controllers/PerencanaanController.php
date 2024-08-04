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
            $request->select2,
            $request->pic_id
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

        // widget
        $widget = $this->widget($request->kategori_id, $request->bulan, $request->tahun);

        return Inertia::render('Perencanaan/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "categories" => $categories,
            "users" => $users,
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
        // start : limit anggaran
        $pemasukan_raw = $this->transaksiServices->getData(
            null,
            null,
            null,
            null,
            null,
            $bulan,
            $tahun,
            'pemasukan',
            null
        );

        $limit_anggaran = 0;
        foreach ($pemasukan_raw as $pemasukan) {
            $limit_anggaran += $pemasukan->nominal;
        }
        // end : limit anggaran

        // start : total anggaran
        $anggaran_raw = $this->perencanaanServices->getData(
            null,
            null,
            null,
            100,
            $kategori_id,
            $bulan,
            $tahun,
            null,
            null,
            null
        );

        $total_anggaran = 0;
        foreach ($anggaran_raw->items() as $anggaran) {
            $total_anggaran += $anggaran->nominal;
        }
        // end : total anggaran

        // start : anggaran acc
        $anggaran_acc_raw = $this->perencanaanServices->getData(
            null,
            null,
            null,
            100,
            $kategori_id,
            $bulan,
            $tahun,
            1,
            null,
            null
        );

        $total_anggaran_acc = 0;
        foreach ($anggaran_acc_raw->items() as $anggaran) {
            $total_anggaran_acc += $anggaran->nominal;
        }
        // end : anggaran acc

        return [
            'limit_anggaran'    => $limit_anggaran,
            'total_anggaran'    => $total_anggaran,
            'total_anggaran_acc'=> $total_anggaran_acc,
            'selisih_anggaran' => $limit_anggaran-$total_anggaran_acc,
        ];
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
            $request->select2,
            $request->pic_id
        );

        $pemasukan_raw = $this->transaksiServices->getData(
            null,
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
