<?php
namespace App\Http\Controllers;

use App\Models\Pelajaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PelajaranController extends Controller
{
    public function index()
    {
        $pelajarans = Pelajaran::all();
        return Inertia::render('Pelajaran/Index', [
            'pelajarans' => $pelajarans,
        ]);
    }

    public function create()
    {
        return Inertia::render('Pelajaran/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'kursus_id' => 'required|exists:kursus,id',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'url_video' => 'nullable|file|mimes:mp4,avi,mkv|max:102400', // Adjust MIME types and size as needed
        ]);

        $data = $request->except('url_video');

        if ($request->hasFile('url_video')) {
            $data['url_video'] = $request->file('url_video')->store('videos', 'public');
        }

        Pelajaran::create($data);

        return redirect()->route('pelajaran.index');
    }

    public function edit(Pelajaran $pelajaran)
    {
        return Inertia::render('Pelajaran/Edit', [
            'pelajaran' => $pelajaran,
        ]);
    }

    public function update(Request $request, Pelajaran $pelajaran)
    {
        $request->validate([
            'kursus_id' => 'required|exists:kursus,id',
            'judul' => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'url_video' => 'nullable|file|mimes:mp4,avi,mkv|max:102400', // Adjust MIME types and size as needed
        ]);

        $data = $request->except('url_video');

        if ($request->hasFile('url_video')) {
            // Delete old video file if exists
            if ($pelajaran->url_video) {
                Storage::disk('public')->delete($pelajaran->url_video);
            }
            $data['url_video'] = $request->file('url_video')->store('videos', 'public');
        }

        $pelajaran->update($data);

        return redirect()->route('pelajaran.index');
    }
    public function destroy(Pelajaran $pelajaran)
    {
        $pelajaran->delete();
        return redirect()->route('pelajaran.index');
    }
}
