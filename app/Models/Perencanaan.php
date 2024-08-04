<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perencanaan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pic_id',
        'kategori_id',
        'judul',
        'nominal',
        'deskripsi',
        'bulan',
        'tahun',
        'tipe',
        'status'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function pic() {
        return $this->belongsTo(User::class, 'pic_id', 'id');
    }

    public function kategori() {
        return $this->belongsTo(Kategori::class, 'kategori_id', 'id');
    }

    public function logs() {
        return $this->hasMany(LogPerencanaan::class, 'perencanaan_id', 'id');
    }
}
