<?php

namespace App\Services;

use App\Models\Rekening;

class RekeningServices
{
    public function getData($q, $orderBy, $orderDirection, $perPage, $user_id = null, $bank_id = null, $select2 = null)
    {
        $data = Rekening::query()
            ->with(['bank', 'user', 'transaksi_aset_initial', 'transaksi_aset_destination', 'transaksi']);

        if ($user_id) {
            $data->whereUserId($user_id);
        }

        if ($bank_id) {
            $data->whereBankId($bank_id);
        }

        if ($q) {
            $data->where(function ($query) use ($q) {
                $query->where('nama_rekening', 'like', '%' . $q . '%');
                $query->where('no_rekening', 'like', '%' . $q . '%');
            });
        }

        if ($select2 == true) {
            $data->select('id as value', 'nama_rekening as label');
            return $data->get();
        }

        return $data->orderBy($orderBy ?? 'created_at', $orderDirection ?? 'desc')
            ->paginate($perPage ?? 10)
            ->withQueryString();
    }

    public function getDataById($id)
    {
        return Rekening::find($id);
    }

    public function rules()
    {
        $create = [
            "user_id" => "required",
            "bank_id" => "required",
            "nama_rekening" => "required",
            "no_rekening" => "nullable|numeric",
            "saldo" => "required|numeric",
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
            $create = Rekening::create($input);

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
