import React from "react";
import TestimoniData from "./TestimoniData"; 
import AppLayout from "@/Layouts/AppLayout";
import Footer from "@/Components/Footer";

const TestimoniComponent = () => {
    return (
        <AppLayout>
        <div className="bg-white text-gray-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
                <div className="text-center mb-8" data-aos="fade-up">
                    <h1 className="text-4xl font-bold mb-4">Testimonials</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {TestimoniData.map((testimonial, index) => (
                        <div key={index} className="testimonial-item bg-white p-6 rounded-lg shadow-md Hover:shadow-2xl">
                            <img
                                src={testimonial.image}
                                alt={`${testimonial.name} photo`}
                                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                            />
                            <h2 className="text-lg font-semibold">{testimonial.name}</h2>
                            <p className="text-gray-600 mb-2">{testimonial.role}</p>
                            <p className="text-gray-800">{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Footer />
        </AppLayout>
    );
};

export default TestimoniComponent;
