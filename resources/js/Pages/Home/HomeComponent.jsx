import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import "./wallpaper.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookAtlas, faCheck } from "@fortawesome/free-solid-svg-icons";
import IndonesiaEducationFunFacts from "./IndonesiaEducationFunFacts";
import ProblemSection from "./ProblemSection";
import WhatsAppLink from "./WhatsAppLink";
import ContentSection from "./ContentSection";
import LearningComponentsGrid from "./LearningComponentsGrid";
import { Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import "./customSlider.css"; // Assuming you save the CSS in this file
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS for carousel

const chunkArray = (arr, size) => {

    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
};

const HomeComponent = ({ displayText, ulasan = [] }) => {
    const [itemsPerSlide, setItemsPerSlide] = useState(1); // Default to 1 item per slide
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        adaptiveHeight: true,
        fade: true,
    };

    console.log(ulasan);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) { // Mobile screens
                setItemsPerSlide(1);
            } else {
                setItemsPerSlide(4); // Default to 4 items for larger screens
            }
        };

        handleResize(); // Set initial value based on the current window size
        window.addEventListener("resize", handleResize); // Listen for window resize events

        return () => {
            window.removeEventListener("resize", handleResize); // Clean up the event listener
        };
    }, []);
    return (
        <>
            <Head title="New Primagama Fatmawati Home" />

            <AppLayout>
                <div className="mx-auto w-full max-w-screen-xl mt-3 rounded-3xl">
                    <Slider {...settings} className="w-full mb-10 h-full rounded-3xl">
                        <div>
                            <img
                                src="./images/spanduk 459x217 cmyk.jpg"
                                alt="spanduk"
                                className="w-full h-auto object-cover rounded-3xl"
                            />
                        </div>
                        <div>
                            <img
                                src="./images/main4.jpg"
                                alt="another spanduk"
                                className="w-full h-auto object-cover rounded-3xl"
                            />
                        </div>
                        <div>
                            <img
                                src="./images/main2.jpg"
                                alt="another spanduk"
                                className="w-full h-auto object-cover rounded-3xl"
                            />
                        </div>
                        <div>
                            <img
                                src="./images/banner1.jpg"
                                alt="spanduk"
                                className="w-full h-auto object-cover rounded-3xl"
                            />
                        </div>
                    </Slider>
                </div>

                <IndonesiaEducationFunFacts />

                <ProblemSection />
                
                <ContentSection />

<LearningComponentsGrid />


                        <div className="relative overflow-hidden bg-gray-100 text-black py-16">
    <div className="mx-auto w-full max-w-screen-xl mt-6 p-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
            Ulasan Terbaru
        </h1>
        <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            className="ulasan-carousel"
            swipeable={true}
        >
            {ulasan.reduce((acc, item, index) => {
                if (index % itemsPerSlide === 0) {
                    acc.push([]);
                }
                acc[acc.length - 1].push(item);
                return acc;
            }, []).map((group, groupIndex) => {
                const expandedStates = group.map(() => useState(false));

                return (
                    <div key={groupIndex} className="flex justify-center">
                        {group.map((item, index) => {
                            const [isExpanded, setIsExpanded] = expandedStates[index];
                            const shortComment = item.komentar.length > 100 ? item.komentar.substring(0, 100) + '...' : item.komentar;

                            return (
                                <div
                                    key={item.id}
                                    className="bg-white shadow-lg rounded-lg p-4 mx-2 transition-transform transform hover:scale-105 w-full" // Use responsive widths
                                >
                                    <div className="flex flex-col items-center mb-4">
                                        <img
                                            src={
                                                item.foto_profile_pemberi_ulasan
                                                    ? `/storage/fotos/${item.foto_profile_pemberi_ulasan}`
                                                    : item.foto_profile
                                                    ? `/storage/${item.foto_profile}`
                                                    : "/path/to/default/image.png"
                                            }
                                            alt={`${item.nama_pemberi_ulasan || item.siswa?.name} Profile`}
                                            className="rounded-t-2xl border-4 border-yellow-400 mb-2 transition-transform transform hover:scale-110 "
                                        />
                                        <p className="font-semibold text-lg text-gray-800">
                                            {item.nama_pemberi_ulasan}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.tipe_pemberi_ulasan}
                                        </p>
                                    </div>
                                    <p className={`text-gray-700 mb-4 text-md italic text-justify ${isExpanded ? '' : 'line-clamp-3'}`}>
                                        {isExpanded ? item.komentar : shortComment}
                                    </p>
                                    <button
                                        className="text-blue-500 text-sm mt-2"
                                        onClick={() => setIsExpanded(!isExpanded)}
                                    >
                                        {isExpanded ? 'See Less' : 'See More'}
                                    </button>
                                    <div className="flex items-center justify-center mt-4">
                                        <div className="text-lg text-yellow-500">
                                            {Array.from({ length: 5 }, (_, starIndex) => (
                                                <span key={starIndex}>
                                                    {starIndex < item.penilaian ? '⭐' : '☆'}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </Carousel>
        <div className="flex justify-center bg-slate-50 p-5 rounded-3xl">
            <a href="#" className="text-purple-700 hover:text-purple-500 hover:scale-105  duration-300"><b> Lihat lebih banyak </b></a>
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
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.002367157647!2d106.79258077409723!3d-6.289176161555731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1a3b89448c9%3A0x3d08c6224ca74cd0!2sNew%20Primagama%20-%20Fatmawati%20-%20Jakarta%20Selatan!5e1!3m2!1sid!2sid!4v1723790365731!5m2!1sid!2sid"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default HomeComponent;
