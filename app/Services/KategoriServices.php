<?php

namespace App\Services;

use App\Models\Kategori;

class KategoriServices {
    public function getData($q, $orderBy, $orderDirection, $perPage, $jenis = null, $select2 = null)
    {
        $data = Kategori::query();

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
        }

        return $data->orderBy($orderBy ?? 'created_at', $orderDirection ?? 'desc')
            ->paginate($perPage ?? 10)
            ->withQueryString();
    }
}