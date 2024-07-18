<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Pengguna extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'pengguna';

    protected $fillable = [
        'nama',
        'email',
        'kata_sandi',
        'role',
    ];

    protected $hidden = [
        'kata_sandi',
        'remember_token',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function pendaftaran()
    {
        return $this->hasMany(Pendaftaran::class);
    }

    public function ulasan()
    {
        return $this->hasMany(Ulasan::class);
    }

    public function admin()
    {
        return $this->hasOne(Admin::class);
    }

    public function petugas()
    {
        return $this->hasOne(Petugas::class);
    }

    public function siswa()
    {
        return $this->hasOne(Siswa::class);
    }

    public function sesi()
    {
        return $this->hasMany(Sesi::class);
    }

    public function pesan()
    {
        return $this->hasMany(Pesan::class);
    }

    public function notifikasi()
    {
        return $this->hasMany(Notifikasi::class);
    }

    public function pembayaran()
    {
        return $this->hasMany(Pembayaran::class);
    }
}

