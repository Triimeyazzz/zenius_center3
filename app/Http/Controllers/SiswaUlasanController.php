<?php

namespace App\Http\Controllers;

use App\Models\Ulasan;
use Illuminate\Http\Request;
use Inertia\Inertia;


class SiswaUlasanController extends Controller
{
    public function index()
    {
        $ulasan = Ulasan::where('siswa_id', auth()->user()->id)->latest()->get();
        return Inertia::render('Siswa/Ulasan/Index', ['ulasan' => $ulasan]);
    }

    public function create()
    {
        return Inertia::render('Siswa/Ulasan/Create');
    }

    public function store(Request $request)
{
    $request->validate([
        'penilaian' => 'required|integer|min:1|max:5',
        'komentar' => 'required|string',
    ]);

    $siswa = auth()->user();
    $ulasan = new Ulasan($request->all());
    $ulasan->siswa_id = $siswa->id;
    $ulasan->nama_pemberi_ulasan = $siswa->nama;
    $ulasan->foto_profile_pemberi_ulasan = $siswa->foto;
    $ulasan->tipe_pemberi_ulasan = 'siswa';
    $ulasan->save();

    return redirect()->route('siswa.ulasan.index')->with('success', 'Ulasan berhasil ditambahkan');
}

    public function edit(Ulasan $ulasan)
    {
        if ($ulasan->siswa_id !== auth()->user()->id) {
            abort(403);
        }
        return Inertia::render('Siswa/Ulasan/Edit', ['ulasan' => $ulasan]);
    }

    public function update(Request $request, Ulasan $ulasan)
    {
        if ($ulasan->siswa_id !== auth()->user()->id) {
            abort(403);
        }

        $request->validate([
            'penilaian' => 'required|integer|min:1|max:5',
            'komentar' => 'required|string',
        ]);

        $ulasan->fill($request->only(['penilaian', 'komentar']));
        $ulasan->save();

        return redirect()->route('siswa.ulasan.index')->with('success', 'Ulasan berhasil diperbarui');
    }

    public function destroy(Ulasan $ulasan)
    {
        if ($ulasan->siswa_id !== auth()->user()->id) {
            abort(403);
        }
        $ulasan->delete();
        return redirect()->route('siswa.ulasan.index')->with('success', 'Ulasan berhasil dihapus');
    }
}