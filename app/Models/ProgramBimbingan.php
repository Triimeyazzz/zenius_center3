<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramBimbingan extends Model
{
    use HasFactory;

    protected $table = 'program_bimbingan';

    protected $fillable = ['nama_program', 'keuntungan'];

    // Define custom timestamp columns
    const CREATED_AT = 'tanggal_dibuat';
    const UPDATED_AT = 'updated_at';
}
