<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Siswa;
use App\Models\ProgramBimbingan;

class DashboardController extends Controller
{
    /**
     * Display the dashboard data count.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function count()
    {
        $totalAdmins = User::count();
        $totalSiswa = Siswa::count();

        return response()->json([
            'totalAdmins' => $totalAdmins,
            'totalSiswa' => $totalSiswa,
        ]);
    }

    /**
     * Display the detailed data for admins, students, and courses.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function data()
    {
        $admins = User::take(5)->get();
        $siswa = Siswa::take(5)->get();

        return response()->json([
            'admins' => $admins,
            'siswa' => $siswa,
        ]);
    }
}
