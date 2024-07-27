<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Siswa extends Model
{
    use HasFactory;

    protected $table = 'siswa';

    protected $fillable = [ 
        'id',
        'nama',
        'email',
        'password',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'alamat',
        'no_hp',
        'kota',
        'no_wa',
        'instagram',
        'nama_sekolah',
        'alamat_sekolah',
        'kurikulum',
        'nama_ayah',
        'pekerjaan_ayah',
        'no_telp_hp_ayah',
        'no_wa_id_line_ayah',
        'email_ayah',
        'nama_ibu',
        'pekerjaan_ibu',
        'no_telp_hp_ibu',
        'no_wa_id_line_ibu',
        'email_ibu',
        'id_program_bimbingan',
        'foto'
    ];
}
