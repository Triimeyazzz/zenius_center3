<?php
namespace App\Models;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable as AuthenticatableTrait;

class Siswa extends Model implements Authenticatable
{
    use HasFactory, AuthenticatableTrait;

    protected $table = 'siswa';

    protected $fillable = [
        'nama',
        'email',
        'password',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'alamat',
        'no_telpon',
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
        'foto',
        'kelas' // Add this line
    ];
    
    protected $hidden = [
        'password',
    ];
    

    // Relasi Siswa ke TryOut
    // app/Models/Siswa.php
    public function tryOuts()
    {
    return $this->hasMany(TryOut::class, 'id_siswa'); // Adjust the foreign key if necessary
    }

    public function absensis()
    {
        return $this->hasMany(Absensi::class, 'siswa_id'); // Adjust the foreign key if necessary
    }
    
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($siswa) {
            $siswa->tryOuts()->delete();
            $siswa->absensis()->delete();
        });
    }
}
