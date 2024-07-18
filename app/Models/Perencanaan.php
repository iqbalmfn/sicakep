<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perencanaan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'kategori_id',
        'nama',
        'nominal',
        'bulan',
        'tanggal',
        'status'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function kategori() {
        return $this->belongsTo(Kategori::class, 'kategori_id', 'id');
    }
}
