<?php
namespace App\Http\Controllers;

use App\Models\Ulasan;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
{
    // Fetch ulasan data from the database
    $ulasanData = Ulasan::with('siswa')->latest()->take(5)->get();

    return Inertia::render('Home/HomeComponent', [
        'ulasanData' => $ulasanData,
    ]);
}

}
