<?php

namespace App\Services;

use App\Models\Transaksi;

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
}