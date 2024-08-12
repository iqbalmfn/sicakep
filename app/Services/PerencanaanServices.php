<?php

namespace App\Services;

use App\Models\LogPerencanaan;
use App\Models\Perencanaan;
use App\Models\Transaksi;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PerencanaanServices
{
    protected $notificationServices, $pdfServices;

    public function __construct(NotificationServices $notificationServices, PdfServices $pdfServices)
    {
        $this->notificationServices = $notificationServices;
        $this->pdfServices = $pdfServices;
    }

    public function getData(
        $q,
        $orderBy,
        $orderDirection,
        $perPage,
        $kategori_id = null,
        $bulan = null,
        $tahun = null,
        $status = null,
        $select2 = null,
        $pic_id
    ) {
        $data = Perencanaan::query()
            ->with(['user', 'pic', 'kategori', 'logs.user', 'transaksi']);

        if ($kategori_id) {
            $data->whereKategoriId($kategori_id);
        }

        if ($pic_id) {
            $data->wherePicId($pic_id);
        }


        if ($bulan && $bulan != "all") {
            $data->whereBulan($bulan);
        } elseif ($bulan == "all") {
        } else {
            $data->whereBulan(date('m'));
        }

        if ($tahun && $tahun != "all") {
            $data->whereTahun($tahun);
        } elseif ($tahun == "all") {
        } else {
            $data->whereTahun(date('Y'));
        }

        if (isset($status)) { // Periksa apakah $status diset
            if ($status !== 'all') {
                if ($status === 'waiting') {
                    $data->where('status', null);
                } else {
                    $data->where('status', $status);
                }
            }
        }

        if ($q) {
            $data->where(function ($query) use ($q) {
                $query->where('judul', 'like', '%' . $q . '%');
                $query->orWhere('nominal', 'like', '%' . $q . '%');
                $query->orWhere('deskripsi', 'like', '%' . $q . '%');
            });
        }

        if ($select2 == true) {
            $data->select('id as value', 'nama as label');
            return $data->get();
        }

        return $data->orderBy($orderBy ?? 'created_at', $orderDirection ?? 'desc')
            ->paginate($perPage ?? 10)
            ->withQueryString();
    }

    public function getDataAll(
        $q,
        $orderBy,
        $orderDirection,
        $kategori_id = null,
        $bulan = null,
        $tahun = null,
        $status = null,
        $select2 = null,
        $pic_id
    ) {
        $data = Perencanaan::query()
            ->with(['user', 'pic', 'kategori', 'logs.user', 'transaksi']);

        if ($kategori_id) {
            $data->whereKategoriId($kategori_id);
        }

        if ($pic_id) {
            $data->wherePicId($pic_id);
        }

        if ($bulan && $bulan != "all") {
            $data->whereBulan($bulan);
        } elseif ($bulan == "all") {
        } else {
            $data->whereBulan(date('m'));
        }

        if ($tahun && $tahun != "all") {
            $data->whereTahun($tahun);
        } elseif ($tahun == "all") {
        } else {
            $data->whereTahun(date('Y'));
        }

        if (isset($status)) { // Periksa apakah $status diset
            if ($status !== 'all') {
                if ($status === 'waiting') {
                    $data->where('status', null);
                } else {
                    $data->where('status', $status);
                }
            }
        }

        if ($q) {
            $data->where(function ($query) use ($q) {
                $query->where('judul', 'like', '%' . $q . '%');
                $query->orWhere('nominal', 'like', '%' . $q . '%');
                $query->orWhere('deskripsi', 'like', '%' . $q . '%');
            });
        }

        if ($select2 == true) {
            $data->select('id as value', 'nama as label');
            return $data->get();
        }

        return $data->orderBy($orderBy ?? 'created_at', $orderDirection ?? 'desc')
            ->get();
    }

    public function viewMode(
        $q,
        $orderBy,
        $orderDirection,
        $perPage,
        $kategori_id = null,
        $bulan = null,
        $tahun = null,
        $status = null,
        $select2 = null,
        $user_id = null
    ) {
        $datas = $this->getData(
            $q,
            $orderBy,
            $orderDirection,
            100,
            $kategori_id,
            $bulan,
            $tahun,
            $status,
            $select2,
            $user_id
        );

        $raw = $datas->items();

        $result = [
            "bulan" => $datas->items() ? $datas->items()[0]["bulan"] : date('m'),
            "tahun" => $datas->items() ? $datas->items()[0]["tahun"] : date('Y'),
            "kategori_list" => [],
            "total_cash" => 0,
            "total_transfer" => 0,
            "total" => 0
        ];

        $kategori_map = [];

        foreach ($raw as $item) {
            $kategori_id = $item["kategori_id"];
            $kategori_nama = $item['kategori']['nama'];  // Gantilah dengan nama kategori yang sebenarnya dari sumber data Anda

            if (!isset($kategori_map[$kategori_id])) {
                $kategori_map[$kategori_id] = [
                    "kategori" => $kategori_nama,
                    "list" => [],
                    "sub_total_cash" => 0,
                    "sub_total_transfer" => 0,
                    "sub_total" => 0
                ];
            }

            $kategori_map[$kategori_id]["list"][] = $item;

            if ($item["tipe"] == "cash") {
                $kategori_map[$kategori_id]["sub_total_cash"] += $item["nominal"];
            } elseif ($item["tipe"] == "transfer") {
                $kategori_map[$kategori_id]["sub_total_transfer"] += $item["nominal"];
            }

            $kategori_map[$kategori_id]["sub_total"] += $item["nominal"];
        }

        $result["kategori_list"] = array_values($kategori_map);

        foreach ($result["kategori_list"] as $kategori) {
            $result["total_cash"] += $kategori["sub_total_cash"];
            $result["total_transfer"] += $kategori["sub_total_transfer"];
            $result["total"] += $kategori["sub_total"];
        }

        return $result;
    }

    public function getDataById($id)
    {
        return Perencanaan::query()
            ->with(['user', 'kategori', 'logs'])
            ->find($id);
    }

    public function rules()
    {
        $create = [
            "pic_id" => "required|numeric",
            "kategori_id" => "required|numeric",
            "judul" => "required",
            "nominal" => "required|numeric",
            "tipe" => "required"
        ];

        $confirm = [
            "status" => "required"
        ];

        return [
            "create" => $create,
            "update" => $create,
            "confirm" => $confirm
        ];
    }

    public function createData($request)
    {
        $request->validate($this->rules()["create"]);

        $input = $request->all();
        $input['user_id'] = Auth::user()->id;
        $input['bulan'] = date('m');
        $input['tahun'] = date('Y');

        DB::beginTransaction();
        try {
            $create = Perencanaan::create($input);

            // cek super admin
            $admins = User::role('Admin')->get()->pluck('id');

            // kirim notifikasi
            foreach ($admins as $admin) {
                $this->notificationServices->sendNotification(
                    Auth::user()->id,
                    'perencanaan',
                    'Pengajuan Anggaran',
                    'Perencanaan anggaran dengan judul ' . $input['judul'] . ' perlu di konfirmasi',
                    $admin,
                    '/perencanaan'
                );
            }

            // simpan ke log_perencanaan
            LogPerencanaan::create([
                'perencanaan_id'    => $create->id,
                'user_id'           => Auth::user()->id,
                'status'            => 2,
                'pesan'             => 'Mengajukan anggaran untuk ' . $create->judul
            ]);

            DB::commit();

            return responseSuccess("Berhasil, data telah disimpan", $create);
        } catch (\Throwable $th) {
            DB::rollBack();

            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }

    public function updateData($request, $id)
    {
        $request->validate($this->rules()["update"]);

        $input = $request->except('status');

        DB::beginTransaction();
        try {
            $data = $this->getDataById($id);

            if ($data->status == $request->status) {
                if (!$data->status) {
                    $status = 2;
                    $input['status'] = null;
                } else {
                    $status = $data->status;
                    $input['status'] = $status;
                }
            } else {
                $status = 2;
                $input['status'] = null;
            }

            $update = $data->update($input);

            // simpan ke log_perencanaan
            LogPerencanaan::create([
                'perencanaan_id'    => $data->id,
                'user_id'           => Auth::user()->id,
                'status'            => $status,
                'pesan'             => 'Mengupdate pengajuan anggaran untuk ' . $data->judul
            ]);

            DB::commit();

            return responseSuccess("Berhasil, data telah diupdate", $update);
        } catch (\Throwable $th) {
            DB::rollBack();

            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }

    public function deleteData($id)
    {
        try {
            // hapus log
            LogPerencanaan::wherePerencanaanId($id)->delete();
            Transaksi::wherePerencanaanId($id)->delete();

            // hapus data perencanaan
            $data = $this->getDataById($id);
            $delete = $data->delete();

            return responseSuccess("Berhasil, data telah dihapus", $delete);
        } catch (\Throwable $th) {
            return responseError("Gagal, ada kesalahan pada sistem saat menghapus data " . $th->getMessage());
        }
    }

    public function confirmData($request, $id)
    {
        $request->validate($this->rules()["confirm"]);

        $input = $request->except(['pesan']);

        DB::beginTransaction();
        try {
            $data = $this->getDataById($id);
            $confirm = $data->update([
                'status' => $input['status']
            ]);

            if ($request->pesan) {
                $input['pesan'] = $request->pesan;
            } else {
                if ($input['status'] == 1) {
                    $input['pesan'] = 'Pengajuan anggaran untuk ' . $data->judul . ' telah diterima';
                } else {
                    $input['pesan'] = 'Pengajuan anggaran untuk ' . $data->judul . ' telah ditolak';
                }
            }

            // simpan ke log_perencanaan
            LogPerencanaan::create([
                'perencanaan_id'    => $data->id,
                'user_id'           => Auth::user()->id,
                'status'            => $data->status,
                'pesan'             => $input['pesan']
            ]);

            // simpan ke notification
            if ($request->status == 1) {
                $message = 'Perencanaan anggaran dengan judul ' . $input['judul'] . ' telah diterima';
            } else {
                $message = 'Perencanaan anggaran dengan judul ' . $input['judul'] . ' telah ditolak';
            }
            $this->notificationServices->sendNotification(
                Auth::user()->id,
                'perencanaan',
                'Konfirmasi Anggaran',
                $message,
                $data->user_id,
                '/perencanaan/' . $data->id
            );

            DB::commit();

            return responseSuccess("Berhasil, pengajuan telah dikonfirmasi", $confirm);
        } catch (\Throwable $th) {
            DB::rollBack();

            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }

    public function generatePdf($request)
    {
        $data = $this->getData(
            $request->q,
            'id',
            'asc',
            1000,
            $request->kategori_id,
            $request->bulan,
            $request->tahun,
            $request->status,
            null,
            null
        );

        return $this->pdfServices->generate(
            '/print/pdf/perencanaan',
            $data->items(),
            'Perencanaan',
        );
    }
}
