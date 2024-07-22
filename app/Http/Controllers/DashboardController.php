<?php
namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalAdmins = User::where('role', 'admin')->count();
        $totalPetugas = User::where('role', 'petugas')->count();
        $totalSiswa = User::where('role', 'siswa')->count();
        $totalCourses = 25; // Replace with actual data if available
    
        return Inertia::render('Dashboard', [
            'totalAdmins' => $totalAdmins,
            'totalPetugas' => $totalPetugas,
            'totalSiswa' => $totalSiswa,
            'totalCourses' => $totalCourses,
        ]);
    }
    

}
