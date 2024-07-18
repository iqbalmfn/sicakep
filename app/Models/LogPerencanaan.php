<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogPerencanaan extends Model
{
    use HasFactory;

    protected $fillable = [
        'perencanaan_id',
        'user_id',
        'status',
        'pesan'
    ];

    public function perencanaan() {
        return $this->belongsTo(Perencanaan::class, 'perencanaan_id', 'id');
    }

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
