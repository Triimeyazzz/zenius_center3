<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pembayarans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->decimal('total_amount', 10, 2);
            $table->enum('payment_type', ['cash', 'installment']);
            $table->decimal('remaining_amount', 10, 2)->nullable();
            $table->date('due_date')->nullable();
            $table->unsignedBigInteger('siswa_id');
            $table->decimal('jumlah', 8, 2);
            $table->enum('status', ['pending', 'selesai', 'batal']);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('siswa_id')->references('id')->on('siswa')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pembayarans', function (Blueprint $table) {
            $table->dropForeign(['siswa_id']);
            $table->dropForeign(['user_id']);
        });

        Schema::dropIfExists('pembayarans');
    }
};
