<?php

namespace App\Services;

use App\Models\Transaksi;
use Illuminate\Support\Facades\DB;

class TransaksiServices {
    public function getData(
        $q,
        $orderBy,
        $orderDirection,
        $perPage,
        $kategori_id = null,
        $bulan = null,
        $tahun = null,
        $tipe = null,
        $select2 = null
    ) {
        $data = Transaksi::query()
            ->with(['user', 'kategori']);

        if ($kategori_id) {
            $data->whereKategoriId($kategori_id);
        }

        if ($bulan) {
            $data->whereMonth('tanggal', $bulan);
        } else {
            $data->whereMonth('tanggal', date('m'));
        }

        if ($tahun) {
            $data->whereYear('tanggal', $tahun);
        } else {
            $data->whereYear('tanggal', date('Y'));
        }

        if ($tipe) {
            $data->whereTipe($tipe);
        }

        if ($q) {
            $data->where(function ($query) use ($q) {
                $query->where('judul', 'like', '%' . $q . '%');
                $query->orWhere('nominal', 'like', '%' . $q . '%');
                $query->orWhere('deskripsi', 'like', '%' . $q . '%');
            });
        }

        if ($select2 == true) {
            $data->select('id as value', 'judul as label');
            return $data->get();
        }

        return $data->orderBy($orderBy ?? 'created_at', $orderDirection ?? 'desc')
            ->paginate($perPage ?? 10)
            ->withQueryString();
    }

    public function getDataById($id)
    {
        return Transaksi::query()
            ->with(['user', 'kategori'])
            ->find($id);
    }

    public function rules()
    {
        $create = [
            "user_id" => "required|numeric",
            "kategori_id" => "required|numeric",
            "judul" => "required",
            "nominal" => "required|numeric",
            "tanggal" => "required|date",
            "jenis" => "required"
        ];

        return [
            "create" => $create,
            "update" => $create
        ];
    }

    public function createData($request, $type)
    {
        $request->validate($this->rules()["create"]);

        $input = $request->all();
        $input['tipe'] = $type;

        DB::beginTransaction();
        try {
            $create = Transaksi::create($input);

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

        DB::beginTransaction();
        try {
            $data = $this->getDataById($id);

            $update = $data->update($input);

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
}