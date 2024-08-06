<?php

namespace App\Http\Controllers\UtangPiutang;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\UtangPiutangServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UtangController extends Controller
{
    protected $utangPiutangServices;

    public function __construct() {
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
            true
        );

        $users = User::all();

        return Inertia::render('UtangPiutang/Utang/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
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
        $res = $this->utangPiutangServices->createData($request, "utang");

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
}
