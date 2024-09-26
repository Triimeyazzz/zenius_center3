import React, { useState } from 'react';
import { motion } from 'framer-motion';

const KomponenBelajar =  [
  {
      id: 1,
      imgSrc: "/images/Fundamental.png",
      title: "Komponen Fundamental Learning",
      imgAlt: "Zenius Center",

  },
  {
      id: 2,
      imgSrc: "/images/layanan/layanan2.png",
      title: "Kelas Offline Yang Interaktif dan Nyaman",
      imgAlt: "Zenius Center",

  },
  {
      id: 3,
      imgSrc: "/images/layanan/layanan3.png",
      title: "Pendalaman materi pelajaran sekolah",
      imgAlt: "Zenius Center",

  },
  {
      id: 4,
      imgSrc: "/images/layanan/layanan4.png",
      imgAlt: "Layanan 4",
      title: "Akses ke platform digital Zenius",

  },
  {
      id: 5,
      imgSrc: "/images/layanan/layanan5.png",
      imgAlt: "Layanan 5",
      title: "Buku pelajaran Kurikulum Merdeka",

  },
  {
      id: 6,
      imgSrc: "/images/layanan/layanan6.png",
      imgAlt: "Layanan 6",
      title: "Ulas Cerdas Model",

  },
  {
      id: 7,
      imgSrc: "/images/layanan/layanan6.png",
      imgAlt: "Layanan 6",
      title: "ZenCore",

  },
  {
      id: 8,
      imgSrc: "/images/layanan/layanan6.png",
      imgAlt: "Layanan 6",
      title: "TryOut berkala secara daring",

  },{
      id: 9,
      imgSrc: "/images/layanan/layanan6.png",
      imgAlt: "Layanan 6",
      title: "Analisis Prestasi Rapor",

  },{
      id: 10,
      imgSrc: "/images/layanan/layanan6.png",
      imgAlt: "Layanan 6",
      title: "Tes Psiko-Kognitif",

  },{
      id: 11,
      imgSrc: "/images/layanan/layanan6.png",
      imgAlt: "Layanan 6",
      title: "Buku HAJAR (Bahan Belajar)",

  },{
      id: 12,
      imgSrc: "/images/layanan/layanan6.png",
      imgAlt: "Layanan 6",
      title: "TryOut persiapan SNBT online",

  },{
      id: 13,
      imgSrc: "/images/layanan/layanan6.png",
      imgAlt: "Layanan 6",
      title: "Konsultasi belajar",

  },{
      id: 14,
      imgSrc: "/images/layanan/layanan6.png",
      imgAlt: "Layanan 6",
      title: "Pendampingan persiapan tes dan ujian",

  },{
      id: 15,
      imgSrc: "/images/layanan/layanan6.png",
      imgAlt: "Layanan 6",
      title: "Persiapan kampus impian",

  },
]

const LearningComponentsGrid = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12 text-purple-800"
        >
          Komponen Belajar
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {KomponenBelajar.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative mb-4">
                <motion.div
                  animate={{
                    scale: hoveredId === item.id ? 1.1 : 1,
                    rotateY: hoveredId === item.id ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-24 h-24 rounded-full overflow-hidden shadow-lg"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={item.imgSrc}
                    alt={item.imgAlt}
                    className="w-full h-full object-cover"
                    style={{ backfaceVisibility: 'hidden' }}
                  />
                  <div
                    className="absolute inset-0 bg-purple-600 flex items-center justify-center p-2 text-white text-center text-xs"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    {item.title}
                  </div>
                </motion.div>
              </div>
              <motion.h3
                animate={{ opacity: hoveredId === item.id ? 0 : 1 }}
                className="text-sm font-medium text-center text-gray-700"
              >
                {item.title}
              </motion.h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningComponentsGrid;