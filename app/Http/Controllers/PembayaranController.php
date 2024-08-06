<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pembayaran;

class PembayaranController extends Controller
{
    public function index()
    {
        $pembayarans = Pembayaran::all();
        return view('pembayaran.index', compact('pembayarans'));
    }

    public function create()
    {
        return view('pembayaran.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required',
            'total_amount' => 'required|numeric',
            'payment_type' => 'required',
            'remaining_amount' => 'nullable|numeric',
            'due_date' => 'nullable|date',
            'siswa_id' => 'required',
            'jumlah' => 'required|numeric',
            'status' => 'required',
        ]);

        Pembayaran::create($validated);

        return redirect()->route('pembayaran.index')->with('success', 'Pembayaran berhasil ditambahkan');
    }
}

