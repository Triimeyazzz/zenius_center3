import React from 'react';
import StudentLayout from '@/Layouts/StudentLayout';
import Sidebar from '@/Layouts/SideBar';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ErrorBoundary from '@/Components/ErrorBoundary';

const Dashboard = ({ auth }) => {
  return (
    <ErrorBoundary>
      <StudentLayout user={auth.user}>
        <div className="flex">
          <Sidebar />
          <main className="w-3/4 p-8">
            <div className="bg-white shadow-lg p-8 rounded-lg">
              <h1 className="text-3xl font-bold mb-6">Selamat datang di New Primagama Fatmawati</h1>
              <ul className="list-disc pl-5 space-y-4">
                <li className="text-lg">Video dan latihan soal lengkap buat bikin jago UTBK</li>
                <li className="text-lg">Belajar pake konsep jadi ngerti banget!</li>
                <li className="text-lg">Latihan soal cocok untuk deliberate practice</li>
                <li className="text-lg">Enak dipake di PC maupun mobile</li>
              </ul>
            </div>
            <div className="mt-8">
              <Carousel showThumbs={false} autoPlay infiniteLoop>
                <div>
                  <img src="/images/spanduk 459x217 cmyk.jpg" alt="Dashboard 1" className="rounded-lg shadow-lg" />
                </div>
                <div>
                  <img src="/images/path_to_your_image2.png" alt="Dashboard 2" className="rounded-lg shadow-lg" />
                </div>
                <div>
                  <img src="/images/path_to_your_image3.png" alt="Dashboard 3" className="rounded-lg shadow-lg" />
                </div>
              </Carousel>
            </div>
          </main>
        </div>
      </StudentLayout>
    </ErrorBoundary>
  );
};

export default Dashboard;
