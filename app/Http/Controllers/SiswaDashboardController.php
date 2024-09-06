<?php
namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\Pembayaran;
use App\Models\Absensi;
use App\Models\TryOut;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Subtopic;

class SiswaDashboardController extends Controller
{
    public function index(Request $request)
    {

        $user = Auth::user();
        $siswa = Siswa::findOrFail($user->id);
    
        // Fetch student information
        $siswaInfo = [
        'nama' => $siswa->nama,
        'email' => $siswa->email,
        'jenis_kelamin' => $siswa->jenis_kelamin,
        'tempat_lahir' => $siswa->tempat_lahir,
        'tanggal_lahir' => $siswa->tanggal_lahir,
        'alamat' => $siswa->alamat,
        'no_telpon' => $siswa->no_telpon,
        'kota' => $siswa->kota,
        'no_wa' => $siswa->no_wa,
        'instagram' => $siswa->instagram,
        'nama_sekolah' => $siswa->nama_sekolah,
        'alamat_sekolah' => $siswa->alamat_sekolah,
        'kurikulum' => $siswa->kurikulum,
        'nama_ayah' => $siswa->nama_ayah,
        'pekerjaan_ayah' => $siswa->pekerjaan_ayah,
        'no_telp_hp_ayah' => $siswa->no_telp_hp_ayah,
        'no_wa_id_line_ayah' => $siswa->no_wa_id_line_ayah,
        'email_ayah' => $siswa->email_ayah,
        'nama_ibu' => $siswa->nama_ibu,
        'pekerjaan_ibu' => $siswa->pekerjaan_ibu,
        'no_telp_hp_ibu' => $siswa->no_telp_hp_ibu,
        'no_wa_id_line_ibu' => $siswa->no_wa_id_line_ibu,
        'kelas' => $siswa->kelas,
        'email_ibu' => $siswa->email_ibu,
        'foto' => $siswa->foto,
        'mulai_bimbingan' => $siswa->mulai_bimbingan,
        'jam_bimbingan' => $siswa->jam_bimbingan,
        'hari_bimbingan' => $siswa->hari_bimbingan,
        ];
    
        // Fetch payment information
        $pembayaran = Pembayaran::where('siswa_id', $siswa->id)->with('cicilan')->get();
        $totalTagihan = $pembayaran->sum('jumlah');
        $totalBayar = $pembayaran->flatMap->cicilan->sum('jumlah');
        $sisaTagihan = $totalTagihan - $totalBayar;
    
        $pembayaranInfo = [
            'totalTagihan' => $totalTagihan,
            'totalBayar' => $totalBayar,
            'sisaTagihan' => $sisaTagihan,
        ];
    
        // Fetch attendance information
        $absensi = Absensi::where('siswa_id', $siswa->id)
            ->orderBy('tanggal', 'desc')
            ->take(5)
            ->get();
    
        $absensiInfo = $absensi->map(function ($item) {
            return [
                'tanggal' => $item->tanggal,
                'status' => $item->status,
                'keterangan' => $item->keterangan,
            ];
        });
    
        // Fetch monthly attendance summary
        $monthlyAttendance = Absensi::where('siswa_id', $siswa->id)
            ->selectRaw('MONTH(tanggal) as bulan, COUNT(*) as total_hadir, SUM(status = "Hadir") as total_hadir')
            ->groupBy('bulan')
            ->orderBy('bulan', 'asc')
            ->get();
    
        $attendancePerMonth = $monthlyAttendance->map(function ($item) {
            return [
                'bulan' => $item->bulan,
                'total_hadir' => $item->total_hadir,
            ];
        });
    
        // Fetch TryOut information
        $tryOuts = TryOut::where('id_siswa', $siswa->id)
            ->with('subtopics')
            ->orderBy('tanggal_pelaksanaan')
            ->take(5)
            ->get();
    
        $tryOutInfo = $tryOuts->map(function ($tryOut) {
            return [
                'mata_pelajaran' => $tryOut->mata_pelajaran,
                'tanggal_pelaksanaan' => $tryOut->tanggal_pelaksanaan,
                'average_score' => $tryOut->subtopics->avg('skor'),
            ];
        });
    
        return Inertia::render('Siswa/Dashboard', [
            'siswa' => $siswa,
            'siswaInfo' => $siswaInfo,
            'pembayaranInfo' => $pembayaranInfo,
            'absensiInfo' => $absensiInfo,
            'attendancePerMonth' => $attendancePerMonth,
            'tryOutInfo' => $tryOutInfo,
            'subtopics' => $tryOuts->pluck('mata_pelajaran'),
        ]);
    }
    public function getSubtopics($subject)
    {
        $subtopics = Subtopic::where('mata_pelajaran', $subject)->get();
        return response()->json($subtopics);
    }
    public function showAttendance(Request $request)
{

    $user = Auth::user();
    $siswa = Siswa::findOrFail($user->id);

    $absensi = Absensi::where('siswa_id', $siswa->id)
        ->orderBy('tanggal', 'desc')
        
        ->get();
    $absensiInfo = $absensi->map(function ($item) {
        return [
            'tanggal' => $item->tanggal,
            'status' => $item->status,
            'keterangan' => $item->keterangan,
        ];
    });

    return Inertia::render('Siswa/Attendance', [
        'absensiInfo' => $absensiInfo,
        'siswa' => $siswa
    ]);
}

}    