import React from 'react';

const TestimonialCard = ({ image, name, testimonial }) => {
    return (
        <div className="testimonial-card">
            <img src={image} alt={`${name}'s photo`} />
            <h3>{name}</h3>
            <p>{testimonial}</p>
        </div>
    );
};

export default TestimonialCard;
