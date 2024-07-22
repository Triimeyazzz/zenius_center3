<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    public function index()
    {
        $pembayaran = Pembayaran::where('users_id', auth()->id())->get();
        return view('pembayaran.index', compact('pembayaran'));
    }

    public function create()
    {
        return view('pembayaran.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'jumlah' => 'required|numeric|min:0.01',
        ]);

        $pembayaran = new Pembayaran();
        $pembayaran->users_id = auth()->id();
        $pembayaran->jumlah = $request->jumlah;
        $pembayaran->status = 'pending';
        $pembayaran->save();

        return redirect()->route('pembayaran.index')->with('success', 'Pembayaran berhasil!');
    }
}
