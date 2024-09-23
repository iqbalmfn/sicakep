<?php

namespace App\Services;

use App\Models\Perencanaan;
use App\Models\PiutangMaster;
use App\Models\Rekening;
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
            ->with(['user', 'piutang']);

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

    public function getDataPiutangMaster(
        $q,
        $orderBy,
        $orderDirection,
        $perPage,
        $user_id = null,
        $nama = null,
        $isPagination = true
    ) {
        $data = PiutangMaster::query()
            ->with(['user', 'piutang_detail']);

        if ($user_id) {
            $data->whereUserId($user_id);
        }

        if ($nama) {
            $data->where('nama', 'like', '%' . $nama. '%');
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

    public function getDataById($id)
    {
        return UtangPiutang::find($id);
    }

    public function getDataPiutangById($id)
    {
        return PiutangMaster::find($id);
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

        $createPiutang = [
            "user_id"       => "required|numeric",
            "nama"          => "required",
            "tanggal"       => "required|date",
            "nominal"       => "required|numeric",
            "jatuh_tempo"   => "nullable|date",
        ];

        return [
            "create" => $create,
            "update" => $create,
            "createPiutang" => $createPiutang,
            "updatePiutang" => $createPiutang,
        ];
    }

    public function createData($request, $type)
    {
        $request->validate($this->rules()["create"]);

        $input = $request->all();
        $input['tipe'] = $type;
        $input['status'] = $type == "utang" ? 0 : 1;

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
            } else if ($type == "piutang") {
                // baca piutang master
                $piutangMaster = PiutangMaster::find($input['piutang_master_id']);

                // simpan ke table transaksi
                Transaksi::create([
                    'user_id'       => $input['user_id'],
                    'kategori_id'   => 21,
                    'rekening_id'   => $input['rekening_id'],
                    'judul'         => 'Pembayaran Piutang ' . $piutangMaster->nama,
                    'tipe'          => 'pemasukan',
                    'jenis'         => $input['jenis'] == 'transfer' ? 'online' : 'cash',
                    'nominal'       => $input['nominal'],
                    'tanggal'       => $input['jatuh_tempo'],
                    'deskripsi'     => $input['deskripsi'],
                ]);

                // update saldo rekening
                $rekening = Rekening::find($input['rekening_id']);
                $rekening->update([
                   'saldo' => $rekening->saldo + $input['nominal'],
                ]);
            }

            DB::commit();

            return responseSuccess("Berhasil, data telah disimpan", $create);
        } catch (\Throwable $th) {
            DB::rollBack();

            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }

    public function createDataPiutang($request)
    {
        $request->validate($this->rules()["createPiutang"]);

        $input = $request->all();

        try {
            DB::beginTransaction();
            $create = PiutangMaster::create($input);

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

            // jika tipe = utang, update ke perencanaan
            if ($data->tipe == "utang") {
                $perencanaan = Perencanaan::whereId($data->perencanaan_id)->first();
                $perencanaan->update([
                    'judul'         => $data->judul,
                    'nominal'       => $data->nominal,
                    'bulan'         => date('m', strtotime($data->jatuh_tempo)),
                    'tahun'         => date('Y', strtotime($data->jatuh_tempo)),
                    'tipe'          => $data->jenis,
                ]);
            }

            DB::commit();

            return responseSuccess("Berhasil, data telah diupdate", $data);
        } catch (\Throwable $th) {
            DB::rollBack();

            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }

    public function updateDataPiutang($request, $id)
    {
        $request->validate($this->rules()["createPiutang"]);

        $input = $request->all();

        try {
            DB::beginTransaction();

            $data = $this->getDataPiutangById($id);
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

    public function deleteDataPiutang($id)
    {
        try {
            DB::beginTransaction();

            // Dapatkan data yang akan dihapus
            $data = $this->getDataPiutangById($id);

            // Hapus utang piutang yang berkaitan dengan piutang_master_id
            $utangPiutang = UtangPiutang::where('piutang_master_id', $data->id)->get();
            foreach ($utangPiutang as $item) {
                $item->delete();
            }

            // Hapus pemasukan yang berkaitan
            $pemasukan = Transaksi::where('tipe', 'pemasukan')
                ->whereKategoriId(21)
                ->where('judul', 'like', '%' . $data->nama . '%')
                ->get();
            foreach ($pemasukan as $item) {
                $item->delete();
            }

            // Setelah menghapus semua data terkait, hapus piutang_master
            $data->delete();

            DB::commit();
            return responseSuccess("Berhasil, data telah dihapus", $data);
        } catch (\Throwable $th) {
            DB::rollBack();
            return responseError("Gagal, ada kesalahan pada sistem saat menghapus data " . $th->getMessage());
        }
    }


    public function payProcess($request, $id)
    {
        try {
            DB::beginTransaction();

            $data = $this->getDataById($id);
            $data->update([
                'status' => 1
            ]);

            // menyimpan ke pengeluaran
            Transaksi::create([
                'user_id' => $request->user_id,
                'kategori_id' => 9,
                'perencanaan_id' => $data->perencanaan_id,
                'rekening_id' => $request->rekening_id,
                'judul' => 'Pembayaran utang ' . $data->judul,
                'tipe' => "pengeluaran",
                'jenis' => $data->jenis == "cash" ? "cash" : "online",
                'nominal' => $data->nominal,
                'tanggal' => date('Y-m-d'),
                'deskripsi' => "Pembayaran utang " . $data->judul,
            ]);

            // update saldo rekening
            $rekening = Rekening::find($request->rekening_id);

            if ($rekening->saldo < $data->nominal) {
                DB::rollBack();
                return responseError("Gagal, saldo di rekening tidak cukup");
            }

            $rekening->update([
                'saldo' => $rekening->saldo - $data->nominal
            ]);

            DB::commit();

            return responseSuccess("Berhasil, utang telah dibayar", $data);
        } catch (\Throwable $th) {
            DB::rollBack();

            return responseError("Gagal, ada kesalahan pada sistem saat mengirim data " . $th->getMessage());
        }
    }
}
