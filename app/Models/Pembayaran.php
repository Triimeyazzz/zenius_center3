<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_amount',
        'payment_type',
        'remaining_amount',
        'due_date',
    ];

    // Definisi relasi dengan model User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Menentukan apakah pembayaran sudah lunas
    public function isLunas()
    {
        return $this->remaining_amount <= 0;
    }

    // Menentukan apakah pembayaran menggunakan cicilan
    public function isInstallment()
    {
        return $this->payment_type === 'installment';
    }
}

