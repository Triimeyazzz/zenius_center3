<?php
namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\TryOut;
use App\Models\Absensi; 
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Pembayaran; // Include this model


class SiswaDashboardController extends Controller
{
    public function index()
    {
        $user = Siswa::with(['tryOuts', 'absensis', 'pembayarans'])->find(Auth::id());
        $tryOuts = $user ? $user->tryOuts : [];
        $absensi = $user ? $user->absensis : [];
        $pembayarans = $user ? $user->pembayarans : [];

        // Calculate total amount to be paid
        $totalToPay = $pembayarans->where('status', 'pending')->sum('jumlah');
        // Calculate total payments
        $totalPayments = $pembayarans->sum('jumlah');

        // Prepare payment rows
        $paymentRows = $pembayarans->map(function($payment) {
            return [
                'tanggal' => $payment->tanggal,
                'jumlah' => $payment->jumlah,
            ];
        });

        // Prepare data for charts and tables
        $labels = $tryOuts->pluck('tanggal_pelaksanaan')
                          ->map(fn($date) => date('M Y', strtotime($date)))
                          ->unique()
                          ->values();
        $data = $labels->map(function ($label) use ($tryOuts) {
            return $tryOuts->where('tanggal_pelaksanaan', 'like', "%{$label}%")->sum('skor');
        });

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

        return Inertia::render('Siswa/Dashboard', [
            'user' => $user,
            'chartLabels' => $labels,
            'chartData' => $data,
            'absensiLabels' => $absensiLabels,
            'absensiData' => $absensiData,
            'absensiDetails' => $absensiDetails,
            'totalToPay' => $totalToPay,
            'totalPayments' => $totalPayments, // Add this line
            'paymentRows' => $paymentRows, // Add this line
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
