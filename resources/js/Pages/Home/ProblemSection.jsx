import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const dataProblems = {
  title: "Permasalahan Yang Sering Dihadapi Siswa",
  imageUrl: "/images/anakpusing.png",
  imageAlt: "Robot Zenius",
  issues: [
    "Materi yang dibahas disekolah sering kurang tuntas",
    "Kurang memahami materi yang diajarkan disekolah",
    "Sering kesulitan dalam pengerjaan Tugas dan PR",
    "Belajar dirumah tidak ada yang bantu mengajari",
  ],
  conclusion: "Siswa tidak memiliki pendamping belajar, yang dapat membantu mengatasi kesulitan belajar masing-masing.",
};

const ProblemSection = () => {
  return (
    <div className="bg-gradient-to-b from-white to-purple-100 text-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-purple-800"
        >
          {dataProblems.title}
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <img
              src={dataProblems.imageUrl}
              alt={dataProblems.imageAlt}
              className="w-full max-w-md mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-purple-800 opacity-10 rounded-lg"></div>
          </motion.div>
          
          <div>
            <ul className="space-y-4">
              {dataProblems.issues.map((issue, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-2 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <CheckCircle className="flex-shrink-0 w-6 h-6 text-green-500 mt-1" />
                  <span className="text-lg">{issue}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 text-lg font-semibold text-purple-700 bg-purple-100 p-4 rounded-lg shadow"
            >
              {dataProblems.conclusion}
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSection;