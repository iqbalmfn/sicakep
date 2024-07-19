<?php

namespace App\Services;

use App\Models\Kategori;

class KategoriServices {
    public function getData($q, $orderBy, $orderDirection, $perPage, $jenis = null, $status = null, $select2 = null)
    {
        $data = Kategori::query();

        if ($jenis) {
            $data->whereJenis($jenis);
        }

        if ($status) {
            $data->whereStatus($status);
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

    public function getDataById($id) {
        return Kategori::find($id);
    }

    public function rules()
    {
        $create = [
            "nama" => "required",
            "jenis" => "required",
            "status" => "required",
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

        try {
            $create = Kategori::create($input);

            return responseSuccess("Berhasil, data telah disimpan", $create);
        } catch (\Throwable $th) {
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

    public function deleteData($id) {
        try {
            $data = $this->getDataById($id);
            $delete = $data->delete();

            return responseSuccess("Berhasil, data telah dihapus", $delete);
        } catch (\Throwable $th) {
            return responseError("Gagal, ada kesalahan pada sistem saat menghapus data ". $th->getMessage());
        }
    }
}