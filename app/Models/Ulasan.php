<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ulasan extends Model
{
    use HasFactory;

    public $table = 'ulasan';

    protected $fillable = [
        'siswa_id',
        'nama_pemberi_ulasan',
        'tipe_pemberi_ulasan',
        'foto_profile',
        'penilaian',
        'komentar',
    ];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }
}