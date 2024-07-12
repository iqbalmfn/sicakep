<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use App\Services\KategoriServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriController extends Controller
{
    protected $kategoriServices;

    public function __construct(KategoriServices $kategoriServices)
    {
        $this->kategoriServices = $kategoriServices;
    }

    public function index(Request $request)
    {
        $title = "Kategori Pengeluaran & Pemasukan";
        $breadcrumbs = [
            ['name' => "Master", "link" => "#"],
            ['name' => $title],
        ];

        $datas = $this->kategoriServices->getData(
            $request->q,
            $request->orderBy,
            $request->orderDirection,
            $request->perPage,
            $request->jenis,
            $request->select2
        );

        return Inertia::render('Master/Kategori/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
