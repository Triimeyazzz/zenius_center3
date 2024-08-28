<?php

namespace App\Http\Controllers;

use App\Models\Ulasan;
use Illuminate\Http\Request;
use Inertia\Inertia;


class AdminUlasanController extends Controller
{
    public function index()
    {
        $ulasan = Ulasan::with('siswa')->latest()->get();
        return Inertia::render('Ulasan/Index', ['ulasan' => $ulasan]);
    }

    public function create()
    {
        return Inertia::render('Ulasan/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_pemberi_ulasan' => 'required|string',
            'tipe_pemberi_ulasan' => 'required|in:alumni,orang_tua,lainnya',
            'foto_profile' => 'nullable|image|max:2048',
            'penilaian' => 'required|integer|min:1|max:5',
            'komentar' => 'required|string',
        ]);

        $ulasan = new Ulasan($request->all());

        if ($request->hasFile('foto_profile')) {
            $ulasan->foto_profile = $request->file('foto_profile')->store('profile_pictures', 'public');
        }

        $ulasan->save();

        return redirect()->route('ulasan.index')->with('success', 'Ulasan berhasil ditambahkan');
    }

    

    public function destroy(Ulasan $ulasan)
    {
        $ulasan->delete();
        return redirect()->route('ulasan.index')->with('success', 'Ulasan berhasil dihapus');
    }
}