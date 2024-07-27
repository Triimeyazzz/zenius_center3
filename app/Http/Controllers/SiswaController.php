<?php
namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class SiswaController extends Controller
{
    public function index()
    {
        $siswa = Siswa::all();
        return Inertia::render('AdminSiswa/Index', ['siswa' => $siswa]);
    }

    public function create()
    {
        return Inertia::render('AdminSiswa/Create');
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
            'foto' => 'nullable|string|max:255',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        Siswa::create($validated);
        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('fotos', 'public');
        }
        return redirect()->route('adminsiswa.index')->with('success', 'Siswa berhasil ditambahkan.');
    }

    public function edit(Siswa $siswa)
    {
        return Inertia::render('Edit', ['siswa' => $siswa]);
    }

    public function update(Request $request, Siswa $siswa)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:siswa,email,' . $siswa->id,
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
            'foto' => 'nullable|string|max:255',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $siswa->update($validated);

        return redirect()->route('adminsiswa.index')->with('success', 'Siswa berhasil diperbarui.');
    }

    public function destroy(Siswa $siswa)
    {
        $siswa->delete();
        return redirect()->route('adminsiswa.index')->with('success', 'Siswa berhasil dihapus.');
    }
}
