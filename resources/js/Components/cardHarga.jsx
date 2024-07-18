import React from 'react';

const CardHarga = ({ title, price, facilities, sampai , program}) => {
    return (
        <div className="relative w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700" data-aos="fade-left">
    <img
        src="./images/Reverse.png" // Ganti dengan path gambar logo
        alt="Logo"
        className="absolute inset-0 w-1/2  opacity-10 m-auto"
    />
    <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400 relative">
        {title}
    </h5>
    <div className="flex items-baseline text-gray-900 dark:text-white relative">
        <span className="text-3xl font-semibold">
            Rp
        </span>
        <span className="text-5xl font-extrabold tracking-tight">
            {price}
        </span>
    </div>
    <span className="text-2xl font-medium text-gray-500 relative">
        Fasilitas
    </span>
    <ul role="list" className="space-y-5 my-7 relative">
        {facilities.map((facility, index) => (
            <li key={index} className="flex items-center">
                <svg
                    className="flex-shrink-0 w-4 h-4 text-purple-700 dark:text-purple-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                    {facility}
                </span>
            </li>
        ))}
    </ul>
    <span className='text-2xl font-medium text-gray-500 relative'>
        Pilihan Program
    </span>
    <ul role="list" className="space-y-5 my-7 relative">
        {program.map((program, index) => (
            <li key={index} className="flex items-center">
                <svg
                    className="flex-shrink-0 w-4 h-4 text-purple-700 dark:text-purple-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
                    {program}  
                </span>
            </li>
        ))}
    </ul>
    <p className="text-xl font-medium text-gray-500 mb-4 relative">{sampai}</p>
    <button
        type="button"
        className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center relative"
    >
        Pilih Kelas
    </button>
</div>

    );
};

export default CardHarga;
