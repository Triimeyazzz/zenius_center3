<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kursus extends Model
{
    use HasFactory;

    protected $table = 'kursus';

    protected $fillable = [
        'judul',
        'deskripsi',
        'gambar',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function pelajaran()
    {
        return $this->hasMany(Pelajaran::class);
    }

    public function pendaftaran()
    {
        return $this->hasMany(Pendaftaran::class);
    }

    public function ulasan()
    {
        return $this->hasMany(Ulasan::class);
    }

    public function soal()
    {
        return $this->hasMany(Soal::class);
    }
}

