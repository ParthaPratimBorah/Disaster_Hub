import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { XCircleIcon } from '../../constants';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const { PALETTE } = useAppContext();

    if (!isOpen) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div
                className="p-6 rounded-2xl w-11/12 max-w-sm relative text-center"
                style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-3 right-3 p-1"
                    aria-label="Close modal"
                >
                    <XCircleIcon className="w-6 h-6" style={{ color: PALETTE.text_secondary }} />
                </button>
                <h2 id="modal-title" className="text-xl font-bold mb-4" style={{ color: PALETTE.text_primary }}>{title}</h2>
                <div className="text-sm" style={{ color: PALETTE.text_secondary }}>
                    {children}
                </div>
                <button
                    onClick={onClose}
                    className="w-full py-2 mt-6 rounded-lg font-semibold transition-all duration-200"
                    style={{ backgroundColor: PALETTE.accent, color: PALETTE.background, boxShadow: PALETTE.button_shadow }}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default Modal;
