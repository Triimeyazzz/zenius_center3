<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pembayaran;

class PembayaranController extends Controller
{
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'total_amount' => 'required|numeric|min:0',
            'payment_type' => 'required|in:cash,installment',
            'remaining_amount' => 'nullable|numeric|min:0',
            'due_date' => 'nullable|date',
        ]);

        // Handle cash payment
        if ($validatedData['payment_type'] === 'cash') {
            $validatedData['remaining_amount'] = 0;
            $validatedData['due_date'] = null;
        }

        $pembayaran = Pembayaran::create($validatedData);

        return response()->json($pembayaran, 201);
    }

    public function index()
    {
        $pembayarans = Pembayaran::all();
        return response()->json($pembayarans);
    }

    public function show($id)
    {
        $pembayaran = Pembayaran::findOrFail($id);
        return response()->json($pembayaran);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'total_amount' => 'nullable|numeric|min:0',
            'payment_type' => 'nullable|in:cash,installment',
            'remaining_amount' => 'nullable|numeric|min:0',
            'due_date' => 'nullable|date',
        ]);

        $pembayaran = Pembayaran::findOrFail($id);

        // Handle cash payment update
        if (isset($validatedData['payment_type']) && $validatedData['payment_type'] === 'cash') {
            $validatedData['remaining_amount'] = 0;
            $validatedData['due_date'] = null;
        }

        $pembayaran->update($validatedData);

        return response()->json($pembayaran);
    }

    public function destroy($id)
    {
        $pembayaran = Pembayaran::findOrFail($id);
        $pembayaran->delete();

        return response()->json(null, 204);
    }
}
