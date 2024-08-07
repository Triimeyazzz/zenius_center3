<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TryOut extends Model
{
    use HasFactory;

    protected $table = 'try_out'; // Change if you used a different table name
    protected $fillable = ['id_siswa', 'mata_pelajaran', 'tanggal_pelaksanaan'];

    protected $casts = [
        'tanggal_pelaksanaan' => 'datetime',
    ];
    public function subtopics()
    {
        return $this->hasMany(Subtopic::class, 'try_out_id');
    }
}
