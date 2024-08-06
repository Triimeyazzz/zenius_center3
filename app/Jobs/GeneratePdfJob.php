<?php

namespace App\Jobs;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class GeneratePdfJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $siswa;

    public function __construct($siswa)
    {
        $this->siswa = $siswa;
    }

    public function handle()
    {
        $pdf = Pdf::loadView('pdf.siswa', ['siswa' => $this->siswa]);
        $fileName = 'siswa_' . $this->siswa->id . '.pdf';
        $filePath = 'c/pdfsiswa/' . $fileName;

        // Simpan file PDF di direktori yang diinginkan
        $result = Storage::put($filePath, $pdf->output());

        if ($result) {
            // Menyimpan URL file di cache
            $url = asset('storage/' . $filePath);
            cache()->put('pdf_url_' . $this->siswa->id, $url);
        } else {
            // Tangani kegagalan penyimpanan file
            throw new \Exception('Failed to store PDF file.');
        }
    }
}
