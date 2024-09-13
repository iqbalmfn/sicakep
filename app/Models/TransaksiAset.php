<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiAset extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'initial_rekening_id',
        'destination_rekening_id',
        'nominal',
        'biaya_administrasi',
        'tanggal'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function initial_rekening() {
        return $this->belongsTo(Rekening::class, 'initial_rekening_id', 'id');
    }

    public function destination_rekening() {
        return $this->belongsTo(Rekening::class, 'destination_rekening_id', 'id');
    }
}
