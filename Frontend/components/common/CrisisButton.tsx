import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface CrisisButtonProps {
    icon: React.ElementType;
    text: string;
    onClick: () => void;
}

const CrisisButton: React.FC<CrisisButtonProps> = ({ icon: Icon, text, onClick }) => {
    const { PALETTE } = useAppContext();
    return (
        <button
            onClick={onClick}
            className="flex flex-col items-center justify-center p-4 rounded-xl"
            style={{ backgroundColor: PALETTE.card, boxShadow: PALETTE.button_shadow }}
        >
            <Icon className="w-8 h-8 mb-2" style={{ color: PALETTE.text_primary }} />
            <span className="font-bold" style={{ color: PALETTE.text_primary }}>{text}</span>
        </button>
    );
};

export default CrisisButton;
