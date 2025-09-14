import React from 'react';
import { ChevronRightIcon } from '../../constants';
import { useAppContext } from '../../contexts/AppContext';

interface SettingsListItemProps {
    icon: React.ElementType;
    text: string;
    action?: () => void;
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({ icon: Icon, text, action }) => {
    const { PALETTE } = useAppContext();
    return (
        <div onClick={action} className="flex items-center gap-4 p-3 rounded-xl hover:opacity-80 cursor-pointer">
            <Icon className="w-6 h-6" style={{ color: PALETTE.text_secondary }} />
            <span className="font-semibold" style={{ color: PALETTE.text_primary }}>{text}</span>
            <ChevronRightIcon className="w-5 h-5 ml-auto" style={{ color: PALETTE.text_secondary }} />
        </div>
    );
};

export default SettingsListItem;
