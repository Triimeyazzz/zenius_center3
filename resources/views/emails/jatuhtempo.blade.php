<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Informasi Pembayaran Cicilan</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            margin: 20px auto;
            max-width: 600px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        h1, p {
            text-align: justify;
        }
        .highlight {
            font-weight: bold;
            color: #e74c3c;
        }
        .footer {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Assalamualaikum wr. wb.</h1>

        <p>Kepada Yth: Orang tua <strong>{{$data['nama']}}</strong>,</p>

        <p>Demi kelancaran operasional dan kesuksesan putra/i Bapak/Ibu, kami ingin menginformasikan bahwa menurut catatan administrasi kami, masih ada sisa pembayaran angsuran senilai <span class="highlight">Rp {{$data['jumlah']}}</span> atas nama {{$data['nama']}} yang belum dilunasi.</p>

        <p>Pembayaran dapat dilakukan melalui transfer ke rekening BCA <strong>6241447062 a/n Opik Taofik Muflih</strong>. Pembayaran angsuran berikutnya ataupun dapat dilakukan s/d tanggal <span class="highlight">26 Agustus 2024</span>. Apabila Bapak/Ibu sudah melakukan pembayaran, mohon untuk mengirimkan bukti pembayarannya. 😊🙏.</p>

        <p>Kami turut berdoa semoga Bapak/Ibu dimudahkan untuk dapat melakukan angsuran ataupun pelunasan biaya bimbingan belajar. Aamiin.</p>

        <div class="footer">
            <p>Terima kasih atas perhatian dan kerjasamanya.</p>

            <p>Wassalamu'alaikum wr. wb.,<br>
            <strong>New Primagama - Fatmawati</strong></p>
        </div>
    </div>
</body>



{{-- <p>
Assalamualaikum wr. wb.,<br><p>

Kepada Yth : Orang tua {{$data['nama']}},<br>
Kami mengucapkan selamat dan terimakasih karena putra/i bapak ibu tengah melalui setiap rangkaian pembelajaran di New Primagama Fatmawati.<br><p>

Demi kelancaran operasional dan kesuksesan putra/i Bapak/Ibu, kami ingin menginformasikan bahwa menurut catatan administrasi kami,<br>
masih ada sisa pembayaran angsuran senilai Rp {{$data['jumlah']}} atas nama {{$data['nama']}} yang belum dilunasi.<br>
Pembayaran angsuran berikutnya ataupun dapat dilakukan s/d tanggal {{$data['tgl_jatuh_tempo']}}.<br><p>

Kami turut berdoa semoga Bapak/Ibu dimudahkan untuk dapat melakukan angsuran ataupun pelunasan biaya bimbingan belajar.<br>
Aaamiin.<br><p>

Terimakasih...<br>
Wassalamu'alaikum wr.wb.<br>
</p>
 --}}
