import React from 'react';
import { PREPAREDNESS_PALETTE } from '../../constants';

interface QuickAccessButtonProps {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
}

const QuickAccessButton: React.FC<QuickAccessButtonProps> = ({ icon: Icon, label, onClick }) => (
    <div onClick={onClick} className="flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer" style={{ backgroundColor: PREPAREDNESS_PALETTE.card, boxShadow: PREPAREDNESS_PALETTE.button_shadow }}>
        <Icon className="w-7 h-7 mb-1" style={{ color: PREPAREDNESS_PALETTE.accent }}/>
        <span className="text-xs font-semibold" style={{ color: PREPAREDNESS_PALETTE.text_primary }}>{label}</span>
    </div>
);

export default QuickAccessButton;
