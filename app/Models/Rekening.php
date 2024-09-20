<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rekening extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bank_id',
        'nama_rekening',
        'no_rekening',
        'saldo',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function bank() {
        return $this->belongsTo(Bank::class, 'bank_id', 'id');
    }

    public function transaksi_aset_initial() {
        return $this->hasMany(TransaksiAset::class, 'initial_rekening_id', 'id');
    }

    public function transaksi_aset_destination() {
        return $this->hasMany(TransaksiAset::class, 'destination_rekening_id', 'id');
    }

    public function transaksi() {
        return $this->hasMany(Transaksi::class,  'rekening_id', 'id');
    }
}
