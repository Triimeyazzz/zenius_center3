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
        'kelas',
        'email_ibu',
        'foto',
        'user_id',
        'mulai_bimbingan', // Add this line
        'jam_bimbingan', // Add this line
        'hari_bimbingan', // Add this line
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'hari_bimbingan' => 'array', // Automatically cast to array when retrieved from the database
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tryOuts()
    {
        return $this->hasMany(TryOut::class, 'id_siswa');
    }

    public function absensis()
    {
        return $this->hasMany(Absensi::class, 'siswa_id');
    }

    public function pembayarans()
    {
        return $this->hasMany(Pembayaran::class, 'siswa_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($siswa) {
            $siswa->tryOuts()->delete();
            $siswa->absensis()->delete();
        });
    }

    public function sentMessages()
    {
        return $this->morphMany(Message::class, 'sender');
    }

    public function receivedMessages()
    {
        return $this->morphMany(Message::class, 'receiver');
    }

    public function getFormattedIdAttribute()
{
    return $this->id; // or simply remove this method if it's no longer needed
}

}
