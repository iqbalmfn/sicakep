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

        return Inertia::render('UtangPiutang/Piutang/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "users" => $users,
            "peminjams" => $peminjams,
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
