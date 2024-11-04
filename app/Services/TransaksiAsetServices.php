<?php

namespace App\Services;

use App\Models\Perencanaan;
use App\Models\Rekening;
use App\Models\Transaksi;
use App\Models\TransaksiAset;
use Illuminate\Support\Facades\DB;

class TransaksiAsetServices
{
    public function getData(
        $q,
        $orderBy,
        $orderDirection,
        $perPage,
        $user_id = null,
        $bulan = null,
        $tahun = null
    ) {
        $data = TransaksiAset::query()
            ->with(['initial_rekening.bank', 'destination_rekening.bank']);

        if ($user_id) {
            $data->whereUserId($user_id);
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

        if ($q) {
            $data->where(function ($query) use ($q) {
                $query->where('nama_rekening', 'like', '%' . $q . '%');
                $query->where('no_rekening', 'like', '%' . $q . '%');
            });
        }

        return $data->orderBy($orderBy ?? 'created_at', $orderDirection ?? 'desc')
            ->paginate($perPage ?? 10)
            ->withQueryString();
    }

    public function getDataById($id)
    {
        return TransaksiAset::query()
            ->with(['user', 'initial_rekening', 'destination_rekening'])
            ->find($id);
    }

    public function rules()
    {
        $create = [
            "initial_rekening_id" => "required|numeric",
            "destination_rekening_id" => "required|numeric",
            "nominal" => "required|numeric",
            "biaya_administrasi" => "nullable|numeric",
            "tanggal" => "required|date",
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
        $input['user_id'] = $request->user()->id;

        if (!$request->biaya_administrasi) {
            $input['biaya_administrasi'] = 0;
        }

        try {
            DB::beginTransaction();
            $create = TransaksiAset::create($input);

            // cek apakah saldo initial cukup
            $initialRekening = Rekening::find($request->initial_rekening_id);
            if ($initialRekening) {
                $totalPotonganBaru = $request->nominal + ($request->biaya_administrasi ?? 0);

                // Cek apakah saldo initialRekening cukup untuk nominal baru
                if ($totalPotonganBaru > $initialRekening->saldo) {
                    DB::rollBack();
                    return responseError("Gagal, saldo tidak cukup untuk melakukan transaksi");
                }

                if ($totalPotonganBaru > $initialRekening->saldo) {
                    DB::rollBack();
                    return responseError("Gagal, saldo tidak cukup");
                }

                // mengurangi saldo initial rekening
                $initialRekening->update([
                    'saldo' => $initialRekening->saldo - $totalPotonganBaru
                ]);
            } else {
                DB::rollBack();
                return responseError("Gagal, initial rekening tidak ditemukan");
            }

            // menambah saldo destionation rekening
            $destinationRekening = Rekening::find($request->destination_rekening_id);
            if ($destinationRekening) {
                $destinationRekening->update([
                    'saldo' => $destinationRekening->saldo + $request->nominal
                ]);
            } else {
                DB::rollBack();
                return responseError("Gagal, destination rekening tidak ditemukan");
            }

            // simpan transaksi biaya administrasi
            if ($request->biaya_administrasi) {
                // cek perencanaan administrasi
                $perencanaan = Perencanaan::query()
                    ->whereBulan(date('m', strtotime($request->tanggal)))
                    ->whereTahun(date('Y', strtotime($request->tanggal)))
                    ->whereKategoriId(13)
                    ->first();

                if (!$perencanaan) {
                    DB::rollBack();
                    return responseError("Gagal, Administrasi tidak dianggarkan");
                }

                // input ke transaksi pengeluaran
                Transaksi::create([
                    'user_id' => $input['user_id'],
                    'kategori_id' => 13,
                    'perencanaan_id' => $perencanaan->id,
                    'rekening_id' => $request->initial_rekening_id,
                    'judul' => 'Biaya Administrasi Transfer Pemindahan Dana',
                    'tipe' => 'pengeluaran',
                    'jenis' => 'online',
                    'nominal' => $request->biaya_administrasi,
                    'tanggal' => $request->tanggal,
                    'deskripsi' => 'Biaya administrasi transfer ke rekening ' . $destinationRekening->nama_rekening,
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
        $request->validate($this->rules()["update"]); // Validasi sesuai dengan aturan update

        $input = $request->all();
        $input['user_id'] = $request->user()->id;

        if (!$request->biaya_administrasi) {
            $input['biaya_administrasi'] = 0;
        }

        try {
            DB::beginTransaction();

            // Cari transaksi yang akan di-update
            $transaksiAset = TransaksiAset::find($id);
            if (!$transaksiAset) {
                DB::rollBack();
                return responseError("Gagal, transaksi aset tidak ditemukan");
            }

            // Cek apakah rekening awal dan rekening tujuan ada
            $initialRekening = Rekening::find($request->initial_rekening_id);
            $destinationRekening = Rekening::find($request->destination_rekening_id);

            if (!$initialRekening) {
                DB::rollBack();
                return responseError("Gagal, initial rekening tidak ditemukan");
            }

            if (!$destinationRekening) {
                DB::rollBack();
                return responseError("Gagal, destination rekening tidak ditemukan");
            }

            // Rollback saldo ke sebelum transaksi
            // Tambahkan kembali nominal sebelumnya ke initialRekening dan kurangi dari destinationRekening
            $initialRekening->update([
                'saldo' => $initialRekening->saldo + $transaksiAset->nominal + $transaksiAset->biaya_administrasi
            ]);

            $destinationRekening->update([
                'saldo' => $destinationRekening->saldo - $transaksiAset->nominal
            ]);

            // Hitung total potongan baru (nominal + biaya administrasi jika ada)
            $totalPotonganBaru = $request->nominal + ($request->biaya_administrasi ?? 0);

            // Cek apakah saldo initialRekening cukup untuk nominal baru
            if ($totalPotonganBaru > $initialRekening->saldo) {
                DB::rollBack();
                return responseError("Gagal, saldo tidak cukup untuk melakukan transaksi");
            }

            // Update saldo initialRekening dengan potongan baru
            $initialRekening->update([
                'saldo' => $initialRekening->saldo - $totalPotonganBaru
            ]);

            // Update saldo destinationRekening dengan nominal baru
            $destinationRekening->update([
                'saldo' => $destinationRekening->saldo + $request->nominal
            ]);

            // Update data transaksi utama
            $transaksiAset->update($input);

            // Update atau simpan transaksi biaya administrasi
            if ($request->biaya_administrasi) {
                // Cari transaksi biaya administrasi terkait jika ada
                $transaksiBiaya = Transaksi::where('kategori_id', 13)
                    ->where('deskripsi', 'LIKE', '%Biaya administrasi transfer ke rekening '.$destinationRekening->nama_rekening.'%')
                    ->where('user_id', $input['user_id'])
                    ->where('tanggal', $request->tanggal)
                    ->orderByDesc('id')
                    ->first();

                // Cek perencanaan administrasi
                $perencanaan = Perencanaan::query()
                    ->whereBulan(date('m', strtotime($request->tanggal)))
                    ->whereTahun(date('Y', strtotime($request->tanggal)))
                    ->whereKategoriId(13)
                    ->first();

                if (!$perencanaan) {
                    return responseError("Gagal, Administrasi tidak dianggarkan");
                }

                // Jika transaksi biaya administrasi sudah ada, update
                if ($transaksiBiaya) {
                    $transaksiBiaya->update([
                        'nominal' => $request->biaya_administrasi,
                        'perencanaan_id' => $perencanaan->id,
                        'deskripsi' => 'Biaya administrasi transfer ke rekening ' . $destinationRekening->nama_rekening,
                    ]);
                } else {
                    // Jika belum ada, buat transaksi biaya administrasi baru
                    Transaksi::create([
                        'user_id' => $input['user_id'],
                        'kategori_id' => 13,
                        'perencanaan_id' => $perencanaan->id,
                        'rekening_id' => $initialRekening->id,
                        'judul' => 'Biaya Administrasi Transfer Pemindahan Dana',
                        'tipe' => 'pengeluaran',
                        'jenis' => 'online',
                        'nominal' => $request->biaya_administrasi,
                        'tanggal' => $request->tanggal,
                        'deskripsi' => 'Biaya administrasi transfer ke rekening ' . $destinationRekening->nama_rekening,
                    ]);
                }
            }

            // Commit transaksi
            DB::commit();

            return responseSuccess("Berhasil, data telah diperbarui", $transaksiAset);
        } catch (\Throwable $th) {
            DB::rollBack();
            return responseError("Gagal, ada kesalahan pada sistem saat memperbarui data " . $th->getMessage());
        }
    }

    public function deleteData($id)
    {
        try {
            DB::beginTransaction();

            // Cari transaksi yang akan dihapus
            $transaksiAset = TransaksiAset::find($id);
            if (!$transaksiAset) {
                return responseError("Gagal, transaksi tidak ditemukan");
            }

            // Cek apakah rekening awal dan rekening tujuan ada
            $initialRekening = Rekening::find($transaksiAset->initial_rekening_id);
            $destinationRekening = Rekening::find($transaksiAset->destination_rekening_id);

            if (!$initialRekening) {
                return responseError("Gagal, initial rekening tidak ditemukan");
            }

            if (!$destinationRekening) {
                return responseError("Gagal, destination rekening tidak ditemukan");
            }

            // Rollback saldo sebelum transaksi
            // Kembalikan nominal dari destinationRekening dan tambahkan ke initialRekening
            $initialRekening->update([
                'saldo' => $initialRekening->saldo + $transaksiAset->nominal + $transaksiAset->biaya_administrasi
            ]);

            $destinationRekening->update([
                'saldo' => $destinationRekening->saldo - $transaksiAset->nominal
            ]);

            // Hapus transaksi biaya administrasi jika ada
            if ($transaksiAset->biaya_administrasi) {
                // Cari transaksi biaya administrasi terkait
                $transaksiBiaya = Transaksi::where('kategori_id', 13)
                    ->where('deskripsi', 'LIKE', '%Biaya administrasi transfer ke rekening '.$destinationRekening->nama_rekening.'%')
                    ->where('user_id', $transaksiAset->user_id)
                    ->where('tanggal', $transaksiAset->tanggal)
                    ->orderByDesc('id')
                    ->first();

                if ($transaksiBiaya) {
                    $transaksiBiaya->delete();
                }
            }

            // Hapus transaksi utama
            $transaksiAset->delete();

            DB::commit();

            return responseSuccess("Berhasil, data telah dihapus");
        } catch (\Throwable $th) {
            DB::rollBack();
            return responseError("Gagal, ada kesalahan pada sistem saat menghapus data: " . $th->getMessage());
        }
    }
}
