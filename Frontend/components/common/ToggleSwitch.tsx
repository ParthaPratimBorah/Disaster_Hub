import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: () => void;
    size?: 'normal' | 'large';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, size = 'normal' }) => {
    const { PALETTE } = useAppContext();

    const sizeStyles = {
        normal: {
            container: 'w-12 h-6 p-1',
            handle: 'w-4 h-4',
            transform: 'translateX(24px)',
        },
        large: {
            container: 'w-16 h-8 p-1',
            handle: 'w-6 h-6',
            transform: 'translateX(32px)', // w-16(64) - p-1*2(8) - w-6(24) = 32px
        }
    };
    
    const currentSize = sizeStyles[size];

    return (
        <div 
            onClick={onChange}
            className={`${currentSize.container} rounded-full flex items-center cursor-pointer transition-colors duration-300`}
            style={{ 
            backgroundColor: checked ? PALETTE.accent : PALETTE.background,
            boxShadow: PALETTE.button_inset_shadow
            }}
        >
            <div 
            className={`${currentSize.handle} rounded-full transition-transform duration-300`}
            style={{ 
                backgroundColor: 'white',
                transform: checked ? currentSize.transform : 'translateX(0px)'
            }}
            ></div>
        </div>
    );
};

export default ToggleSwitch;