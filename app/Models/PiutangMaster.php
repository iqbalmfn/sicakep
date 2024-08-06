<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PiutangMaster extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nama',
        'tanggal',
        'jatuh_tempo',
        'nominal',
        'deskripsi'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function piutang_detail() {
        return $this->hasMany(UtangPiutang::class, 'piutang_master_id', 'id');
    }
}
