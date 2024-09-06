<?php

namespace App\Http\Controllers;

use App\Mail\JatuhTempoMail;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class KirimEmailController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        $siswa = Pembayaran::with('siswa')->where('tgl_jatuh_tempo', date('Y-m-d'))->where('status','pending')->get();
        foreach ($siswa as $s) {
            $data = [
                'jumlah' => $s->jumlah,
                'tgl_jatuh_tempo' => $s->tgl_jatuh_tempo,
                'nama' => $s->siswa->nama,
            ];
            Mail::to($s->siswa->email_ayah)->send(new JatuhTempoMail($data));
            Mail::to($s->siswa->email_ibu)->send(new JatuhTempoMail($data));
        }
    }
}
