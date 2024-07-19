<?php

namespace App\Services;

use App\Models\LogPerencanaan;
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
    ) {
        $data = Perencanaan::query()
            ->with(['user', 'kategori', 'logs.user']);

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
            ->with(['user', 'kategori', 'logs'])
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
                
            }
            $this->notificationServices->sendNotification(
                Auth::user()->id,
                'perencanaan',
                'Konfirmasi Anggaran',
                'Perencanaan anggaran dengan judul ' . $input['judul'] . ' perlu di konfirmasi',
                $admin,
                '/perencanaan'
            );

            DB::commit();

            return responseSuccess("Berhasil, pengajuan telah dikonfirmasi", $confirm);
        } catch (\Throwable $th) {
            DB::rollBack();

            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }
}
