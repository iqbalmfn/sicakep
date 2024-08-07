<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UtangPiutang extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'perencanaan_id',
        'piutang_master_id',
        'judul',
        'tipe',
        'jenis',
        'nominal',
        'jatuh_tempo',
        'deskripsi',
        'status'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function perencanaan() {
        return $this->belongsTo(Perencanaan::class, 'perencanaan_id', 'id');
    }

    public function piutang() {
        return $this->belongsTo(PiutangMaster::class, 'piutang_master_id', 'id');
    }
}
