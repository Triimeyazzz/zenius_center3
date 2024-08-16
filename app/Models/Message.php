<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'sender_id', 'sender_type', 'receiver_id', 'receiver_type', 'message', 'attachment'
    ];

    // Polymorphic relationship to sender
    public function sender()
    {
        return $this->morphTo();
    }

    // Polymorphic relationship to receiver
    public function receiver()
    {
        return $this->morphTo();
    }

    protected static function boot()
    {
        parent::boot();
    }
}
