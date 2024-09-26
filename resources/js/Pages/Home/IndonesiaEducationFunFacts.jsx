import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faBook, faSchool, faLanguage, faUsers, faTimes } from "@fortawesome/free-solid-svg-icons";

const funFacts = [
  {
    icon: faGraduationCap,
    title: "Tingkat Literasi",
    fact: "Tingkat literasi Indonesia telah meningkat secara signifikan, mencapai 96% untuk orang dewasa pada tahun 2020.",
    color: "bg-blue-500",
    details: "Peningkatan tingkat literasi ini merupakan hasil dari berbagai inisiatif pemerintah, termasuk program 'Indonesia Membaca' yang diluncurkan pada tahun 2015. Program ini bertujuan untuk mempromosikan kebiasaan membaca dan meningkatkan akses ke buku di seluruh nusantara."
  },
  {
    icon: faBook,
    title: "Kurikulum Beragam",
    fact: "Kurikulum Indonesia mencakup lebih dari 300 bahasa daerah sebagai mata pelajaran pilihan.",
    color: "bg-green-500",
    details: "Inisiatif ini merupakan bagian dari upaya pemerintah untuk melestarikan warisan bahasa Indonesia yang kaya. Beberapa bahasa daerah yang paling banyak diajarkan termasuk Jawa, Sunda, dan Bali. Keragaman ini mencerminkan moto Indonesia: 'Bhinneka Tunggal Ika' (Berbeda-beda tetapi Tetap Satu)."
  },
  {
    icon: faSchool,
    title: "Sistem Pendidikan",
    fact: "Indonesia memiliki salah satu sistem pendidikan terbesar di dunia, dengan lebih dari 50 juta siswa.",
    color: "bg-yellow-500",
    details: "Sistem pendidikan di Indonesia dibagi menjadi beberapa level: pendidikan anak usia dini, sekolah dasar (6 tahun), sekolah menengah pertama (3 tahun), sekolah menengah atas (3 tahun), dan pendidikan tinggi. Negara ini memiliki lebih dari 250.000 sekolah yang tersebar di 17.000 pulau, menghadapi tantangan logistik yang unik."
  },
  {
    icon: faLanguage,
    title: "Bahasa Pengantar",
    fact: "Meskipun Bahasa Indonesia adalah bahasa pengantar utama, beberapa sekolah menawarkan program bilingual.",
    color: "bg-purple-500",
    details: "Pendidikan bilingual di Indonesia sering melibatkan bahasa Inggris sebagai bahasa kedua pengantar. Tren ini terutama berlaku di daerah perkotaan dan sekolah internasional. Beberapa daerah juga menawarkan pendidikan trilingual, yang mencakup bahasa daerah lokal di samping Bahasa Indonesia dan Inggris."
  },
  {
    icon: faUsers,
    title: "Rasio Guru dan Siswa",
    fact: "Rasio rata-rata guru terhadap siswa di Indonesia adalah sekitar 1:16.",
    color: "bg-red-500",
    details: "Rasio ini bervariasi secara signifikan antara daerah perkotaan dan pedesaan. Di beberapa daerah terpencil, rasio dapat mencapai 1:30, sementara di kota besar rasio bisa mendekati 1:12. Pemerintah telah meluncurkan program untuk mendistribusikan guru secara lebih merata di seluruh negara untuk mengatasi ketimpangan ini."
  },
  {
    icon: faTimes,
    title: "Tingkat Putus Sekolah",
    fact: "Tingkat putus sekolah di Indonesia masih menjadi tantangan besar, terutama di daerah terpencil.",
    color: "bg-orange-500",
    details: "Meskipun pemerintah telah mengimplementasikan berbagai program untuk mengurangi angka putus sekolah, masih banyak anak yang tidak dapat melanjutkan pendidikan mereka hingga tingkat akhir. Faktor-faktor seperti kemiskinan, jarak tempuh ke sekolah, dan kurangnya fasilitas pendidikan mempengaruhi tingkat putus sekolah ini."
  },
  {
    icon: faTimes,
    title: "Kualitas Pendidikan",
    fact: "Kualitas pendidikan di Indonesia sangat bervariasi antara daerah perkotaan dan pedesaan.",
    color: "bg-gray-500",
    details: "Di banyak daerah pedesaan, fasilitas pendidikan, kualitas pengajaran, dan akses ke materi pembelajaran sering kali kurang memadai dibandingkan dengan daerah perkotaan. Pemerintah sedang berupaya untuk meningkatkan standar pendidikan secara keseluruhan, tetapi masih ada banyak tantangan yang harus diatasi."
  },
];



const HexagonCard = ({ fact, index, onClick }) => {
  return (
    <motion.div
      className={`hexagon ${fact.color} cursor-pointer`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.1 }}
      onClick={() => onClick(fact)}
    >
      <div className="hexagon-content">
        <FontAwesomeIcon icon={fact.icon} className="text-3xl mb-2" />
        <h3 className="text-lg font-bold mb-1">{fact.title}</h3>
        <p className="text-sm">{fact.fact}</p>
      </div>
    </motion.div>
  );
};

const Modal = ({ fact, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-6 max-w-lg w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{fact.title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <p className="mb-4">{fact.fact}</p>
          <p className="text-gray-700">{fact.details}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const IndonesiaEducationFunFacts = () => {
  const [selectedFact, setSelectedFact] = useState(null);

  return (
    <section className="bg-gray-100 py-16">
      <style jsx>{`
        .hexagon-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 2rem;
          padding: 2rem;
        }
        .hexagon {
          width: 250px;
          height: 220px;
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        }
        .hexagon-content {
          padding: 1rem;
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center text-purple-800">
          Fun Facts about Education in Indonesia
        </h2>
        <div className="hexagon-grid">
          {funFacts.map((fact, index) => (
            <HexagonCard key={index} fact={fact} index={index} onClick={setSelectedFact} />
          ))}
        </div>
      </div>
      {selectedFact && <Modal fact={selectedFact} onClose={() => setSelectedFact(null)} />}
    </section>
  );
};

export default IndonesiaEducationFunFacts;