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
        Schema::table('siswa', function (Blueprint $table) {
            $table->enum('kelas', [
                'Kelas 4 SD',
                'Kelas 5 SD',
                'Kelas 6 SD',
                'Kelas 7 SMP',
                'Kelas 8 SMP',
                'Kelas 9 SMP',
                'Kelas 10 SMA',
                'Kelas 11 SMA',
                'Kelas 12 SMA',
                'Alumni SMA'
            ])->after('no_wa_id_line_ibu')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('siswa', function (Blueprint $table) {
            $table->dropColumn('kelas');
        });
    }
};
