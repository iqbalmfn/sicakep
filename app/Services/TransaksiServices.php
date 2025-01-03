<?php

namespace App\Services;

use App\Models\Perencanaan;
use App\Models\Rekening;
use App\Models\Transaksi;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransaksiServices
{
    protected $perencanaanServices;

    public function __construct(PerencanaanServices $perencanaanServices)
    {
        $this->perencanaanServices = $perencanaanServices;
    }

    public function getData(
        $q,
        $orderBy,
        $orderDirection,
        $perPage,
        $kategori_id = null,
        $bulan = null,
        $tahun = null,
        $tipe = null,
        $rekening_id = null,
        $select2 = null
    ) {
        $data = Transaksi::query()
            ->with(['user', 'kategori', 'perencanaan', 'rekening.bank']);

        if ($kategori_id) {
            $data->whereKategoriId($kategori_id);
        }

        if ($bulan && $bulan != "all") {
            $data->whereMonth('tanggal', $bulan);
        } elseif ($bulan == "all") {
        } else {
            $data->whereMonth('tanggal', date('m'));
        }

        if ($tahun && $tahun != "all") {
            $data->whereYear('tanggal', $tahun);
        } elseif ($tahun == "all") {
        } else {
            $data->whereYear('tanggal', date('Y'));
        }

        if ($tipe) {
            $data->whereTipe($tipe);
        }

        if ($rekening_id) {
            $data->whereRekeningId($rekening_id);
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

    public function getDataAll(
        $q,
        $orderBy,
        $orderDirection,
        $kategori_id = null,
        $bulan = null,
        $tahun = null,
        $tipe = null,
        $rekening_id = null,
        $select2 = null
    ) {
        $data = Transaksi::query()
            ->with(['user', 'kategori', 'perencanaan']);

        if ($kategori_id) {
            $data->whereKategoriId($kategori_id);
        }

        if ($bulan && $bulan != "all") {
            $data->whereMonth('tanggal', $bulan);
        } elseif ($bulan == "all") {
        } else {
            $data->whereMonth('tanggal', date('m'));
        }

        if ($tahun && $tahun != "all") {
            $data->whereYear('tanggal', $tahun);
        } elseif ($tahun == "all") {
        } else {
            $data->whereYear('tanggal', date('Y'));
        }

        if ($tipe) {
            $data->whereTipe($tipe);
        }

        if ($rekening_id) {
            $data->whereRekeningId($rekening_id);
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
            ->get();
    }

    public function getDataById($id)
    {
        return Transaksi::query()
            ->with(['user', 'kategori', 'rekening'])
            ->find($id);
    }

    public function rules()
    {
        $create = [
            "user_id" => "required|numeric",
            "kategori_id" => "required|numeric",
            "rekening_id" => "required|numeric",
            "judul" => "required",
            "nominal" => "required|numeric",
            "tanggal" => "required|date",
            "jenis" => "required",
            "is_sesuai" => "nullable|boolean",
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

        try {
            DB::beginTransaction();

            $create = Transaksi::create($input);

            // baca data rekening
            $rekening = Rekening::find($input['rekening_id']);

            if (!$rekening) {
                DB::rollBack();
                return responseError("Gagal, rekening tidak ditemukan");
            }

            if ($type === "pemasukan") {
                // update saldo rekening
                $rekening->update([
                    'saldo' => $rekening->saldo + $input['nominal']
                ]);

                Log::info("Pengmasukan : " . $input['judul'] . " = " . formatRupiah($input['nominal']) . " | Sisa Saldo (".$rekening->nama_rekening.") = " . formatRupiah($rekening->saldo));
            }

            if ($type === "pengeluaran") {
                // cek apakah saldo cukup
                if ($rekening->saldo < $input['nominal']) {
                    DB::rollBack();
                    return responseError("Gagal, saldo di rekening tidak cukup");
                }

                // update saldo rekening
                $rekening->update([
                    'saldo' => $rekening->saldo - $input['nominal']
                ]);

                Log::info("Pengeluaran : " . $input['judul'] . " = " . formatRupiah($input['nominal']) . " | Sisa Saldo (".$rekening->nama_rekening.") = " . formatRupiah($rekening->saldo));
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

        $input = $request->except('nominal_strict');

        DB::beginTransaction();
        try {
            $data = $this->getDataById($id);

            if ($data->tipe === "pemasukan") {
                if ($data->rekening_id != $request->rekening_id) {
                    // baca data rekening baru
                    $rekeningBaru = Rekening::find($input['rekening_id']);

                    if (!$rekeningBaru) {
                        DB::rollBack();
                        return responseError("Gagal, rekening tidak ditemukan");
                    }

                    // update saldo dari rekening lama
                    $data->rekening->update([
                        'saldo' => $data->rekening->saldo - $data->nominal
                    ]);

                    // update saldo ke rekening baru
                    $rekeningBaru->update([
                        'saldo' => $rekeningBaru->saldo + $input['nominal']
                    ]);
                } else {
                    // update saldo ke rekening yang sama
                    $data->rekening->update([
                        'saldo' => $data->rekening->saldo - $data->nominal + $input['nominal']
                    ]);
                }
            } elseif ($data->tipe === "pengeluaran") {
                if ($data->rekening_id != $request->rekening_id) {
                    // baca data rekening baru
                    $rekeningBaru = Rekening::find($input['rekening_id']);

                    if (!$rekeningBaru) {
                        DB::rollBack();
                        return responseError("Gagal, rekening tidak ditemukan");
                    }

                    // cek apakah saldo cukup
                    if ($rekeningBaru->saldo < $input['nominal']) {
                        DB::rollBack();
                        return responseError("Gagal, saldo di rekening tidak cukup");
                    }

                    // update saldo dari rekening lama
                    $data->rekening->update([
                        'saldo' => $data->rekening->saldo + $data->nominal
                    ]);

                    // update saldo ke rekening baru
                    $rekeningBaru->update([
                        'saldo' => $rekeningBaru->saldo - $input['nominal']
                    ]);
                } else {
                    // update saldo ke rekening yang sama
                    $data->rekening->update([
                        'saldo' => $data->rekening->saldo + $data->nominal - $input['nominal']
                    ]);
                }
            }

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

            // baca data rekening 
            $rekening = Rekening::find($data->rekening_id);

            if (!$rekening) {
                DB::rollBack();
                return responseError("Gagal, rekening tidak ditemukan");
            }

            if ($data->tipe === "pemasukan") {
                // update saldo rekening
                $rekening->update([
                    'saldo' => $rekening->saldo - $data->nominal
                ]);
            }

            if ($data->tipe === "pengeluaran") {
                // update saldo rekening
                $rekening->update([
                    'saldo' => $rekening->saldo + $data->nominal
                ]);
            }

            $delete = $data->delete();

            return responseSuccess("Berhasil, data telah dihapus", $delete);
        } catch (\Throwable $th) {
            return responseError("Gagal, ada kesalahan pada sistem saat menghapus data " . $th->getMessage());
        }
    }

    public function viewPengeluaranMode(
        $q,
        $orderBy,
        $orderDirection,
        $kategori_id = null,
        $bulan = null,
        $tahun = null,
        $status = null,
        $select2 = null,
        $user_id
    ) {
        $data = Perencanaan::query()
            // ->whereHas('transaksi')
            ->with(['kategori', 'transaksi.user']);

        if ($kategori_id) {
            $data->whereKategoriId($kategori_id);
        }

        if ($user_id) {
            $data->wherePicId($user_id);
        }

        if ($bulan) {
            $data->whereBulan($bulan);
        } else {
            $data->whereBulan(date('m'));
        }

        if ($tahun) {
            $data->whereTahun($tahun);
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

        $raw = $data->orderBy($orderBy ?? 'created_at', $orderDirection ?? 'desc')
            ->get();

        $result = [
            "bulan" => $raw ? $raw[0]["bulan"] : date('m'),
            "tahun" => $raw ? $raw[0]["tahun"] : date('Y'),
            "kategori_list" => [],
            "total_cash" => 0,
            "total_transfer" => 0,
            "total" => 0
        ];

        $kategori_map = [];

        foreach ($raw as $item) {
            // baca data transaksi

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
}
