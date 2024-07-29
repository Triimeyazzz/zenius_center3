<!DOCTYPE html>
<html>
<head>
    <title>Detail Siswa</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .container {
            margin: 0 auto;
            padding: 20px;
            width: 80%;
        }
        h1 {
            text-align: center;
        }
        .section {
            margin-bottom: 20px;
        }
        .section h2 {
            border-bottom: 2px solid #000;
            padding-bottom: 5px;
            margin-bottom: 10px;
        }
        .section div {
            margin-bottom: 10px;
        }
        .section div strong {
            display: inline-block;
            width: 150px;
        }
        .photo img {
            width: 200px;
            height: auto;
            border: 1px solid #ddd;
            padding: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Detail Siswa</h1>
        <div class="section">
            <h2>Informasi Siswa</h2>
            <div><strong>Nama:</strong> {{ $siswa->nama }}</div>
            <div><strong>Email:</strong> {{ $siswa->email }}</div>
            <div><strong>Jenis Kelamin:</strong> {{ $siswa->jenis_kelamin }}</div>
            <div><strong>Tempat Lahir:</strong> {{ $siswa->tempat_lahir }}</div>
            <div><strong>Tanggal Lahir:</strong> {{ \Carbon\Carbon::parse($siswa->tanggal_lahir)->format('d-m-Y') }}</div>
            <div><strong>Alamat:</strong> {{ $siswa->alamat }}</div>
            <div><strong>Kota:</strong> {{ $siswa->kota }}</div>
        </div>

        <div class="section">
            <h2>Informasi Sekolah</h2>
            <div><strong>Nama Sekolah:</strong> {{ $siswa->nama_sekolah }}</div>
            <div><strong>Alamat Sekolah:</strong> {{ $siswa->alamat_sekolah }}</div>
            <div><strong>Kurikulum:</strong> {{ $siswa->kurikulum }}</div>
        </div>

        <div class="section">
            <h2>Informasi Orang Tua</h2>
            <div><strong>Nama Ayah:</strong> {{ $siswa->nama_ayah }}</div>
            <div><strong>Nama Ibu:</strong> {{ $siswa->nama_ibu }}</div>
            <div><strong>Pekerjaan Ayah:</strong> {{ $siswa->pekerjaan_ayah ?? 'Tidak tersedia' }}</div>
            <div><strong>No Telp / HP Ayah:</strong> {{ $siswa->no_telp_hp_ayah ?? 'Tidak tersedia' }}</div>
            <div><strong>No WA / ID Line Ayah:</strong> {{ $siswa->no_wa_id_line_ayah ?? 'Tidak tersedia' }}</div>
            <div><strong>Email Ayah:</strong> {{ $siswa->email_ayah ?? 'Tidak tersedia' }}</div>
            <div><strong>Pekerjaan Ibu:</strong> {{ $siswa->pekerjaan_ibu ?? 'Tidak tersedia' }}</div>
            <div><strong>No Telp / HP Ibu:</strong> {{ $siswa->no_telp_hp_ibu ?? 'Tidak tersedia' }}</div>
            <div><strong>No WA / ID Line Ibu:</strong> {{ $siswa->no_wa_id_line_ibu ?? 'Tidak tersedia' }}</div>
            <div><strong>Email Ibu:</strong> {{ $siswa->email_ibu ?? 'Tidak tersedia' }}</div>
        </div>

        @if($siswa->foto)
            <div class="photo">
                <strong>Foto:</strong>
                <img src="{{ asset('storage/' . $siswa->foto) }}" alt="Foto Siswa">
            </div>
        @endif
    </div>
</body>
</html>
