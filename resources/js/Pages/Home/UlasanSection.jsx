import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, you can check the source code or just modify as you need
        breakpoint: { max: 4000, min: 3000 },
        items: 3,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const UlasanSection = ({ ulasanData }) => {
    return (
        <div className="bg-gray-100 text-gray-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8" data-aos="fade-up">
                    <h1 className="text-4xl font-bold mb-4 text-purple-800">
                        Apa Kata Mereka?
                    </h1>
                </div>
                <Carousel
                    responsive={responsive}
                    autoPlay
                    infinite
                    arrows
                    showDots={true}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-20-px"
                >
                    {ulasanData.map((ulasan) => (
                        <div
                            key={ulasan.id}
                            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
                        >
                            <div className="flex items-center justify-center mb-4">
                                <img
                                    src={`storage/fotos/${ulasan.siswa.foto}`}
                                    alt={`${ulasan.siswa.nama} photo`}
                                    className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg"
                                />
                            </div>
                            <h2 className="text-xl font-semibold text-center mb-2 text-purple-900">
                                {ulasan.siswa.nama}
                            </h2>
                            <p className="text-gray-600 mb-2 text-center">
                                {ulasan.siswa.email}
                            </p>
                            <p className="text-gray-800 text-center">
                                {ulasan.komentar}
                            </p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default UlasanSection;
