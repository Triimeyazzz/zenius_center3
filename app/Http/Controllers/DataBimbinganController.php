<?php

namespace App\Http\Controllers;

use App\Models\DataBimbingan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Siswa;
use App\Models\ProgramBimbingan;

class DataBimbinganController extends Controller
{
    public function index(Request $request)
{
    $query = DataBimbingan::query();

    // Check if a kelas filter is present and valid
    if ($request->has('kelas') && !empty($request->input('kelas'))) {
        $kelas = $request->input('kelas');
        // Ensure the kelas value is valid according to ENUM values
        $validKelasValues = ['4SD', '5SD', '6SD', '7SMP', '8SMP', '9SMP', '10SMA', '11SMA', '12SMA', 'Persiapan UTBK'];
        if (in_array($kelas, $validKelasValues)) {
            $query->where('kelas', $kelas);
        }
    }

    $dataBimbingan = $query->get();
    $siswas = Siswa::all();
    $programBimbingans = ProgramBimbingan::all();
    
    return Inertia::render('DataBimbingan/Index', [
        'dataBimbingan' => $dataBimbingan,
        'siswas' => $siswas,
        'programBimbingans' => $programBimbingans,
    ]);
}


    public function create()
    {
        $siswas = Siswa::all();
        $programBimbingans = ProgramBimbingan::all();

        return Inertia::render('DataBimbingan/Create', [
            'siswas' => $siswas,
            'programBimbingans' => $programBimbingans,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_siswa' => 'required|exists:siswa,id',
            'id_program_bimbingan' => 'required|exists:program_bimbingan,id',
            'kelas' => 'required|in:4SD,5SD,6SD,7SMP,8SMP,9SMP,10SMA,11SMA,12SMA,Persiapan UTBK',
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
        $programBimbingans = ProgramBimbingan::all();

        return Inertia::render('DataBimbingan/Edit', [
            'dataBimbingan' => $dataBimbingan,
            'siswas' => $siswas,
            'programBimbingans' => $programBimbingans,
        ]);
    }

    public function update(Request $request, DataBimbingan $dataBimbingan)
    {
        $request->validate([
            'id_siswa' => 'required|exists:siswa,id',
            'id_program_bimbingan' => 'required|exists:program_bimbingan,id',
            'kelas' => 'required|in:4SD,5SD,6SD,7SMP,8SMP,9SMP,10SMA,11SMA,12SMA,Persiapan UTBK',
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

    public function destroy(DataBimbingan $dataBimbingan)
    {
        $dataBimbingan->delete();
        return redirect()->route('data_bimbingan.index');
    }
}
