<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TryOut extends Model
{
    use HasFactory;

    protected $table = 'try_out';

    protected $fillable = [
        'id_siswa',
        'mata_pelajaran',
        'skor',
        'tanggal_pelaksanaan',
    ];

    // Define the relationship with the Siswa model
    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'id_siswa');
    }
}
