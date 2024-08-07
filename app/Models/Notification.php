<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sender_id',
        'title',
        'type',
        'message',
        'url',
        'read_at'
    ];

    public function sender() {
        return $this->belongsTo(User::class, "sender_id", "id");
    }
}
