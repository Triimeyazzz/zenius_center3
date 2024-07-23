<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kursus extends Model
{
    protected $table = 'kursus'; // Nama tabel yang sesuai di database
    protected $fillable = ['judul', 'deskripsi', 'gambar'];
}
