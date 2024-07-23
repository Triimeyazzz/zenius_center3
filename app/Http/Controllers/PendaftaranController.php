<?php
namespace App\Http\Controllers;

use App\Models\Pendaftaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class PendaftaranController extends Controller
{
    public function index()
    {
        $pendaftarans = Pendaftaran::with('user', 'kursus')->get();
        return Inertia::render('Pendaftaran/Index', [
            'pendaftarans' => $pendaftarans,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pendaftaran/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'users_id' => 'required|exists:users,id',
            'kursus_id' => 'required|exists:kursus,id',
            'terdaftar_pada' => 'required|date',
            'selesai_pada' => 'nullable|date',
        ]);

        Pendaftaran::create($request->all());

        return Redirect::route('pendaftaran.index');
    }

    public function edit(Pendaftaran $pendaftaran)
    {
        return Inertia::render('Pendaftaran/Edit', [
            'pendaftaran' => $pendaftaran,
        ]);
    }

    public function update(Request $request, Pendaftaran $pendaftaran)
    {
        $request->validate([
            'users_id' => 'required|exists:users,id',
            'kursus_id' => 'required|exists:kursus,id',
            'terdaftar_pada' => 'required|date',
            'selesai_pada' => 'nullable|date',
        ]);

        $pendaftaran->update($request->all());

        return Redirect::route('pendaftaran.index');
    }

    public function destroy(Pendaftaran $pendaftaran)
    {
        $pendaftaran->delete();

        return Redirect::route('pendaftaran.index');
    }
}
