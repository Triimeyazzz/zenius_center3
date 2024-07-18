import React from "react";
import Navbar from "@/Components/Navbar";
import { Helmet } from "react-helmet";
const AppLayout = ({ children }) => {
    return (
        <div>
            <Helmet>
                <title>NewPrimagama Fatmawati</title>
                <meta
                    name="description"
                    content="Bimble Terbaik di Indonesia"
                />
                <link
                    rel="shortcut icon"
                    href="/images/Reverse.png"
                    type="image/x-icon"
                />
            </Helmet>
            <Navbar />
            <main>{children}</main>
        </div>
    );
};

export default AppLayout;
