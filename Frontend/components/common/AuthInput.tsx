import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface AuthInputProps {
    icon: React.ElementType;
    placeholder: string;
    type: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ icon: Icon, placeholder, type }) => {
    const { PALETTE } = useAppContext();
    return (
        <div 
            className="w-full flex items-center gap-3 p-3 rounded-xl"
            style={{ backgroundColor: PALETTE.background, boxShadow: PALETTE.button_inset_shadow }}
        >
            <Icon className="w-5 h-5" style={{ color: PALETTE.text_secondary }} />
            <input 
                type={type}
                placeholder={placeholder}
                className="bg-transparent w-full outline-none"
                style={{ color: PALETTE.text_primary }}
            />
        </div>
    );
};

export default AuthInput;
