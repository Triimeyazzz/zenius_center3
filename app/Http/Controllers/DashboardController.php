<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Siswa;
use App\Models\ProgramBimbingan;
use App\Models\Pembayaran;
use App\Models\Cicilan;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
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
    public function index()
{
    $pembayaran = Pembayaran::with('siswa', 'cicilan')->get();
    $totalPemasukan = Cicilan::sum('jumlah');
    $totalTagihan = Pembayaran::sum('jumlah');
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

    return Inertia::render('Pembayaran/Index', [
        'pembayaran' => $pembayaran,
        'totalPemasukan' => $totalPemasukan,
        'totalTagihan' => $totalTagihan,
        'sisaTagihan' => $sisaTagihan,
        'pemasukanPerBulan' => $pemasukanPerBulan
    ]);
}


}
