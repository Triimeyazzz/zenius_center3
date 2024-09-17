<?php
namespace App\Http\Controllers;

use App\Models\Ulasan;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Ambil data ulasan dengan relasi siswa
        $ulasan = Ulasan::with('siswa')->latest()->get();

        // Kirim data ulasan ke HomeComponent
        return Inertia::render('Home/HomeComponent', [
            'ulasan' => $ulasan, // Tambahkan data ulasan ke dalam array ini
        ]);
    }
}
