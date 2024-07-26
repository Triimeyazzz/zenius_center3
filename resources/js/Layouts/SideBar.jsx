import React, { useState } from 'react';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = (section) => {
    if (openDropdown === section) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(section);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:w-1/4 w-full bg-white shadow-md p-6 h-svh md:relative">
      <button
        onClick={toggleSidebar}
        className="md:hidden block text-purple-600 hover:text-purple-800"
      >
        {isOpen ? 'Close Menu' : 'Open Menu'}
      </button>
      <div className={`md:block ${isOpen ? 'block' : 'hidden'}`}>
        <h2 className="font-bold text-xl mb-6">Materi Belajar</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => handleDropdownClick('penalaran-umum')}
              className="w-full text-left text-purple-600 hover:text-purple-800 flex justify-between"
            >
              Penalaran Umum
              {openDropdown === 'penalaran-umum' ? '▲' : '▼'}
            </button>
            {openDropdown === 'penalaran-umum' && (
              <ul className="pl-4 mt-2 space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Pengantar Penalaran Induktif dan Deduktif</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Penalaran Deduktif</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Penalaran Induktif</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Penalaran Kuantitatif</a></li>
              </ul>
            )}
          </li>
          <li>
            <button
              onClick={() => handleDropdownClick('Bindo')}
              className="w-full text-left text-purple-600 hover:text-purple-800 flex justify-between"
            >
              Bahasa Indonesia
              {openDropdown === 'Bindo' ? '▲' : '▼'}
            </button>
            {openDropdown === 'Bindo' && (
              <ul className="pl-4 mt-2 space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Pengantar Penalaran Induktif dan Deduktif</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Penalaran Deduktif</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Penalaran Induktif</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-800">Penalaran Kuantitatif</a></li>
              </ul>
            )}
          </li>
          <li>
            <a href="#" className="text-purple-600 hover:text-purple-800">Literasi Bahasa Inggris</a>
          </li>
          <li>
            <a href="#" className="text-purple-600 hover:text-purple-800">PK & Penalaran Matematika</a>
          </li>
          <li>
            <a href="#" className="text-purple-600 hover:text-purple-800">[Kumpulan Soal] Penalaran Umum</a>
          </li>
          <li>
            <a href="#" className="text-purple-600 hover:text-purple-800">[Kumpulan Soal] PBM, PPU, dan LBI</a>
          </li>
          <li>
            <a href="#" className="text-purple-600 hover:text-purple-800">[Kumpulan Soal] PK & PM</a>
          </li>
          <li>
            <a href="#" className="text-purple-600 hover:text-purple-800">[Kumpulan Soal] Literasi dalam Bahasa...</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
