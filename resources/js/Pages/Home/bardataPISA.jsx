import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// dataPisa.js
const dataPisa = {
    barData: {
        labels: [
            "Indonesia (74)",
            "Brunei Darussalam (68)",
            "Singapore (1)",
            "Malaysia (35)",
            "Thailand (55)",
            "Philippines(53 literasi,54 Matematika,58 Sains)",
            "Vietnam (13)",
        ],
        datasets: [
            {
                label: "Matematika",
                backgroundColor: "#21409a",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 2,
                data: [366, 442, 575, 409, 394, 355, 496],
            },
            {
                label: "Membaca",
                backgroundColor: "#7b1fa1",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 2,
                data: [359, 492, 534, 338, 379, 374, 462],
            },
            {
                label: "Sains",
                backgroundColor: "#ffc007",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 2,
                data: [383, 446, 561, 416, 409, 356, 472],
            },
        ],
    },
    barOptions: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value;
                    },
                },
            },
        },
    },
    description: [
        {
            title: "Kualitas Pendidikan",
            text: "Tantangan dalam mencapai standar pendidikan yang konsisten dan berkualitas di seluruh negeri dapat mempengaruhi hasil akademik. Perbedaan dalam aksesibilitas, kualifikasi guru, dan infrastruktur sekolah bisa menjadi faktor penting."
        },
        {
            title: "Kurikulum dan Metode Pembelajaran",
            text: "Kesenjangan dalam implementasi kurikulum dan metode pembelajaran yang mempromosikan pemahaman mendalam, kreativitas, dan keterampilan kritis mungkin membatasi kemampuan siswa dalam menghadapi ujian seperti PISA yang menilai pemahaman konseptual."
        },
        {
            title: "Pemahaman Bahasa dan Budaya",
            text: "Penggunaan bahasa dalam pengajaran dan ujian bisa menjadi hambatan bagi siswa yang tidak terbiasa dengan bahasa yang digunakan dalam pengujian internasional seperti PISA."
        },
        {
            title: "Kesejahteraan dan Akses",
            text: "Faktor latar belakang ekonomi, sosial, dan geografis juga dapat mempengaruhi ketersediaan akses terhadap pendidikan berkualitas dan kesempatan belajar yang merata di seluruh negeri."
        },
        {
            title: "Fokus pada Tes Standar",
            text: "Sistem pendidikan yang mungkin lebih terfokus pada tes standar daripada pengembangan keterampilan berpikir kritis, kolaboratif, dan kreatif yang diuji dalam PISA."
        }
    ]

};

export default dataPisa;
