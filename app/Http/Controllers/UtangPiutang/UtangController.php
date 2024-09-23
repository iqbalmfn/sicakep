<?php

namespace App\Http\Controllers\UtangPiutang;

use App\Http\Controllers\Controller;
use App\Models\Rekening;
use App\Models\User;
use App\Services\UtangPiutangServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UtangController extends Controller
{
    protected $utangPiutangServices;

    public function __construct()
    {
        $this->utangPiutangServices = app(UtangPiutangServices::class);
    }

    public function index(Request $request)
    {
        $title = "Utang";
        $breadcrumbs = [
            ['name' => 'Utang Piutang', 'link' => '#'],
            ['name' => $title],
        ];

        $datas = $this->utangPiutangServices->getData(
            $request->q,
            $request->orderBy,
            $request->orderDirection,
            $request->perPage,
            $request->user_id,
            $request->bulan,
            $request->tahun,
            "utang",
            $request->status,
            true
        );

        $users = User::all();

        $widget = $this->widget(
            $request->user_id,
            $request->bulan,
            $request->tahun,
            $request->status
        );

        $rekenings = Rekening::all();

        return Inertia::render('UtangPiutang/Utang/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "widget" => $widget,
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

    public function widget(
        $user_id,
        $bulan,
        $tahun,
        $status
    ) {

        $total_utang = 0;
        $total_dibayar = 0;

        // start : total utang
        $total_utang_raw = $this->utangPiutangServices->getData(
            null,
            null,
            null,
            null,
            $user_id,
            $bulan,
            $tahun,
            "utang",
            $status,
            false
        );

        foreach ($total_utang_raw as $utang) {
            $total_utang += $utang->nominal;
        }
        // end : total utang

        // start : total utang dibayar
        $total_dibayar_raw = $this->utangPiutangServices->getData(
            null,
            null,
            null,
            null,
            $user_id,
            $bulan,
            $tahun,
            "utang",
            1,
            false
        );

        foreach ($total_dibayar_raw as $utang) {
            $total_dibayar += $utang->nominal;
        }
        // end : total utang dibayar

        $total_belum_dibayar = $total_utang - $total_dibayar;
        $persentase = $total_utang > 0 ? ($total_dibayar / $total_utang) * 100 : 0;

        // Format persentase sesuai kebutuhan
        if (floor($persentase) == $persentase) {
            $persentase = number_format($persentase, 0, ',', ''); // Tidak ada angka desimal
        } elseif (floor($persentase * 10) == $persentase * 10) {
            $persentase = number_format($persentase, 1, ',', ''); // Satu angka desimal
        } else {
            $persentase = number_format($persentase, 2, ',', ''); // Dua angka desimal
        }

        return [
            "total_utang" => $total_utang,
            "total_dibayar" => $total_dibayar,
            "total_belum_dibayar" => $total_belum_dibayar,
            "persentase" => $persentase
        ];
    }

    public function store(Request $request)
    {
        $res = $this->utangPiutangServices->createData($request, $request->tipe == "piutang" ? "piutang" :"utang");

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
        $res = $this->utangPiutangServices->updateData($request, $id);

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
        $res = $this->utangPiutangServices->deleteData($id);

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

    public function bayar(Request $request, string $id)
    {
        $res = $this->utangPiutangServices->payProcess($request, $id);

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
