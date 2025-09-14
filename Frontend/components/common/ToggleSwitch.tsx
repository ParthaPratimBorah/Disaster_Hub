import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
    const { PALETTE } = useAppContext();
    return (
        <div 
            onClick={onChange}
            className="w-12 h-6 rounded-full flex items-center p-1 cursor-pointer transition-colors duration-300"
            style={{ 
            backgroundColor: checked ? PALETTE.accent : PALETTE.background,
            boxShadow: PALETTE.button_inset_shadow
            }}
        >
            <div 
            className="w-4 h-4 rounded-full transition-transform duration-300"
            style={{ 
                backgroundColor: 'white',
                transform: checked ? 'translateX(24px)' : 'translateX(0px)'
            }}
            ></div>
        </div>
    );
};

export default ToggleSwitch;
