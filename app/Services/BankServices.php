<?php

namespace App\Services;

use App\Models\Bank;
use Illuminate\Support\Facades\DB;

class BankServices
{
    public function getData($q, $orderBy, $orderDirection, $perPage, $jenis = null, $select2 = null)
    {
        $data = Bank::query();

        if ($jenis) {
            $data->whereJenis($jenis);
        }

        if ($q) {
            $data->where(function ($query) use ($q) {
                $query->where('nama', 'like', '%' . $q . '%');
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
        return Bank::find($id);
    }

    public function rules()
    {
        $create = [
            "nama" => "required",
            "jenis" => "required",
            "logo" => "nullable|image|max:5120",
        ];

        return [
            "create" => $create,
            "update" => $create
        ];
    }

    public function createData($request)
    {
        $request->validate($this->rules()["create"]);

        $input = $request->except('logo');

        try {
            DB::beginTransaction();

            if ($request->file('logo')) {
                // save file asli
                $file = saveFile($request->file('logo'), 'bank', 'bank');

                // nama file
                $input['logo'] = $file;
            }

            $create = Bank::create($input);

            DB::commit();
            return responseSuccess("Berhasil, data telah disimpan", $create);
        } catch (\Throwable $th) {
            DB::rollBack();
            deleteFile($file, 'bank');
            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }

    public function updateData($request, $id)
    {
        $request->validate($this->rules()["update"]);

        $input = $request->except('logo');

        try {
            DB::beginTransaction();

            $data = $this->getDataById($id);

            if ($request->file('logo')) {
                // save file asli
                $file = saveFile($request->file('logo'), 'bank', 'bank');
                
                // hapus file lama
                deleteFile($data->logo, 'bank');

                // nama file
                $input['logo'] = $file;
            }

            $update = $data->update($input);

            DB::commit();
            return responseSuccess("Berhasil, data telah diupdate", $update);
        } catch (\Throwable $th) {
            DB::rollBack();
            deleteFile($file, 'bank');
            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }

    public function deleteData($id)
    {
        try {
            DB::beginTransaction();

            $data = $this->getDataById($id);
            $delete = $data->delete();

            if ($data) {
                //hapus file
                deleteFile($data->logo, 'bank');
            }

            DB::commit();

            return responseSuccess("Berhasil, data telah dihapus", $delete);
        } catch (\Throwable $th) {
            return responseError("Gagal, ada kesalahan pada sistem saat menghapus data " . $th->getMessage());
        }
    }
}
