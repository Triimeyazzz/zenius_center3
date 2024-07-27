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
        Schema::create('data_bimbingan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_siswa')->constrained('siswa');
            $table->foreignId('id_program_bimbingan')->constrained('program_bimbingan');
            $table->enum('kelas', [
                '4SD', '5SD', '6SD', '7SMP', '8SMP', '9SMP', 
                '10SMA', '11SMA', '12SMA', 'Persiapan UTBK'
            ]);
            $table->date('mulai_bimbingan');
            $table->time('jam_bimbingan');
            $table->json('hari_bimbingan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_bimbingan');
    }
};
