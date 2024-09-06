<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;

    protected $table = 'pembayaran';
    protected $fillable = ['siswa_id', 'jumlah', 'status', 'tgl_jatuh_tempo'];

    public function siswa()
    {
        return $this->belongsTo(Siswa::class);
    }

    public function cicilan()
    {
        return $this->hasMany(Cicilan::class);
    }
}
