<?php
namespace App\Http\Controllers;

use App\Models\Siswa;
use App\Models\TryOut;
use App\Models\Subtopic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TryOutController extends Controller
{
    public function index()
    {
        $siswas = Siswa::all();
        return Inertia::render('TryOut/Index', [
            'siswas' => $siswas,
        ]);
    }

    public function progress(Siswa $siswa)
{
    $tryOuts = $siswa->tryOuts()->with('subtopics')->get();

    $labels = $tryOuts->pluck('tanggal_pelaksanaan')->unique()->map(function ($date) {
        return $date->format('Y-m-d');
    })->values()->toArray();

    $datasets = $tryOuts->groupBy('mata_pelajaran')->map(function ($group, $mataPelajaran) use ($labels) {
        $data = [];
        $totalScore = 0;
        $count = 0;

        foreach ($group as $tryOut) {
            $index = array_search($tryOut->tanggal_pelaksanaan->format('Y-m-d'), $labels);
            if ($index !== false) {
                $tryOutAverageScore = $tryOut->subtopics->avg('skor');
                $data[$index] = [
                    'x' => $tryOut->tanggal_pelaksanaan->format('Y-m-d'),
                    'y' => round($tryOutAverageScore, 2),
                    'subtopics' => $tryOut->subtopics->map(function($subtopic) {
                        return [
                            'sub_mata_pelajaran' => $subtopic->sub_mata_pelajaran,
                            'skor' => $subtopic->skor,
                        ];
                    })->toArray(),
                ];
                $totalScore += $tryOutAverageScore;
                $count++;
            }
        }

        $averageScore = $count > 0 ? round($totalScore / $count, 2) : 0;

        return [
            'label' => $mataPelajaran,
            'data' => array_values($data), // Use array_values to reindex the array
            'averageScore' => $averageScore,
            'borderColor' => '#' . substr(md5($mataPelajaran), 0, 6),
            'backgroundColor' => 'rgba(' . implode(',', sscanf(substr(md5($mataPelajaran), 0, 6), "%02x%02x%02x")) . ',0.2)',
        ];
    })->values()->toArray();

    return Inertia::render('TryOut/Progress', [
        'siswa' => $siswa,
        'chartData' => [
            'labels' => $labels,
            'datasets' => $datasets,
        ],
    ]);
}


    

    
public function create(Siswa $siswa)
{
    return Inertia::render('TryOut/Create', [
        'siswa' => $siswa,
    ]);
}

public function store(Request $request, $siswaId)
{
    $request->validate([
        'mata_pelajaran' => 'required|string',
        'tanggal_pelaksanaan' => 'required|date',
        'subtopics' => 'required|array|min:1',
        'subtopics.*.sub_mata_pelajaran' => 'required|string',
        'subtopics.*.skor' => 'required|numeric|min:0|max:100',
    ]);

    $tryOut = TryOut::create([
        'id_siswa' => $siswaId,
        'mata_pelajaran' => $request->mata_pelajaran,
        'tanggal_pelaksanaan' => $request->tanggal_pelaksanaan,
    ]);

    foreach ($request->subtopics as $subtopic) {
        Subtopic::create([
            'try_out_id' => $tryOut->id,
            'sub_mata_pelajaran' => $subtopic['sub_mata_pelajaran'],
            'skor' => $subtopic['skor'],
        ]);
    }

    return redirect()->route('tryout.progress', $siswaId)->with('success', 'TryOut created successfully.');
}
    public function destroy($id)
    {
        $tryOut = TryOut::with('subtopics')->findOrFail($id);

        // Delete associated subtopics
        $tryOut->subtopics()->delete();

        // Delete the tryOut record
        $tryOut->delete();

        return redirect()->route('tryout.index')->with('success', 'TryOut deleted successfully.');
    }
}
