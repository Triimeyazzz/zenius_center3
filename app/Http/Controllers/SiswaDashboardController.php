<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\TryOut;
use App\Models\Absensi;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Cicilan;

class SiswaDashboardController extends Controller
{
    public function index()
    {
        $user = Siswa::with(['absensis', 'tryOuts.subtopics'])->find(Auth::id());
        $siswa = Siswa::find(Auth::id());
        $absensi = $user ? $user->absensis : [];
        $absensiLabels = $absensi->pluck('tanggal')->unique()->values();
        $absensiData = $absensiLabels->map(function ($label) use ($absensi) {
            return $absensi->where('tanggal', $label)->count();
        });
        
        $absensiDetails = $absensi->map(function($record) {
            return [
                'tanggal' => $record->tanggal,
                'status' => $record->status,
                'keterangan' => $record->keterangan
            ];
        });

        // Try Out data
        $tryOuts = $user ? $user->tryOuts : collect([]);
        
        $tryOutLabels = $tryOuts->pluck('tanggal_pelaksanaan')->unique()->map(function ($date) {
            return $date->format('Y-m-d');
        })->values()->toArray();

        $tryOutDatasets = $tryOuts->groupBy('mata_pelajaran')->map(function ($group, $mataPelajaran) use ($tryOutLabels) {
            $data = [];
            $totalScore = 0;
            $count = 0;

            foreach ($group as $tryOut) {
                $index = array_search($tryOut->tanggal_pelaksanaan->format('Y-m-d'), $tryOutLabels);
                if ($index !== false) {
                    $tryOutAverageScore = $tryOut->subtopics->avg('skor');
                    $data[$index] = [
                        'x' => $tryOut->tanggal_pelaksanaan->format('Y-m-d'),
                        'y' => round($tryOutAverageScore, 2),
                        'subtopics' => $tryOut->subtopics->map(function($subtopic) {
                            return [
                                'sub_mata_pelajaran' => $subtopic->sub_mata_pelajaran,
                                'skor' => $subtopic->skor,
                            ];
                        })->toArray(),
                    ];
                    $totalScore += $tryOutAverageScore;
                    $count++;
                }
            }

            $averageScore = $count > 0 ? round($totalScore / $count, 2) : 0;

            return [
                'label' => $mataPelajaran,
                'data' => array_values($data),
                'averageScore' => $averageScore,
                'borderColor' => '#' . substr(md5($mataPelajaran), 0, 6),
                'backgroundColor' => 'rgba(' . implode(',', sscanf(substr(md5($mataPelajaran), 0, 6), "%02x%02x%02x")) . ',0.2)',
            ];
        })->values()->toArray();

        // Payment data
        $totalToPay = 1000000; // Replace with actual calculation
        $totalPayments = Pembayaran::where('siswa_id', $user->id)->sum('jumlah');
        $paymentRows = Pembayaran::where('siswa_id', $user->id)
            ->orderBy('created_at', 'desc') // Change 'tanggal' to 'created_at' or 'updated_at'
            ->get(['created_at as tanggal', 'jumlah']); // Rename 'created_at' to 'tanggal'

        // Get payment and cicilan data
        $pembayaran = Pembayaran::where('siswa_id', $user->id)->get(); // Initialize $pembayaran

        // Get cicilan data for the logged-in student
        $cicilan = Cicilan::where('siswa_id', $user->id)
            ->orderBy('dibayar_pada', 'desc')
            ->get();

        // Calculate total payments and cicilan payments by the student
        $totalBayar = $cicilan->sum('jumlah'); // Sum cicilan amounts

        return Inertia::render('Siswa/Dashboard', [
            'user' => $user,
            'absensiLabels' => $absensiLabels,
            'absensiData' => $absensiData,
            'absensiDetails' => $absensiDetails,
            'tryOutLabels' => $tryOutLabels,
            'tryOutDatasets' => $tryOutDatasets,
            'totalToPay' => $totalToPay,
            'totalPayments' => $totalPayments,
            'paymentRows' => $paymentRows,
            'cicilan' => $cicilan,
            'totalBayar' => $totalBayar,
        ]);
    }

    public function edit()
    {
        $siswa = Siswa::find(Auth::id()); // Retrieve the authenticated user
        return Inertia::render('Siswa/Edit', ['siswa' => $siswa]);
    }

    public function update(Request $request)
    {
        $siswa = Siswa::find(Auth::id()); // Retrieve the authenticated user

        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|email|unique:siswa,email,' . $siswa->id,
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'no_telpon' => 'nullable|string',
            'kota' => 'required|string|max:255',
            'no_wa' => 'nullable|string',
            'instagram' => 'nullable|string',
            'nama_sekolah' => 'required|string|max:255',
            'alamat_sekolah' => 'required|string',
            'kurikulum' => 'required|string|max:255',
            'nama_ayah' => 'required|string|max:255',
            'pekerjaan_ayah' => 'nullable|string|max:255',
            'no_telp_hp_ayah' => 'nullable|string|max:255',
            'no_wa_id_line_ayah' => 'nullable|string|max:255',
            'email_ayah' => 'nullable|email|max:255',
            'nama_ibu' => 'required|string|max:255',
            'pekerjaan_ibu' => 'nullable|string|max:255',
            'no_telp_hp_ibu' => 'nullable|string|max:255',
            'no_wa_id_line_ibu' => 'nullable|string|max:255',
            'email_ibu' => 'nullable|email|max:255',
            'id_program_bimbingan' => 'nullable|exists:program_bimbingan,id',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            // Delete old photo if exists
            if ($siswa->foto) {
                Storage::delete('public/' . $siswa->foto);
            }

            $path = $request->file('foto')->store('fotosiswa', 'public');
            $validatedData['foto'] = $path;
        }

        $siswa->update($validatedData);

        return redirect()->route('siswa.edit')->with('success', 'Profile updated successfully.');
    }
}
