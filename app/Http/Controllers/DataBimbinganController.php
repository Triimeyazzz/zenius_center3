<?php

namespace App\Http\Controllers;

use App\Models\DataBimbingan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Siswa;

class DataBimbinganController extends Controller
{
    public function index(Request $request)
    {
        $query = DataBimbingan::query();

        $dataBimbingan = $query->get();
        $siswa = Siswa::all();

        return Inertia::render('DataBimbingan/Index', [
            'dataBimbingan' => $dataBimbingan,
            'siswa' => $siswa,
        ]);
    }

    public function create()
    {
        $siswas = Siswa::all();

        return Inertia::render('DataBimbingan/Create', [
            'siswas' => $siswas,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_siswa' => 'required|exists:siswa,id',
            'mulai_bimbingan' => 'required|date',
            'jam_bimbingan' => 'required|date_format:H:i',
            'hari_bimbingan' => 'required|array',
            'hari_bimbingan.*' => 'in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
        ]);

        $data = $request->all();
        $data['hari_bimbingan'] = json_encode($data['hari_bimbingan']); // Encode to JSON

        DataBimbingan::create($data);

        return redirect()->route('data_bimbingan.index');
    }

    public function edit(DataBimbingan $dataBimbingan)
    {
        $siswas = Siswa::all();

        return Inertia::render('DataBimbingan/Edit', [
            'dataBimbingan' => $dataBimbingan,
            'siswas' => $siswas,
        ]);
    }

    public function update(Request $request, DataBimbingan $dataBimbingan)
    {
        $request->validate([
            'id_siswa' => 'required|exists:siswa,id',
            'mulai_bimbingan' => 'required|date',
            'jam_bimbingan' => 'required|date_format:H:i',
            'hari_bimbingan' => 'required|array',
            'hari_bimbingan.*' => 'in:Senin,Selasa,Rabu,Kamis,Jumat,Setu,Minggu',
        ]);

        $data = $request->all();
        $data['hari_bimbingan'] = json_encode($data['hari_bimbingan']); // Encode to JSON

        $dataBimbingan->update($data);

        return redirect()->route('data_bimbingan.index');
    }

    public function destroy($id)
{
    $dataBimbingan = DataBimbingan::findOrFail($id);
    $dataBimbingan->delete();

    return redirect()->route('databimbingan.index')->with('success', 'Data berhasil dihapus!');
}

}
