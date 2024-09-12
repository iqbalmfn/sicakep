<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Services\BankServices;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BankController extends Controller
{
    protected $bankServices;

    public function __construct()
    {
        $this->bankServices = app(BankServices::class);
    }

    public function index(Request $request)
    {
        $title = "Bank";
        $breadcrumbs = [
            ['name' => "Master", "link" => "#"],
            ['name' => $title],
        ];

        $datas = $this->bankServices->getData(
            $request->q,
            $request->orderBy,
            $request->orderDirection,
            $request->perPage,
            $request->jenis,
            $request->select2
        );

        return Inertia::render('Master/Bank/Index', [
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

    public function store(Request $request)
    {
        $res = $this->bankServices->createData($request);

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
        $res = $this->bankServices->updateData($request, $id);

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
        $res = $this->bankServices->deleteData( $id);

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
