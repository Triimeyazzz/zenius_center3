<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class SiswaController extends Controller
{
    // Display a listing of the students
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

        return Inertia::render('AdminSiswa/Index', [
            'siswa' => $siswa,
            'total_siswa' => $siswa->count(),
        ]);
    }

    // Show the form for creating a new student
    public function create()
    {
        return Inertia::render('AdminSiswa/Create');
    }

    // Store a newly created student in storage
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
            'pekerjaan_ayah' => 'nullable|string',
            'no_telp_hp_ayah' => 'nullable|string',
            'no_wa_id_line_ayah' => 'nullable|string',
            'email_ayah' => 'nullable|email',
            'nama_ibu' => 'required|string',
            'pekerjaan_ibu' => 'nullable|string',
            'no_telp_hp_ibu' => 'nullable|string',
            'no_wa_id_line_ibu' => 'nullable|string',
            'email_ibu' => 'nullable|email',
            'foto' => 'nullable|image|max:2048',
            'kelas' => 'nullable|string',
            'mulai_bimbingan' => 'required|date',
        'jam_bimbingan' => 'required',
        'hari_bimbingan' => 'required|array',
    ]);

    // Create a new Siswa instance
    $siswa = new Siswa();
    $siswa->fill($request->except('foto', 'password', 'hari_bimbingan'));

    // Hash the password
    $siswa->password = Hash::make($request->input('password'));

    // Handle file upload
    if ($request->hasFile('foto')) {
        $file = $request->file('foto');
        $filename = time() . '.' . $file->getClientOriginalExtension();
        $file->storeAs('public/fotos', $filename);
        $siswa->foto = $filename;
    }

    // Save the Siswa model
    $siswa->save();

    // Save the hari_bimbingan as JSON
    $siswa->hari_bimbingan = json_encode($request->input('hari_bimbingan'));
    $siswa->save();

    return redirect()->route('adminsiswa.index')->with('success', 'Data berhasil disimpan!');
}

    // Show the form for editing the specified student
    public function edit($id)
{
    $siswa = Siswa::findOrFail($id);
    return Inertia::render('AdminSiswa/Edit', [
        'siswa' => $siswa
    ]);
}

// Update the specified student in storage
public function update(Request $request, Siswa $siswa)
{
    $validated = $request->validate([
        'nama' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:siswa,email,' . $siswa->id,
        'kelas' => 'required|string',
        'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
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
        'mulai_bimbingan' => 'required|date',
        'jam_bimbingan' => 'required|date_format:H:i',
        'hari_bimbingan' => 'required|array'
    ]);

    if ($request->hasFile('foto')) {
        $fileName = $request->file('foto')->store('siswa_foto', 'public');
        $validated['foto'] = $fileName;
    }

    // Save hari_bimbingan as JSON
    $validated['hari_bimbingan'] = json_encode($validated['hari_bimbingan']);

    $siswa->update($validated);

    return redirect()->route('adminsiswa.index')->with('success', 'Siswa berhasil diperbarui.');
}


    // Display the specified student
    public function show(Siswa $siswa)
    {
        return Inertia::render('AdminSiswa/Show', [
            'siswa' => $siswa,
        ]);
    }

    // Remove the specified student from storage
    public function destroy(Siswa $siswa)
    {
        $siswa->delete();
        return redirect()->route('adminsiswa.index')->with('success', 'Siswa berhasil dihapus.');
    }
}
