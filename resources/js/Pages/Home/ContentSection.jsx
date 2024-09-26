import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const contentData = [
    {
        id: 1,
        title: "Mengapa Harus Belajar di New Primagama Fatmawati",
        imgSrc: "/images/buku.png",
        imgAlt: "Robot Zenius",
        heading: "Tes Minat Bakat (Tes Diagnostik)",
        text: "Tes yang dilakukan untuk memastikan putra/i kita belajar sesuai dengan gaya dan modalitas belajarnya masing-masing.",
        aosImage: "fade-right",
        aosText: "fade-left",
    },
    {
        id: 2,
        imgSrc: "/images/Generasiemas.png",
        imgAlt: "Generasi Emas",
        heading: "Akses Premium ke zenius.net",
        text: "Siswa dapat mengakses puluhan ribu video materi, latihan soal, dan pembahasan.",
        aosImage: "fade-left",
        aosText: "fade-right",
    },
    {
        id: 3,
        imgSrc: "/images/Generasiemas.png",
        imgAlt: "Generasi Emas",
        heading: "Gratis Konsultasi Setiap Hari",
        text: "Siswa yang terkendala untuk memahami materi ataupun tugas yang diberikan oleh guru di sekolah, dapat meminta sesi konsultasi secara gratis.",
        aosImage: "fade-left",
        aosText: "fade-right",
    },

    {
        id: 5,
        imgSrc: "/images/Generasiemas.png",
        imgAlt: "Generasi Emas",
        heading: "Buku dan Proset Super Lengkap",
        text: "Buku fase, master book, smart exercise, dan proset yang sudah disesuaikan dengan kurikulum pemerintah dan mudah dipahami.",
        aosImage: "fade-left",
        aosText: "fade-right",
    },
    {
        id: 6,
        imgSrc: "/images/Generasiemas.png",
        imgAlt: "Generasi Emas",
        heading: "Professional Tutor",
        text: "Disiapkan tim pengajar yang handal, terlatih, berpengalaman, dan mampu menyampaikan materi dengan cara yang asik, interaktif dan menyenangkan.",
        aosImage: "fade-left",
        aosText: "fade-right",
    },
    {
        id: 7,
        imgSrc: "/images/Generasiemas.png",
        imgAlt: "Generasi Emas",
        heading: "One Day Before Exam",
        text: "Program Super Intensif masuk setiap hari selama persiapan ATS, AAS, ASTS, ASAT, dan UTBK sampai Ujian Mandiri 2025 dilengkapi dengan Try Out dan drilling ribuan soal secara berkala.",
        aosImage: "fade-left",
        aosText: "fade-right",
    },
    {
        id: 8,
        imgSrc: "/images/Generasiemas.png",
        imgAlt: "Generasi Emas",
        heading: "Kelas Motivasi Juara dan Self Improvement",
        text: "Kelas untuk membekali siswa/i dalam menghadapi ujian akhir dengan mental positif dan motivasi yang kuat.",
        aosImage: "fade-left",
        aosText: "fade-right",
    },
    {
        id: 9,
        imgSrc: "/images/Generasiemas.png",
        imgAlt: "Generasi Emas",
        heading: "Sarana dan Prasarana Belajar yang Baik",
        text: "Kelas yang kondusif (maksimal 12 siswa/kelas) dan nyaman yang sudah dilengkapi dengan AC, TV, whiteboard, dan CCTV.",
        aosImage: "fade-left",
        aosText: "fade-right",
    },
    {
        id: 10,
        imgSrc: "/images/Generasiemas.png",
        imgAlt: "Generasi Emas",
        heading: "Komunitas Zen-Sport dan Ekskul English",
        text: "Zen-Sport diadakan setiap bulannya agar siswa/i dapat merefresh otak setelah belajar. Ekskul Bahasa Inggris diadakan untuk melatih basic skills siswa/i.",
        aosImage: "fade-left",
        aosText: "fade-right",
    },
    {
        id: 11,
        imgSrc: "/images/Generasiemas.png",
        imgAlt: "Generasi Emas",
        heading: "Analisa Nilai Raport",
        text: "Sistem konsultasi terpadu untuk menganalisa tingkat keberhasilan siswa dalam proses belajar ke terutama tingkat selanjutnya,terutama untuk memaksimalkan peluang jalur SNBP 2025.",
        aosImage: "fade-left",
        aosText: "fade-right",
    },
];
const ContentSection = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white text-gray-800 py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-purple-800"
        >
          {contentData[0].title}
        </motion.h1>

        <div className="grid gap-8">
          {contentData.map((data, index) => (
            <motion.div
              key={data.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div 
                className="p-6 cursor-pointer flex justify-between items-center"
                onClick={() => toggleExpand(data.id)}
              >
                <h2 className="text-2xl font-semibold text-purple-700">{data.heading}</h2>
                {expandedId === data.id ? <ChevronUp /> : <ChevronDown />}
              </div>

              <motion.div
                initial={false}
                animate={{ height: expandedId === data.id ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-1">
                    <img
                      src={data.imgSrc}
                      alt={data.imgAlt}
                      className="w-full rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-lg text-gray-700">{data.text}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <img
        src="./images/Reverse.png"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-5"
      />
    </div>
  );
};

export default ContentSection;