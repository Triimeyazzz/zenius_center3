<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cicilan extends Model
{
    use HasFactory;

    protected $table = 'cicilan';

    protected $fillable = [
        'pembayaran_id',
        'jumlah',
        'dibayar_pada',
    ];

    protected $casts = [
        'jumlah' => 'decimal:2',
        'dibayar_pada' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function pembayaran()
    {
        return $this->belongsTo(Pembayaran::class);
    }
}

