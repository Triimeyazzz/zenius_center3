import React, { useEffect } from 'react';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Change duration as needed (3000ms = 3 seconds)

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg transition-transform transform scale-100">
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-white">
          &times; {/* Close button */}
        </button>
      </div>
    </div>
  );
};

export default Notification;
