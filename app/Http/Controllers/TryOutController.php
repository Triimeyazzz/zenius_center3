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

        $labels = $tryOuts->pluck('tanggal_pelaksanaan')->unique()->map(function($date) {
            return $date->format('Y-m-d');
        })->values()->toArray();

        $datasets = $tryOuts->groupBy('mata_pelajaran')->map(function($group, $mataPelajaran) use ($labels) {
            $data = array_fill(0, count($labels), 0);
            foreach ($group as $tryOut) {
                $index = array_search($tryOut->tanggal_pelaksanaan->format('Y-m-d'), $labels);
                $averageScore = $tryOut->subtopics->avg('skor');
                if ($index !== false) {
                    $data[$index] = $averageScore;
                }
            }
            return [
                'label' => $mataPelajaran,
                'data' => $group->map(function($tryOut) {
                    return [
                        'x' => $tryOut->tanggal_pelaksanaan->format('Y-m-d'),
                        'y' => $tryOut->subtopics->avg('skor'),
                        'subtopics' => $tryOut->subtopics->toArray()
                    ];
                })->values()->toArray(),
                'borderColor' => '#'.sprintf('%06X', mt_rand(0, 0xFFFFFF)),
                'backgroundColor' => 'rgba('.sprintf('%06X', mt_rand(0, 0xFFFFFF)).', 0.2)',
            ];
        })->values()->toArray();

        return Inertia::render('TryOut/Progress', [
            'siswa' => $siswa,
            'data' => [
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
        $tryOut = TryOut::create([
            'id_siswa' => $siswaId,
            'mata_pelajaran' => $request->mata_pelajaran,
            'tanggal_pelaksanaan' => $request->tanggal_pelaksanaan,
        ]);

        if ($request->has('subtopics')) {
            foreach ($request->subtopics as $subtopic) {
                Subtopic::create([
                    'try_out_id' => $tryOut->id,
                    'sub_mata_pelajaran' => $subtopic['sub_mata_pelajaran'],
                    'skor' => $subtopic['skor'],
                ]);
            }
        }

        return redirect()->route('tryout.index');
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
