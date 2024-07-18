<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;

    protected $table = 'pembayaran';

    protected $fillable = [
        'pengguna_id',
        'jumlah',
        'status',
    ];

    protected $casts = [
        'jumlah' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function pengguna()
    {
        return $this->belongsTo(Pengguna::class);
    }

    public function cicilan()
    {
        return $this->hasMany(Cicilan::class);
    }
}

