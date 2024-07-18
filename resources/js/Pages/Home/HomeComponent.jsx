import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./wallpaper.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookAtlas, faCheck } from "@fortawesome/free-solid-svg-icons";
import dataPisa from "./bardataPISA";
import dataProblems from "./dataProblem";
import WhatsAppLink from "./WhatsAppLink";
import contentData from "./contentData";
import komponen from "./KomponenBelajar";
import CardHarga from "@/Components/cardHarga";
import DataHarga from "./DataHarga";
import { Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import TestimoniData from "./TestimoniData";
import Carousel2 from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
};
const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };  

  

const HomeComponent = ({ displayText }) => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const groupedTestimonials = chunkArray(TestimoniData, 4);

    return (
        
        <div className="relative">
                    <Head title="New Primagama Fatmawati Home" />
    
            <AppLayout>
            <div className="mx-auto w-full max-w-screen-xl">
            <div className="grid grid-cols-1 gap-8 items-center">
                <div className="text-center z-20" data-aos="fade-up">
                    <Carousel 
                        autoPlay 
                        infiniteLoop 
                        showThumbs={false} 
                        showStatus={false} 
                        showArrows={true}
                        className="mx-auto mb-8 relative top-1 w-full"
                    >
                        <div className="w-full">
                            <img
                                src="/images/spanduk 459x217 cmyk.jpg"
                                alt="Slide 1"
                                className="object-cover w-full h-[600px]"
                            />
                        </div>
                        <div className="w-full">
                            <img
                                src="/images/main1.png"
                                alt="Slide 2"
                                className="object-cover w-full h-[600px]"
                            />
                        </div>
                        <div className="w-full">
                            <img
                                src="/images/main2.jpg"
                                alt="Slide 3"
                                className="object-cover w-full h-[600px]"
                            />
                        </div>
                        {/* Add more slides as needed */}
                    </Carousel>
                </div>
                
            </div>
        </div>
                <div className="relative overflow-hidden bg-gray-100 text-black py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8" data-aos="fade-up">
                            <h1 className="text-4xl font-bold mb-4 text-purple-900">
                                Skor{" "}
                                <span className="text-yellow-400">
                                    {" "}
                                    PISA 2023
                                </span>
                            </h1>
                        </div>
                        <div className="relative h-96" data-aos="fade-up">
                            <Bar
                                data={dataPisa.barData}
                                options={dataPisa.barOptions}
                            />
                        </div>
                        <div className="relative overflow-hidden bg-white shadow-lg text-black py-16">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <h1 className="text-4xl font-bold text-center mb-12 text-purple-800">
                                    Faktor-faktor{" "}
                                    <span className="text-yellow-400">
                                        PISA
                                    </span>
                                </h1>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                    <img
                                        src="./images/PISA.png"
                                        alt="Logo"
                                        className="absolute inset-0 w-1/2  opacity-10 m-auto"
                                    />
                                    {dataPisa.description.map((item, index) => (
                                        <div
                                            key={index}
                                            data-aos="fade-up"
                                            data-aos-delay={`${index * 100}`}
                                            className="text-lg mb-8 text-gray-600 bg-white hover:shadow-2xl shadow-xl p-3 text-center rounded-lg"
                                        >
                                            <h2 className="text-xl font-semibold mb-2">
                                                <b>{item.title}</b>
                                            </h2>
                                            <p>{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div className="bg-white text-gray-800 relative z-30 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-white">
                            <div
                                className="md:col-span-3 text-center"
                                data-aos="fade-up"
                            >
                                <h1 className="text-4xl font-bold mb-4 text-purple-800">
                                    {dataProblems.title}
                                </h1>
                            </div>
                            <div
                                className="md:col-span-1 text-center relative top-2"
                                data-aos="fade-right"
                            >
                                <img
                                    src={dataProblems.imageUrl}
                                    alt={dataProblems.imageAlt}
                                    className="w-80 mx-auto"
                                />
                            </div>
                            <div
                                className="md:col-span-2 text-black"
                                data-aos="fade-left"
                            >
                                <p className="text-lg mb-8">
                                    <ul className="mb-2">
                                        {dataProblems.issues.map(
                                            (issue, index) => (
                                                <li key={index}>
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                        style={{
                                                            color: "#63E6BE",
                                                            marginRight: "5px",
                                                        }}
                                                    />
                                                    {issue}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    {dataProblems.conclusion}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 text-gray-800 relative z-30 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                            <div
                                className="md:col-span-3 text-center"
                                data-aos="fade-up"
                            >
                                <h1 className="text-4xl font-bold mb-4">
                                    {contentData[0].title}
                                </h1>
                            </div>
                        </div>
                        <img
                            src="./images/Reverse.png"
                            alt="Logo"
                            className="absolute inset-0   opacity-10 m-auto"
                        />
                        {contentData.map((data, index) => (
                            <div
                                key={data.id}
                                className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
                            >
                                {index % 2 === 0 ? (
                                    <>
                                        <div
                                            className="md:col-span-1 text-center relative top-2"
                                            data-aos={data.aosImage}
                                        >
                                            <img
                                                src={data.imgSrc}
                                                alt={data.imgAlt}
                                                className="w-80 mx-auto"
                                            />
                                        </div>
                                        <div
                                            className="md:col-span-2 text-black"
                                            data-aos={data.aosText}
                                        >
                                            <h1
                                                data-aos="fade-up"
                                                className="text-4xl font-bold mb-4"
                                            >
                                                {data.heading}
                                            </h1>
                                            <p className="text-lg mb-8">
                                                {data.text}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="md:col-span-2 text-black"
                                            data-aos={data.aosText}
                                        >
                                            <h1
                                                data-aos="fade-up"
                                                className="text-4xl font-bold mb-4"
                                            >
                                                {data.heading}
                                            </h1>
                                            <p className="text-lg mb-8">
                                                {data.text}
                                            </p>
                                        </div>
                                        <div
                                            className="md:col-span-1 text-center relative top-2"
                                            data-aos={data.aosImage}
                                        >
                                            <img
                                                src={data.imgSrc}
                                                alt={data.imgAlt}
                                                className="w-80 mx-auto"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative overflow-hidden bg-white text-black py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <img
                            src="./images/Reverse.png"
                            alt="Logo"
                            className="absolute inset-0 w-1/2  opacity-10 m-auto"
                        />
                        <h1 className="text-4xl font-bold text-center mb-12">
                            Komponen Belajar
                        </h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {komponen.map((item) => (
                                <div
                                    key={item.id}
                                    className="text-center"
                                    data-aos="fade-up"
                                    data-aos-delay={`${item.id * 100}`}
                                >
                                    <img
                                        src={item.imgSrc}
                                        alt={item.imgAlt}
                                        className="w-16 h-16 mx-auto mb-4"
                                    />
                                    <h2 className="text-xl font-semibold mb-2">
                                        {item.title}
                                    </h2>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 text-gray-800 relative z-30 py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center" data-aos="fade-up">
        <h1 className="text-4xl font-bold mb-4">
          Biaya Investasi T.P 2024-2025
        </h1>
      </div>
      <Carousel2 responsive={responsive} autoPlay infinite arrows>
        {DataHarga.map((kelas) => (
          <div key={kelas.id} className="p-4">
            <CardHarga
              title={kelas.title}
              price={kelas.price}
              facilities={kelas.facilities}
              sampai={kelas.sampai}
              program={kelas.program}
            />
          </div>
        ))}
      </Carousel2>
    </div>
  </div>
                <div className="bg-white text-gray-800 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
                        <div className="text-center mb-8" data-aos="fade-up">
                            <h1 className="text-4xl font-bold mb-4">
                                Apa Kata Mereka?
                            </h1>
                        </div>
                        <Carousel
                            responsive={responsive} autoPlay infinite arrows
                        >
                            {groupedTestimonials.map((group, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                                >
                                    {group.map((testimonial, idx) => (
                                        <div
                                            key={idx}
                                            className="testimonial-item bg-white p-6 rounded-lg shadow-md "
                                        >
                                            <img
                                                src={testimonial.image}
                                                alt={`${testimonial.name} photo`}
                                                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                                            />
                                            <h2 className="text-lg font-semibold text-center">
                                                {testimonial.name}
                                            </h2>
                                            <p className="text-gray-600 mb-2">
                                                {testimonial.role}
                                            </p>
                                            <p className="text-gray-800">
                                                {testimonial.text}
                                            </p>
                                            {/* <a
                                                href=""
                                                className="text-blue-500 mt-2 inline-block"
                                            >
                                                See More
                                            </a> */}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </Carousel>
                        <div className="text-center mt-8">
                            <a href="/Testimoni" className="text-blue-500">
                                Lihat Semua Testimoni
                            </a>
                        </div>
                    </div>
                </div>
                <WhatsAppLink />

                <div
                    className="md:col-span-1 text-center relative top-2"
                    data-aos="fade-left"
                >
                    <div style={{ overflow: "hidden" }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.806268294965!2d106.7925888740973!3d-6.289176161555781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1ead17c309f%3A0xc1f346ea893a18be!2sZENIUS%20CENTER!5e0!3m2!1sid!2sid!4v1720591356159!5m2!1sid!2sid"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <Footer />
            </AppLayout>
        </div>
    );
};

export default HomeComponent;
