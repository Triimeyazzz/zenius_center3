import React, { useRef, useState } from 'react';
import './SwipeableCard.css'; // Import file CSS untuk styling

const SwipeableCard = () => {
    const [cards, setCards] = useState([
        { id: 1, text: 'Card 1' },
        { id: 2, text: 'Card 2' },
        { id: 3, text: 'Card 3' },
    ]);

    const containerRef = useRef(null);
    const [startX, setStartX] = useState(null);
    const [offsetX, setOffsetX] = useState(0);

    const handleMouseDown = (e) => {
        setStartX(e.pageX - offsetX);
    };

    const handleMouseMove = (e) => {
        if (startX === null) return;

        const currentX = e.pageX;
        const newOffsetX = currentX - startX;
        setOffsetX(newOffsetX);

        containerRef.current.style.left = `${newOffsetX}px`;
    };

    const handleMouseUp = () => {
        if (offsetX < -100) {
            setOffsetX(-300); // Menggeser card ke kiri sebesar 300px (misalnya)
        } else {
            setOffsetX(0);
            containerRef.current.style.left = '0';
        }

        setStartX(null);
    };

    return (
        <div className="swipeable-card-container">
            <div
                className="swipeable-card-inner-container"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                ref={containerRef}
            >
                {cards.map((card, index) => (
                    <div key={card.id} className="swipeable-card" style={{ transform: `translateX(${index * 100 + offsetX}px)` }}>
                        <div className="card-content">
                            <p>{card.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SwipeableCard;
