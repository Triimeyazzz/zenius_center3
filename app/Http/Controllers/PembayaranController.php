<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Cicilan;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PembayaranController extends Controller
{
    public function index()
    {
        $pembayaran = Pembayaran::with('siswa', 'cicilan')->get();
        $totalPemasukan = Cicilan::sum('jumlah');
        $totalTagihan = Pembayaran::sum('jumlah');
        $sisaTagihan = $totalTagihan - $totalPemasukan;
        $pemasukanPerBulan = Cicilan::select(
            DB::raw('YEAR(dibayar_pada) as year'),
            DB::raw('MONTH(dibayar_pada) as month'),
            DB::raw('SUM(jumlah) as total')
        )
        ->groupBy('year', 'month')
        ->orderBy('year', 'desc')
        ->orderBy('month', 'desc')
        ->get();

        return Inertia::render('Pembayaran/Index', [
            'pembayaran' => $pembayaran,
            'totalPemasukan' => $totalPemasukan,
            'totalTagihan' => $totalTagihan,
            'sisaTagihan' => $sisaTagihan,
            'pemasukanPerBulan' => $pemasukanPerBulan
        ]);
    }
    public function create()
    {
        $siswa = Siswa::all();
        return Inertia::render('Pembayaran/Create', ['siswa' => $siswa]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'siswa_id' => 'required|exists:siswa,id',
            'jumlah' => 'required|numeric|min:0',
        ]);

        $pembayaran = Pembayaran::create($validated + ['status' => 'pending']);

        return redirect()->route('pembayaran.index')->with('success', 'Pembayaran berhasil dibuat');
    }
    public function bayarCicilan(Request $request, Pembayaran $pembayaran)
    {
        $validated = $request->validate([
            'jumlah' => 'required|numeric|min:0',
        ]);

        $cicilan = new Cicilan([
            'jumlah' => $validated['jumlah'],
            'dibayar_pada' => now(),
            'siswa_id' => $pembayaran->siswa_id,
        ]);

        $pembayaran->cicilan()->save($cicilan);

        $totalBayar = $pembayaran->cicilan()->sum('jumlah');
        if ($totalBayar >= $pembayaran->jumlah) {
            $pembayaran->update(['status' => 'selesai']);
        }

        return redirect()->route('pembayaran.index');
    }

    public function show(Pembayaran $pembayaran)
    {
        $pembayaran->load('siswa', 'cicilan');
        $totalBayar = $pembayaran->cicilan()->sum('jumlah');
        $sisaBayar = max(0, $pembayaran->jumlah - $totalBayar);

        return Inertia::render('Pembayaran/Show', [
            'pembayaran' => $pembayaran,
            'totalBayar' => $totalBayar,
            'sisaBayar' => $sisaBayar,
        ]);
    }
    public function financialSummary()
{
    $totalPemasukan = Cicilan::sum('jumlah');
    $pemasukanPerBulan = Cicilan::select(
        DB::raw('YEAR(dibayar_pada) as year'),
        DB::raw('MONTH(dibayar_pada) as month'),
        DB::raw('SUM(jumlah) as total')
    )
    ->groupBy('year', 'month')
    ->orderBy('year', 'desc')
    ->orderBy('month', 'desc')
    ->get();

    $totalTagihan = Pembayaran::sum('jumlah');
    $sisaTagihan = $totalTagihan - $totalPemasukan;

    return Inertia::render('Pembayaran/FinancialSummary', [
        'totalPemasukan' => $totalPemasukan,
        'pemasukanPerBulan' => $pemasukanPerBulan,
        'totalTagihan' => $totalTagihan,
        'sisaTagihan' => $sisaTagihan
    ]);
}
public function destroyCicilan($id)
{
    $cicilan = Cicilan::findOrFail($id);
    $cicilan->delete();

    return response()->json(['success' => true]);
}

}