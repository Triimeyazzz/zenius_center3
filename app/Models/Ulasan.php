<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ulasan extends Model
{
    use HasFactory;

    protected $table = 'ulasan';

    protected $fillable = [
        'kursus_id',
        'pengguna_id',
        'penilaian',
        'komentar',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function kursus()
    {
        return $this->belongsTo(Kursus::class);
    }

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class);
    }
}

