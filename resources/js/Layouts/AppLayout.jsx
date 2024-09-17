import React from "react";
import Navbar from "@/Components/Navbar";
import { Helmet } from "react-helmet";

const AppLayout = ({ children }) => {
    return (
        <div>
            <Helmet>
                <title>NewPrimagama Fatmawati</title>
                <meta name="description" content="Bimble Terbaik di Indonesia" />
                <link rel="shortcut icon" href="/images/Reverse.png" type="image/x-icon" />
            </Helmet>
            <style>
                {`
                    /* Custom scrollbar for WebKit browsers (Chrome, Safari) */
                    ::-webkit-scrollbar {
                        width: 16px; /* Width of the scrollbar */
                        background-color: #e0e0e0; /* Light background for the scrollbar track */
                    }

                    ::-webkit-scrollbar-track {
                        background: #f5f5f5; /* Light grey background for the scrollbar track */
                        border-radius: 10px; /* Increased rounded corners */
                        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1); /* Subtle inner shadow */
                    }

                    ::-webkit-scrollbar-thumb {
                        background: linear-gradient(180deg, #a4508b, #5f2c91); /* Purple gradient for the scrollbar handle */
                        border-radius: 10px; /* Increased rounded corners */
                        border: 4px solid transparent; /* Space around the thumb */
                        background-clip: padding-box; /* Prevents the border from overlapping */
                        transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* More pronounced shadow */
                    }

                    ::-webkit-scrollbar-thumb:hover {
                        background: linear-gradient(180deg, #5f2c91, #3e1a61); /* Darker purple gradient on hover */
                        transform: scale(1.1); /* Slightly enlarge on hover */
                        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4); /* Increased shadow on hover */
                    }

                    /* Custom scrollbar for Firefox */
                    * {
                        scrollbar-width: thin; /* Use thin scrollbar */
                        scrollbar-color: #5f2c91 #f5f5f5; /* Handle color and track color */
                    }

                    /* Additional styles for a modern touch */
                    html {
                        scrollbar-color: #a4508b #f5f5f5; /* For Firefox, matches WebKit */
                    }
                `}
            </style>
            <Navbar />
            <main>{children}</main>
        </div>
    );
};

export default AppLayout;
