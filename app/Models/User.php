<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected static function boot()
{
    parent::boot();

    static::creating(function ($user) {
        if (empty($user->id)) {
            $lastUser = self::orderBy('id', 'desc')->first();
            $userId = $lastUser ? (int) substr($lastUser->id, 2) + 1 : 1;
            $user->id = str_pad($userId, 3, '0', STR_PAD_LEFT);
        }
    });
}

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'nomor_hp',
        'alamat',
        'role',
        'profile_picture', // Add this line
    ];
    

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
 
    public function sentMessages()
    {
        return $this->morphMany(Message::class, 'sender');
    }
    
    public function receivedMessages()
    {
        return $this->morphMany(Message::class, 'receiver');
    }
    public function getFormattedIdAttribute()
    {
        return str_pad($this->id, 3, '0', STR_PAD_LEFT);
    }
    }
