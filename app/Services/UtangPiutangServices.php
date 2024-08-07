<?php

namespace App\Services;

use App\Models\Perencanaan;
use App\Models\Transaksi;
use App\Models\UtangPiutang;
use Illuminate\Support\Facades\DB;

class UtangPiutangServices
{
    public function getData(
        $q,
        $orderBy,
        $orderDirection,
        $perPage,
        $user_id = null,
        $bulan = null,
        $tahun = null,
        $tipe = null,
        $status = null,
        $isPagination = true
    ) {
        $data = UtangPiutang::query()
            ->with(['user']);

        if ($user_id) {
            $data->whereUserId($user_id);
        }

        if ($bulan && $bulan != "all") {
            $data->whereMonth('jatuh_tempo', $bulan);
        } elseif ($bulan == "all") {
        } else {
            $data->whereMonth('jatuh_tempo', date('m'));
        }

        if ($tahun && $tahun != "all") {
            $data->whereYear('jatuh_tempo', $tahun);
        } elseif ($tahun == "all") {
        } else {
            $data->whereYear('jatuh_tempo', date('Y'));
        }

        if ($tipe) {
            $data->whereTipe($tipe);
        }

        if (isset($status)) {
            $data->whereStatus($status);
        }

        if ($q) {
            $data->where(function ($query) use ($q) {
                $query->where('judul', 'like', '%' . $q . '%');
                $query->orWhere('nominal', 'like', '%' . $q . '%');
                $query->orWhere('deskripsi', 'like', '%' . $q . '%');
            });
        }

        if ($isPagination == true) {
            return $data->orderBy($orderBy ?? 'created_at', $orderDirection ?? 'desc')
                ->paginate($perPage ?? 10)
                ->withQueryString();
        } else {
            return $data->orderBy($orderBy ?? 'created_at', $orderDirection ?? 'desc')
                ->get();
        }
    }

    public function getDataById($id) {
        return UtangPiutang::find($id);
    }

    public function rules()
    {
        $create = [
            "user_id"       => "required|numeric",
            "judul"         => "required",
            "jenis"         => "required",
            "nominal"       => "required|numeric",
            "jatuh_tempo"   => "required|date",
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
        $input['status'] = 0;

        try {
            DB::beginTransaction();
            $create = UtangPiutang::create($input);

            // jika tipe = utang, create ke perencanaan
            if ($type == "utang") {
                $perencanaan = Perencanaan::create([
                    'user_id'       => $create['user_id'],
                    'pic_id'        => $create['user_id'],
                    'kategori_id'   => 9,
                    'judul'         => $create->judul,
                    'nominal'       => $create->nominal,
                    'bulan'         => date('m', strtotime($create->jatuh_tempo)),
                    'tahun'         => date('Y', strtotime($create->jatuh_tempo)),
                    'tipe'          => $create->jenis,
                    'deskripsi'     => $create->judul,
                ]);

                // update relasikan ke perencanaan
                $create->update([
                    'perencanaan_id' => $perencanaan->id,
                ]);
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
        $request->validate($this->rules()["create"]);

        $input = $request->all();

        try {
            DB::beginTransaction();

            $data = $this->getDataById($id);
            $data->update($input);

            DB::commit();

            return responseSuccess("Berhasil, data telah diupdate", $data);
        } catch (\Throwable $th) {
            DB::rollBack();

            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }

    public function deleteData($id)
    {
        try {
            $data = $this->getDataById($id);
            $data->delete();

            return responseSuccess("Berhasil, data telah dihapus", $data);
        } catch (\Throwable $th) {
            return responseError("Gagal, ada kesalahan pada sistem saat menghapus data " . $th->getMessage());
        }
    }

    public function payProcess($id) {
        try {
            DB::beginTransaction();

            $data = $this->getDataById($id);
            $data->update([
                'status' => 1
            ]);

            // menyimpan ke pengeluaran
            Transaksi::create([
                'user_id' => $data->user_id,
                'kategori_id' => 9,
                'perencanaan_id' => $data->perencanaan_id,
                'judul' => 'Pembayaran utang '.$data->judul,
                'tipe' => "pengeluaran",
                'jenis' => $data->jenis == "cash" ? "cash" : "online",
                'nominal' => $data->nominal,
                'tanggal' => date('Y-m-d'),
                'deskripsi' => "Pembayaran utang ". $data->judul,
            ]);

            DB::commit();

            return responseSuccess("Berhasil, utang telah dibayar", $data);
        } catch (\Throwable $th) {
            DB::rollBack();

            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }
}
