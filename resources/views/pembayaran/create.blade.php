@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Tambah Pembayaran</h1>
    <form action="{{ route('pembayaran.store') }}" method="POST">
        @csrf
        <div class="mb-3">
            <label for="user_id" class="form-label">User ID</label>
            <input type="text" class="form-control" id="user_id" name="user_id" required>
        </div>
        <div class="mb-3">
            <label for="total_amount" class="form-label">Total Amount</label>
            <input type="text" class="form-control" id="total_amount" name="total_amount" required>
        </div>
        <div class="mb-3">
            <label for="payment_type" class="form-label">Payment Type</label>
            <select class="form-control" id="payment_type" name="payment_type" required>
                <option value="cash">Cash</option>
                <option value="installment">Installment</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="remaining_amount" class="form-label">Remaining Amount</label>
            <input type="text" class="form-control" id="remaining_amount" name="remaining_amount">
        </div>
        <div class="mb-3">
            <label for="due_date" class="form-label">Due Date</label>
            <input type="date" class="form-control" id="due_date" name="due_date">
        </div>
        <div class="mb-3">
            <label for="siswa_id" class="form-label">Siswa ID</label>
            <input type="text" class="form-control" id="siswa_id" name="siswa_id" required>
        </div>
        <div class="mb-3">
            <label for="jumlah" class="form-label">Jumlah</label>
            <input type="text" class="form-control" id="jumlah" name="jumlah" required>
        </div>
        <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select class="form-control" id="status" name="status" required>
                <option value="pending">Pending</option>
                <option value="selesai">Selesai</option>
                <option value="batal">Batal</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
</div>
@endsection
