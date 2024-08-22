<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ulasan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('siswa_id')->nullable()->constrained('siswa')->onDelete('cascade');
            $table->string('nama_pemberi_ulasan')->nullable();
            $table->string('tipe_pemberi_ulasan')->comment('siswa, alumni, orang_tua, lainnya');
            $table->string('foto_profile')->nullable();
            $table->integer('penilaian');
            $table->text('komentar');
            $table->string('foto_profile_pemberi_ulasan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ulasan');
    }
};