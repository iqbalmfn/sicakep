<?php

namespace App\Http\Controllers\UtangPiutang;

use App\Http\Controllers\Controller;
use App\Models\PiutangMaster;
use App\Models\Rekening;
use App\Models\User;
use App\Models\UtangPiutang;
use App\Services\UtangPiutangServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PiutangController extends Controller
{
    protected $utangPiutangServices;

    public function __construct()
    {
        $this->utangPiutangServices = app(UtangPiutangServices::class);
    }

    public function index(Request $request)
    {
        $title = "Piutang";
        $breadcrumbs = [
            ['name' => 'Utang Piutang', 'link' => '#'],
            ['name' => $title],
        ];

        $datas = $this->utangPiutangServices->getDataPiutangMaster(
            $request->q,
            $request->orderBy,
            $request->orderDirection,
            $request->perPage,
            $request->user_id,
            true
        );

        $peminjams = PiutangMaster::query()
            ->groupBy('nama')
            ->get();

        $users = User::all();

        $rekenings = Rekening::all();

        $widget = $this->widget(
            $request->user_id,
            $request->bulan,
            $request->tahun,
            $request->status
        );

        return Inertia::render('UtangPiutang/Piutang/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "users" => $users,
            "peminjams" => $peminjams,
            "rekenings" => $rekenings,
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

    public function widget() {
        $total_piutang = 0;
        $total_dibayar = 0;

        // start : total utang
        $total_piutang_raw = $this->utangPiutangServices->getDataPiutangMaster(
            null,
            null,
            null,
            null,
            null,
            false
        );

        foreach ($total_piutang_raw as $utang) {
            $total_piutang += $utang->nominal;
        }
        // end : total utang

        // start : total utang dibayar
        $total_dibayar_raw = $this->utangPiutangServices->getData(
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            "piutang",
            1,
            false
        );

        foreach ($total_dibayar_raw as $utang) {
            $total_dibayar += $utang->nominal;
        }
        // end : total utang dibayar

        $total_belum_dibayar = $total_piutang - $total_dibayar;
        $persentase = $total_piutang > 0 ? ($total_dibayar / $total_piutang) * 100 : 0;

        // Format persentase sesuai kebutuhan
        if (floor($persentase) == $persentase) {
            $persentase = number_format($persentase, 0, ',', ''); // Tidak ada angka desimal
        } elseif (floor($persentase * 10) == $persentase * 10) {
            $persentase = number_format($persentase, 1, ',', ''); // Satu angka desimal
        } else {
            $persentase = number_format($persentase, 2, ',', ''); // Dua angka desimal
        }

        return [
            "total_piutang" => $total_piutang,
            "total_dibayar" => $total_dibayar,
            "total_belum_dibayar" => $total_belum_dibayar,
            "persentase" => $persentase
        ];
    }

    public function store(Request $request)
    {
        $res = $this->utangPiutangServices->createDataPiutang($request);

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
        $res = $this->utangPiutangServices->updateDataPiutang($request, $id);

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
        $res = $this->utangPiutangServices->deleteDataPiutang($id);

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
