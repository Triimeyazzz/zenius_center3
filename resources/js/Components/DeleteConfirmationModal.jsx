
import React from 'react';

const modalStyles = {
    overlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 50,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: '0.375rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1.5rem',
        width: '100%',
        maxWidth: '24rem',
        margin: '0 1rem',
        transform: 'scale(0.95)',
        opacity: 0,
        animation: 'fadeIn 0.3s ease-out forwards',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#4B5563',
        fontSize: '1.5rem',
        cursor: 'pointer',
        transition: 'color 0.3s',
    },
    closeButtonHover: {
        color: '#1F2937',
    },
    button: {
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        fontWeight: '600',
        transition: 'background-color 0.3s',
    },
    cancelButton: {
        backgroundColor: '#E5E7EB',
        color: '#1F2937',
    },
    confirmButton: {
        backgroundColor: '#DC2626',
        color: 'white',
    },
    cancelButtonHover: {
        backgroundColor: '#D1D5DB',
    },
    confirmButtonHover: {
        backgroundColor: '#B91C1C',
    },
};

// Keyframes for animation
const keyframes = `
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
`;

// Append keyframes to the document head
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.container}>
                <div style={modalStyles.header}>
                    <h2 className="text-xl font-semibold text-gray-800">Konfirmasi Penghapusan</h2>
                    <button
                        onClick={onClose}
                        style={modalStyles.closeButton}
                        onMouseOver={(e) => e.currentTarget.style.color = modalStyles.closeButtonHover.color}
                        onMouseOut={(e) => e.currentTarget.style.color = modalStyles.closeButton.color}
                    >
                        &times;
                    </button>
                </div>
                <p className="mb-6 text-gray-700">Apakah Anda yakin ingin menghapus Data ini?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        style={{ ...modalStyles.button, ...modalStyles.cancelButton }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = modalStyles.cancelButtonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = modalStyles.cancelButton.backgroundColor}
                    >
                        Batal
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{ ...modalStyles.button, ...modalStyles.confirmButton }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = modalStyles.confirmButtonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = modalStyles.confirmButton.backgroundColor}
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
