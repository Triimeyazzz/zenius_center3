<?php
namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\TryOut;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TryOutController extends Controller
{
    public function index()
    {
        $siswas = Siswa::all();
        return Inertia::render('TryOut/Index', ['siswas' => $siswas]);
    }

    public function show(Siswa $siswa)
    {
        $tryOuts = TryOut::where('id_siswa', $siswa->id)->get();
        return Inertia::render('TryOut/Show', [
            'siswa' => $siswa,
            'tryOuts' => $tryOuts,
        ]);
    }

    public function store(Request $request)
{
    $request->validate([
        'id_siswa' => 'required|exists:siswa,id',
        'mata_pelajaran' => 'required|string|max:255',
        'skor' => 'required|integer|min:0|max:100',
        'tanggal_pelaksanaan' => 'required|date',
    ]);

    TryOut::create($request->all());

    return redirect()->back()->with('success', 'Data try out berhasil ditambahkan.');
}

public function destroy($id)
{
    $tryOut = TryOut::findOrFail($id);
    $tryOut->delete();

    return redirect()->back()->with('success', 'Data try out berhasil dihapus.');
}

}
