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
        Schema::create('program_bimbingan', function (Blueprint $table) {
            $table->id();
            $table->string('nama_program');
            $table->text('keuntungan')->nullable();
            $table->timestamp('tanggal_dibuat')->useCurrent(); // Add this line
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate(); // Add this line
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_bimbingan');
    }
};