<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Siswa;
use App\Models\Pembayaran;
use App\Models\Cicilan;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Message;
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

    // Make sure the sums are calculated correctly
    $totalPemasukan = Cicilan::sum('jumlah') ?? 0; // Default to 0 if null
    $totalTagihan = Pembayaran::sum('jumlah') ?? 0; // Default to 0 if null
    $sisaTagihan = $totalTagihan - $totalPemasukan;

    $pemasukanPerBulan = Cicilan::select(
        DB::raw('YEAR(dibayar_pada) as year'),
        DB::raw('MONTH(dibayar_pada) as month'),
        DB::raw('SUM(jumlah) as total')
    )
    ->groupBy('year', 'month')
    ->orderBy('year', 'desc')
    ->orderBy('month', 'desc')
    ->get();

    return response()->json([
        'totalAdmins' => $totalAdmins,
        'totalSiswa' => $totalSiswa,
        'totalPemasukan' => $totalPemasukan,
        'totalTagihan' => $totalTagihan,
        'sisaTagihan' => $sisaTagihan,
        'pemasukanPerBulan' => $pemasukanPerBulan
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
        $siswa = Siswa::take(8)->get();

        return response()->json([
            'admins' => $admins,
            'siswa' => $siswa,
        ]);
    }

    
}
