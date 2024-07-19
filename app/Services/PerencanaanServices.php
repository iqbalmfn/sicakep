<?php

namespace App\Services;

use App\Models\Perencanaan;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PerencanaanServices
{
    protected $notificationServices;

    public function __construct(NotificationServices $notificationServices)
    {
        $this->notificationServices = $notificationServices;
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
        $select2 = null
    )
    {
        $data = Perencanaan::query()
            ->with(['user','kategori']);

        if ($kategori_id) {
            $data->whereKategoriId($kategori_id);
        }

        if ($bulan) {
            $data->whereBulan($bulan);
        }

        if ($tahun) {
            $data->whereTahun($tahun);
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

    public function getDataById($id)
    {
        return Perencanaan::query()
            ->with(['user','kategori'])
            ->find($id);
    }

    public function rules()
    {
        $create = [
            "kategori_id" => "required|numeric",
            "judul" => "required",
            "nominal" => "required|numeric",
            "tipe" => "required"
        ];

        return [
            "create" => $create,
            "update" => $create
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
                    $input['judul'],
                    'Perencanaan anggaran dengan judul ' . $input['judul'] . ' perlu di konfirmasi',
                    $admin,
                    '/perencanaan'
                );
            }

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

        $input = $request->all();

        try {
            $data = $this->getDataById($id);
            $update = $data->update($input);

            return responseSuccess("Berhasil, data telah diupdate", $update);
        } catch (\Throwable $th) {
            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }

    public function deleteData($id)
    {
        try {
            $data = $this->getDataById($id);
            $delete = $data->delete();

            return responseSuccess("Berhasil, data telah dihapus", $delete);
        } catch (\Throwable $th) {
            return responseError("Gagal, ada kesalahan pada sistem saat menghapus data " . $th->getMessage());
        }
    }
}
