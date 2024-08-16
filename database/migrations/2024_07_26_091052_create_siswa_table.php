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
        Schema::create('siswa', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email')->unique();
            $table->string('password'); 
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->text('alamat');
            $table->string('no_telpon')->nullable();
            $table->string('kota');
            $table->string('no_wa')->nullable();
            $table->string('instagram')->nullable();
            $table->string('nama_sekolah');
            $table->text('alamat_sekolah');
            $table->string('kurikulum');
            $table->string('nama_ayah');
            $table->string('pekerjaan_ayah')->nullable();
            $table->string('no_telp_hp_ayah')->nullable();
            $table->string('no_wa_id_line_ayah')->nullable();
            $table->string('email_ayah')->nullable();
            $table->string('nama_ibu');
            $table->string('pekerjaan_ibu')->nullable();
            $table->string('no_telp_hp_ibu')->nullable();
            $table->string('no_wa_id_line_ibu')->nullable();
            $table->string('email_ibu')->nullable();
            $table->foreignId('id_program_bimbingan')->constrained('program_bimbingan')->nullable();
            $table->string('foto')->nullable(); // Kolom foto untuk menyimpan nama file foto siswa
            $table->string('user_id')->nullable(); // Add user_id column
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Add foreign key constraint
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('siswa');
    }
};
