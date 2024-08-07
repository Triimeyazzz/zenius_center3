<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subtopic extends Model
{
    use HasFactory;

    protected $table = 'subtopics';
    protected $fillable = ['try_out_id', 'sub_mata_pelajaran', 'skor'];

    public function tryOut()
    {
        return $this->belongsTo(TryOut::class, 'try_out_id');
    }
}
