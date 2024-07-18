<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    use HasFactory;

    protected $table = 'pendaftaran';

    protected $fillable = [
        'pengguna_id',
        'kursus_id',
        'terdaftar_pada',
        'selesai_pada',
    ];

    protected $casts = [
        'terdaftar_pada' => 'datetime',
        'selesai_pada' => 'datetime',
    ];

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class);
    }

    public function kursus()
    {
        return $this->belongsTo(Kursus::class);
    }
}

