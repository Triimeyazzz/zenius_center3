<?php

namespace App\Http\Controllers;

use App\Models\Absensi;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AbsensiController extends Controller
{
    // app/Http/Controllers/AbsensiController.php

    public function index(Request $request)
    {
        $kelas = $request->query('kelas');
        $tanggal = $request->query('tanggal');

        $query = Absensi::query()->with('siswa');

        if ($kelas) {
            $query->whereHas('siswa', function ($query) use ($kelas) {
                $query->where('kelas', $kelas);
            });
        }

        if ($tanggal) {
            $query->whereDate('tanggal', $tanggal);
        }

        $absensi = $query->get();

        // Group by date
        $absensiGroupedByDate = $absensi->groupBy('tanggal');

        $classes = Siswa::select('kelas')->distinct()->pluck('kelas');

        return Inertia::render('Absensi/Index', [
            'absensiGroupedByDate' => $absensiGroupedByDate,
            'classes' => $classes,
            'selectedClass' => $kelas,
            'selectedDate' => $tanggal,
            'auth' => auth()->user(),
        ]);
    }


    public function create()
    {
        $siswa = Siswa::all();
        $classes = Siswa::distinct()->pluck('kelas');
        return Inertia::render('Absensi/Create', [
            'siswa' => $siswa,
            'classes' => $classes,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tanggal' => 'required|date',
            'absensi' => 'required|array',
            'absensi.*.siswa_id' => 'required|exists:siswa,id',
            'absensi.*.status' => 'required|in:Hadir,Tidak Hadir',
            'absensi.*.keterangan' => 'nullable|string',
        ]);

        foreach ($request->absensi as $absen) {
            Absensi::updateOrCreate(
                [
                    'siswa_id' => $absen['siswa_id'],
                    'tanggal' => $request->tanggal,
                ],
                [
                    'status' => $absen['status'],
                    'keterangan' => $absen['keterangan'] ?? null,
                ]
            );
        }

        return redirect()->route('absensi.index');
    }

    public function destroy($id)
    {
        $absensi = Absensi::findOrFail($id);
        $absensi->delete();

        return redirect()->route('absensi.index')->with('success', 'Data berhasil dihapus.');
    }
}