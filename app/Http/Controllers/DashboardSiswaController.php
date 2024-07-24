<?php
namespace App\Http\Controllers;

use App\Models\Kursus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalKursus = Kursus::count();
        return Inertia::render('/Siswa.Dashboard', [
            'totalKursus' => $totalKursus,
            // Tambahkan data lainnya yang diperlukan
        ]);
    }
}
