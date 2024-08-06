<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataBimbingan extends Model
{
    use HasFactory;

    protected $table = 'data_bimbingan';
    
    protected $fillable = [
        'id_siswa',
        'id_program_bimbingan',
        'kelas',
        'mulai_bimbingan',
        'jam_bimbingan',
        'hari_bimbingan',
    ];

    protected $casts = [
        'hari_bimbingan' => 'array', // Automatically cast to array when retrieved from the database
    ];

    /**
     * Get the siswa that owns the data bimbingan.
     */
    public function siswa()
    {
        return $this->belongsTo(Siswa::class, 'id_siswa');
    }

    /**
     * Get the program bimbingan that owns the data bimbingan.
     */
    public function programBimbingan()
    {
        return $this->belongsTo(ProgramBimbingan::class, 'id_program_bimbingan');
    }
}
