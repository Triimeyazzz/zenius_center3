@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Daftar Pembayaran</h1>
    <a href="{{ route('pembayaran.create') }}" class="btn btn-primary">Tambah Pembayaran</a>
    <table class="table mt-3">
        <thead>
            <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Total Amount</th>
                <th>Payment Type</th>
                <th>Remaining Amount</th>
                <th>Due Date</th>
                <th>Siswa ID</th>
                <th>Jumlah</th>
                <th>Status</th>
                <th>Aksi</th>
            </tr>
        </thead>
        <tbody>
            @foreach($pembayarans as $pembayaran)
            <tr>
                <td>{{ $pembayaran->id }}</td>
                <td>{{ $pembayaran->user_id }}</td>
                <td>{{ $pembayaran->total_amount }}</td>
                <td>{{ $pembayaran->payment_type }}</td>
                <td>{{ $pembayaran->remaining_amount }}</td>
                <td>{{ $pembayaran->due_date }}</td>
                <td>{{ $pembayaran->siswa_id }}</td>
                <td>{{ $pembayaran->jumlah }}</td>
                <td>{{ $pembayaran->status }}</td>
                <td>
                    <!-- Aksi seperti edit atau delete bisa ditambahkan di sini -->
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
