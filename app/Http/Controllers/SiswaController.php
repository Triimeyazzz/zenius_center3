<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Models\ProgramBimbingan;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Jobs\GeneratePdfJob;
use Illuminate\Support\Facades\Cache;

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');

        $siswa = Siswa::where('nama', 'like', "%$search%")
            ->get();

        return Inertia::render('AdminSiswa/Index', [
            'siswa' => $siswa,
        ]);
    }

    public function create()
    {
        $program_bimbingan = ProgramBimbingan::all();
        return Inertia::render('AdminSiswa/Create', [
            'program_bimbingan' => $program_bimbingan
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:siswa',
            'password' => 'required|string|min:8',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'kota' => 'required|string|max:255',
            'nama_sekolah' => 'required|string|max:255',
            'alamat_sekolah' => 'required|string',
            'kurikulum' => 'required|string|max:255',
            'nama_ayah' => 'required|string|max:255',
            'nama_ibu' => 'required|string|max:255',
            'pekerjaan_ayah' => 'nullable|string|max:255',
            'no_telp_hp_ayah' => 'nullable|string|max:255',
            'no_wa_id_line_ayah' => 'nullable|string|max:255',
            'email_ayah' => 'nullable|string|email|max:255',
            'pekerjaan_ibu' => 'nullable|string|max:255',
            'no_telp_hp_ibu' => 'nullable|string|max:255',
            'no_wa_id_line_ibu' => 'nullable|string|max:255',
            'email_ibu' => 'nullable|string|email|max:255',
            'id_program_bimbingan' => 'nullable|exists:program_bimbingan,id',
            'foto' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('fotos', 'public');
        }

        Siswa::create($validated);

        return redirect()->route('adminsiswa.index')->with('success', 'Siswa berhasil ditambahkan.');
    }

    public function edit(Siswa $siswa)
    {
        $program_bimbingan = ProgramBimbingan::all();
        return Inertia::render('AdminSiswa/Edit', [
            'siswa' => $siswa,
            'program_bimbingan' => $program_bimbingan
        ]);
    }



    public function update(Request $request, Siswa $siswa)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:siswa,email,' . $siswa->id,
            'password' => 'nullable|string|min:8',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'kota' => 'required|string|max:255',
            'nama_sekolah' => 'required|string|max:255',
            'alamat_sekolah' => 'required|string',
            'kurikulum' => 'required|string|max:255',
            'nama_ayah' => 'required|string|max:255',
            'nama_ibu' => 'required|string|max:255',
            'pekerjaan_ayah' => 'nullable|string|max:255',
            'no_telp_hp_ayah' => 'nullable|string|max:255',
            'no_wa_id_line_ayah' => 'nullable|string|max:255',
            'email_ayah' => 'nullable|string|email|max:255',
            'pekerjaan_ibu' => 'nullable|string|max:255',
            'no_telp_hp_ibu' => 'nullable|string|max:255',
            'no_wa_id_line_ibu' => 'nullable|string|max:255',
            'email_ibu' => 'nullable|string|email|max:255',
            'id_program_bimbingan' => 'nullable|exists:program_bimbingan,id',
            'foto' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($validated['password']);
        }

        if ($request->hasFile('foto')) {
            // Hapus foto lama jika ada
            if ($siswa->foto) {
                \Storage::disk('public')->delete($siswa->foto);
            }
            $validated['foto'] = $request->file('foto')->store('fotos', 'public');
        }

        $siswa->update($validated);

        return redirect()->route('adminsiswa.index')->with('success', 'Siswa berhasil diperbarui.');
    }
    public function show(Siswa $siswa)
    {
        // Menyembunyikan field 'password'
        $siswa->makeHidden('password');

        return Inertia::render('AdminSiswa/Show', [
            'siswa' => $siswa,
        ]);
    }


    public function destroy($id)
    {
        $siswa = Siswa::find($id);
        if (!$siswa) {
            return response()->json(['message' => 'Siswa tidak ditemukan'], 404);
        }

        $siswa->delete();
        return response()->json(['message' => 'Siswa berhasil dihapus']);
    }

    public function exportPdf(Siswa $siswa)
    {
        // Dispatch the job to generate PDF
        GeneratePdfJob::dispatch($siswa);

        return redirect()->back()->with('status', 'PDF sedang diproses. Anda akan diberitahu saat PDF siap diunduh.');
    }

    public function getPdfUrl(Siswa $siswa)
    {
        $url = Cache::get('pdf_url_' . $siswa->id);

        if ($url) {
            return redirect($url);
        }

        return redirect()->back()->with('status', 'PDF belum siap.');
    }
    }
