<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\ProgramBimbingan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

// Mengedit data siswa

class SiswaController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $kelas = $request->input('kelas', '');

        $siswaQuery = Siswa::query();

        if ($search) {
            $siswaQuery->where('nama', 'like', "%{$search}%");
            
        }

        if ($kelas) {
            $siswaQuery->where('kelas', $kelas);
        }

        $siswa = $siswaQuery->get();
        $programBimbingan = ProgramBimbingan::all();

        return Inertia::render('AdminSiswa/Index', [
            'siswa' => $siswa,
            'program_bimbingan' => $programBimbingan,
            'total_siswa' => $siswa->count(),
        ]);        
    }

    // Menampilkan halaman untuk menambahkan siswa baru
    public function create()
    {
        $program_bimbingan = ProgramBimbingan::all();
        return Inertia::render('AdminSiswa/Create', [
            'program_bimbingan' => $program_bimbingan
        ]);
    }

    // Menyimpan data siswa baru
    // Menyimpan data siswa baru
public function store(Request $request)
{
    // Validate the request
    $request->validate([
        'nama' => 'required|string|max:255',
        'email' => 'required|email|unique:siswa,email',
        'password' => 'required|string|min:8',
        'jenis_kelamin' => 'required|string',
        'tempat_lahir' => 'required|string',
        'tanggal_lahir' => 'required|date',
        'alamat' => 'required|string',
        'kota' => 'required|string',
        'no_telpon' => 'nullable|string',
        'no_wa' => 'nullable|string',
        'instagram' => 'nullable|string',
        'nama_sekolah' => 'required|string',
        'alamat_sekolah' => 'required|string',
        'kurikulum' => 'required|string',
        'nama_ayah' => 'required|string',
        'pekerjaan_ayah' => 'required|string',
        'no_telp_hp_ayah' => 'required|string',
        'no_wa_id_line_ayah' => 'nullable|string',
        'email_ayah' => 'nullable|email',
        'nama_ibu' => 'required|string',
        'pekerjaan_ibu' => 'required|string',
        'no_telp_hp_ibu' => 'required|string',
        'no_wa_id_line_ibu' => 'nullable|string',
        'email_ibu' => 'nullable|email',
        'id_program_bimbingan' => 'required|exists:program_bimbingan,id',
        'foto' => 'nullable|image|max:2048',
        'kelas' => 'nullable|string'
    ]);

    // Create a new Siswa instance
    $siswa = new Siswa();
    $siswa->fill($request->except('foto', 'password'));

    // Hash the password
    $siswa->password = Hash::make($request->input('password'));

    // Handle file upload
    if ($request->hasFile('foto')) {
        $file = $request->file('foto');
        $filename = time() . '.' . $file->getClientOriginalExtension();
        // Store the file in the public storage
        $file->storeAs('public/fotos', $filename);
        // Save the file path in the database
        $siswa->foto = $filename;
    }

    // Save the Siswa model
    $siswa->save();

    // Redirect back with success message
    return redirect()->route('adminsiswa.index')->with('success', 'Data berhasil disimpan!');
}

    // Menampilkan halaman untuk mengedit siswa
    public function edit(Siswa $siswa)
    {
        $program_bimbingan = ProgramBimbingan::all();
        return Inertia::render('AdminSiswa/Edit', [
            'siswa' => $siswa,
            'program_bimbingan' => $program_bimbingan
        ]);
    }

    // Memperbarui data siswa yang ada
    public function update(Request $request, Siswa $siswa)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:siswa,email,' . $siswa->id,
            'kelas' => 'required|string',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'id_program_bimbingan' => 'nullable|exists:program_bimbingan,id',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'no_telpon' => 'nullable|string|max:20',
            'kota' => 'required|string|max:255',
            'no_wa' => 'nullable|string|max:20',
            'instagram' => 'nullable|string|max:255',
            'nama_sekolah' => 'required|string|max:255',
            'alamat_sekolah' => 'required|string',
            'kurikulum' => 'required|string|max:255',
            'nama_ayah' => 'required|string|max:255',
            'pekerjaan_ayah' => 'nullable|string|max:255',
            'no_telp_hp_ayah' => 'nullable|string|max:20',
            'no_wa_id_line_ayah' => 'nullable|string|max:20',
            'email_ayah' => 'nullable|string|email|max:255',
            'nama_ibu' => 'required|string|max:255',
            'pekerjaan_ibu' => 'nullable|string|max:255',
            'no_telp_hp_ibu' => 'nullable|string|max:20',
            'no_wa_id_line_ibu' => 'nullable|string|max:20',
            'email_ibu' => 'nullable|string|email|max:255',
        ]);
    
        if ($request->hasFile('foto')) {
            $fileName = $request->file('foto')->store('siswa_foto', 'public');
            $validated['foto'] = $fileName;
        }
    
        $siswa->update($validated);
    
        return redirect()->route('adminsiswa.index')->with('success', 'Siswa berhasil diperbarui.');
    }
    
    public function show(Siswa $siswa)
    {
        return Inertia::render('AdminSiswa/Show', [
            'siswa' => $siswa
        ]);
    }
    // Menghapu siswa
    public function destroy(Siswa $siswa)
    {
        $siswa->delete();
        return redirect()->route('adminsiswa.index')->with('success', 'Siswa berhasil dihapus.');
    }
}
