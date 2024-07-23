<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pelajaran extends Model
{
    use HasFactory;

    protected $fillable = [
        'kursus_id',
        'judul',
        'deskripsi',
        'url_video',
    ];
    protected $table = 'pelajaran';


    public function kursus()
    {
        return $this->belongsTo(Kursus::class);
    }
}
