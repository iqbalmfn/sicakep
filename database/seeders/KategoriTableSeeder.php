<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // kategori pengeluaran
        $kategoriPengeluaran = [
            ['nama' => 'Kebutuhan Pokok', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Transportasi', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Tempat Tinggal', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Kesehatan', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Pendidikan', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Hiburan dan Rekreasi', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Kebutuhan Rumah Tangga', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Asuransi dan Investasi', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Tagihan dan Utang', 'jenis' => 'pengeluaran', 'status' => 0],
            ['nama' => 'Kebutuhan Pribadi', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Donasi dan Sumbangan', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Dana Darurat', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Administrasi', 'jenis' => 'pengeluaran', 'status' => 1],
            ['nama' => 'Lain-lain', 'jenis' => 'pengeluaran', 'status' => 1],
        ];
        Kategori::insert($kategoriPengeluaran);

        // kategori pemasukan
        $kategoriPemasukan = [
            ['nama' => 'Gaji dan Upah', 'jenis' => 'pemasukan', 'status' => 1],
            ['nama' => 'Pendapatan Usaha', 'jenis' => 'pemasukan', 'status' => 1],
            ['nama' => 'Investasi', 'jenis' => 'pemasukan', 'status' => 1],
            ['nama' => 'Bunga dan Tabungan', 'jenis' => 'pemasukan', 'status' => 1],
            ['nama' => 'Pendapatan Sewa', 'jenis' => 'pemasukan', 'status' => 1],
            ['nama' => 'Hadiah dan Hibah', 'jenis' => 'pemasukan', 'status' => 1],
            ['nama' => 'Piutang', 'jenis' => 'pemasukan', 'status' => 0],
            ['nama' => 'Pengembalian Pajak', 'jenis' => 'pemasukan', 'status' => 1],
            ['nama' => 'Asuransi', 'jenis' => 'pemasukan', 'status' => 1],
            ['nama' => 'Pensiun', 'jenis' => 'pemasukan', 'status' => 1],
            ['nama' => 'Lain-lain', 'jenis' => 'pemasukan', 'status' => 1],
        ];
        Kategori::insert($kategoriPemasukan);
    }
}
