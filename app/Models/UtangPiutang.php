<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UtangPiutang extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'judul',
        'tipe',
        'nominal',
        'jatuh_tempo',
        'deskripsi',
        'status'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
