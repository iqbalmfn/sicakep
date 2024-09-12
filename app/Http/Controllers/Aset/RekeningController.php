<?php

namespace App\Http\Controllers\Aset;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\BankServices;
use App\Services\RekeningServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RekeningController extends Controller
{
    protected $rekeningServices, $bankServices;

    public function __construct()
    {
        $this->rekeningServices = app(RekeningServices::class);
        $this->bankServices = app(BankServices::class);
    }

    public function index(Request $request)
    {
        $title = "Rekening";
        $breadcrumbs = [
            ['name' => "Aset", "link" => "#"],
            ['name' => $title],
        ];

        $datas = $this->rekeningServices->getData(
            $request->q,
            $request->orderBy,
            $request->orderDirection,
            $request->perPage,
            $request->user_id,
            $request->bank_id,
            $request->select2
        );

        $banks = $this->bankServices->getData(null, null, null, null, null, true);

        $users = User::all();

        return Inertia::render('Aset/Rekening/Index', [
            "title" => $title,
            "breadcrumbs" => $breadcrumbs,
            "datas" => $datas,
            "banks" => $banks,
            "users" => $users,
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
        $res = $this->rekeningServices->createData($request);

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
        $res = $this->rekeningServices->updateData($request, $id);

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
        $res = $this->rekeningServices->deleteData($id);

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
