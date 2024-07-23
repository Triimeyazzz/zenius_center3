<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendaftaran extends Model
{
    use HasFactory;

    protected $table = 'pendaftaran';

    protected $fillable = [
        'users_id',
        'kursus_id',
        'terdaftar_pada',
        'selesai_pada',
    ];

    // Define relationships if needed
    public function user()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function kursus()
    {
        return $this->belongsTo(Kursus::class, 'kursus_id');
    }
}
